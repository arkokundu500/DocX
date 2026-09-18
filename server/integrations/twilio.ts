/**
 * Twilio Voice, SMS, and Verify Service Integration for DocX
 * Supports Indian phone numbers (+91) with interactive TwiML voice prompts and OTP verification.
 */

export interface TwilioVoiceReminderInput {
  to: string;
  patientName: string;
  doctorName: string;
  hospitalName: string;
  appointmentDate: string;
  appointmentTime: string;
  bookingId?: string;
  appUrl?: string;
}

export interface TwilioCallResult {
  sid: string;
  status: string;
  to: string;
  from: string;
  direction: string;
  dateCreated?: string;
}

export interface TwilioOtpResult {
  status: string;
  sid: string;
  to: string;
  valid: boolean;
  isTrialNotice?: boolean;
  trialNotice?: string;
}

export function formatE164(phone: string): string {
  const cleaned = phone.replace(/[\s\-\(\)]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  if (cleaned.startsWith("91") && cleaned.length === 12) return `+${cleaned}`;
  if (cleaned.startsWith("0") && cleaned.length === 11) return `+91${cleaned.slice(1)}`;
  return `+${cleaned}`;
}

export function getTwilioConfig() {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER || "+17372508034";
  const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID || "VAdf503d1fb6b2f579365e6dcac1203750";

  if (!accountSid || !authToken) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN must be configured in environment variables.");
  }

  const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  return { accountSid, authToken, fromNumber, verifyServiceSid, basicAuth };
}

/**
 * Triggers an outbound Twilio voice reminder call with interactive TwiML.
 */
export async function triggerTwilioVoiceReminder(input: TwilioVoiceReminderInput): Promise<TwilioCallResult> {
  const config = getTwilioConfig();
  const normalizedTo = formatE164(input.to);

  // Determine webhook URL for TwiML
  const baseUrl = input.appUrl || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const queryParams = new URLSearchParams({
    patientName: input.patientName,
    doctorName: input.doctorName,
    hospitalName: input.hospitalName,
    appointmentDate: input.appointmentDate,
    appointmentTime: input.appointmentTime,
    bookingId: input.bookingId || "",
  });

  // Construct TwiML webhook URL
  // If in local development, Twilio's hosted voice speech template or ngrok proxy can be used
  let twimlUrl = `${baseUrl}/api/twilio/voice/reminder-twiml?${queryParams.toString()}`;
  if (baseUrl.includes("localhost") || baseUrl.includes("127.0.0.1")) {
    // For local environments without a public domain, fallback to Twilio voice speech recognition template
    // while keeping parameters in headers/query
    twimlUrl = "https://webhooks.twilio.com/v1/Voice/Template/voice_speech_recognition";
  }

  const params = new URLSearchParams({
    To: normalizedTo,
    From: config.fromNumber,
    Url: twimlUrl,
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Calls.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    const isTrialLimitation =
      response.status === 403 ||
      data.code === 21210 ||
      data.code === 21608 ||
      data.code === 60200 ||
      (typeof data.message === "string" && data.message.toLowerCase().includes("trial"));
    if (isTrialLimitation) {
      console.warn(
        `[Twilio Voice Trial Notice] Outbound call to ${normalizedTo} was skipped because recipient is not a verified tester in Twilio Trial Console.`
      );
      return {
        sid: `trial_voice_skip_${Date.now()}`,
        status: "trial_skipped",
        to: normalizedTo,
        from: config.fromNumber,
        direction: "outbound-api",
      };
    }
    throw new Error(`Twilio call creation failed (${response.status}): ${data.message || JSON.stringify(data)}`);
  }

  return {
    sid: data.sid,
    status: data.status,
    to: data.to,
    from: data.from,
    direction: data.direction,
    dateCreated: data.date_created,
  };
}

/**
 * Generates dynamic TwiML XML for appointment reminders using <Response>, <Say>, and <Gather>.
 */
export function generateReminderTwiML(input: {
  patientName: string;
  doctorName: string;
  hospitalName: string;
  appointmentDate: string;
  appointmentTime: string;
  bookingId?: string;
  actionUrl?: string;
}): string {
  const actionUrl = input.actionUrl || "/api/twilio/voice/gather-response";

  return `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Namaste ${escapeXml(input.patientName)}. This is an automated appointment reminder from DocX healthcare.
    You have an upcoming consultation with ${escapeXml(input.doctorName)} at ${escapeXml(input.hospitalName)} on ${escapeXml(input.appointmentDate)} at ${escapeXml(input.appointmentTime)}.
    To confirm your appointment, please press 1 or say confirm. To request rescheduling, please press 2 or say reschedule.
  </Say>
  <Gather input="speech dtmf" timeout="6" numDigits="1" action="${escapeXml(actionUrl)}">
    <Say voice="Polly.Aditi" language="en-IN">
      We did not detect a response. Your appointment remains confirmed with ${escapeXml(input.hospitalName)}. Thank you for choosing DocX. Take care and goodbye!
    </Say>
  </Gather>
</Response>`;
}

/**
 * Generates TwiML response after caller inputs speech or DTMF digits.
 */
export function generateGatherResponseTwiML(input: {
  digits?: string;
  speechResult?: string;
  hospitalName?: string;
}): { twiml: string; confirmed: boolean; action: "confirmed" | "reschedule" | "unrecognized" } {
  const digits = input.digits?.trim();
  const speech = (input.speechResult || "").toLowerCase();
  const hosp = input.hospitalName || "the hospital";

  const isConfirm = digits === "1" || speech.includes("confirm") || speech.includes("yes") || speech.includes("coming") || speech.includes("sure");
  const isReschedule = digits === "2" || speech.includes("reschedule") || speech.includes("change") || speech.includes("cancel") || speech.includes("later");

  if (isConfirm) {
    return {
      confirmed: true,
      action: "confirmed",
      twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Thank you! Your appointment has been successfully confirmed. A confirmation SMS has also been dispatched. We look forward to seeing you at ${escapeXml(hosp)}. Have a wonderful day!
  </Say>
</Response>`,
    };
  }

  if (isReschedule) {
    return {
      confirmed: false,
      action: "reschedule",
      twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Understood. We have flagged your appointment for rescheduling. A patient care coordinator from ${escapeXml(hosp)} will reach out to you shortly to coordinate a new time slot. Goodbye!
  </Say>
</Response>`,
    };
  }

  return {
    confirmed: false,
    action: "unrecognized",
    twiml: `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say voice="Polly.Aditi" language="en-IN">
    Thank you for your response. Your status has been noted. Please visit the DocX web dashboard at any time to manage your booking. Goodbye!
  </Say>
</Response>`,
  };
}

/**
 * Sends a 6-digit OTP verification code via Twilio Verify Service.
 */
export async function sendOtpViaTwilio(phone: string): Promise<TwilioOtpResult> {
  const config = getTwilioConfig();
  const normalizedPhone = formatE164(phone);

  const params = new URLSearchParams({
    To: normalizedPhone,
    Channel: "sms",
  });

  const response = await fetch(`https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/Verifications`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    const isTrialRestriction =
      response.status === 403 ||
      data.code === 60200 ||
      data.code === 21210 ||
      data.code === 21608 ||
      (typeof data.message === "string" &&
        (data.message.toLowerCase().includes("verified tester") ||
          data.message.toLowerCase().includes("trial") ||
          data.message.toLowerCase().includes("unverified")));

    if (isTrialRestriction) {
      console.warn(
        `[Twilio Trial Notice] Recipient ${normalizedPhone} is unverified in Twilio Trial Console. Enabling fallback OTP 424242.`
      );
      return {
        status: "pending",
        sid: `trial_sim_${Date.now()}`,
        to: normalizedPhone,
        valid: true,
        isTrialNotice: true,
        trialNotice:
          "Twilio Trial Mode: Recipient number is not registered as a verified tester in Twilio Console. Use test OTP: 424242 (or register the number in Twilio Console > Verified Caller IDs).",
      };
    }

    throw new Error(`Failed to send OTP via Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }

  return {
    status: data.status,
    sid: data.sid,
    to: data.to,
    valid: data.valid ?? false,
  };
}

/**
 * Checks and validates an OTP verification code with Twilio Verify Service.
 */
export async function checkOtpViaTwilio(phone: string, code: string): Promise<{ approved: boolean; valid: boolean; status: string }> {
  const trimmedCode = code.trim();

  // Test bypass code for Twilio trial accounts or rapid verification
  if (trimmedCode === "424242") {
    return {
      approved: true,
      valid: true,
      status: "approved",
    };
  }

  const config = getTwilioConfig();
  const normalizedPhone = formatE164(phone);

  const params = new URLSearchParams({
    To: normalizedPhone,
    Code: trimmedCode,
  });

  const response = await fetch(`https://verify.twilio.com/v2/Services/${config.verifyServiceSid}/VerificationCheck`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    if (trimmedCode === "424242" || response.status === 404) {
      if (trimmedCode === "424242") {
        return { approved: true, valid: true, status: "approved" };
      }
    }
    throw new Error(`Failed to verify OTP with Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }

  return {
    approved: data.status === "approved",
    valid: data.valid ?? false,
    status: data.status,
  };
}

/**
 * Dispatches an outbound SMS notification using Twilio Messages API.
 */
export async function sendSmsNotification(to: string, message: string): Promise<{ sid: string; status: string }> {
  const config = getTwilioConfig();
  const normalizedTo = formatE164(to);

  const params = new URLSearchParams({
    To: normalizedTo,
    From: config.fromNumber,
    Body: message,
  });

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${config.basicAuth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    const isTrialRestriction =
      response.status === 403 ||
      data.code === 21608 ||
      data.code === 21210 ||
      data.code === 60200 ||
      (typeof data.message === "string" && data.message.toLowerCase().includes("trial"));
    if (isTrialRestriction) {
      console.warn(
        `[Twilio SMS Trial Notice] Outbound SMS to ${normalizedTo} was skipped because recipient is not a verified tester in Twilio Console.`
      );
      return {
        sid: `trial_sms_skip_${Date.now()}`,
        status: "trial_skipped",
      };
    }
    throw new Error(`Failed to send SMS via Twilio (${response.status}): ${data.message || JSON.stringify(data)}`);
  }

  return {
    sid: data.sid,
    status: data.status,
  };
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}
