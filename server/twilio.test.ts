import { describe, expect, it } from "vitest";
import {
  formatE164,
  generateReminderTwiML,
  generateGatherResponseTwiML,
} from "./integrations/twilio";

describe("Twilio Voice & Formatting Service", () => {
  it("normalizes Indian 10-digit phone numbers to E.164 standard", () => {
    expect(formatE164("7439817750")).toBe("+917439817750");
    expect(formatE164("+91 74398-17750")).toBe("+917439817750");
    expect(formatE164("07439817750")).toBe("+917439817750");
    expect(formatE164("917439817750")).toBe("+917439817750");
  });

  it("generates interactive TwiML with Response, Say, and Gather verbs", () => {
    const twiml = generateReminderTwiML({
      patientName: "Arko Kundu",
      doctorName: "Dr. Ramesh Gupta",
      hospitalName: "Apollo Multispecialty Hospital",
      appointmentDate: "18 Sep 2026",
      appointmentTime: "4:30 PM",
      bookingId: "DX-TEST-1234",
    });

    expect(twiml).toContain("<Response>");
    expect(twiml).toContain('voice="Polly.Aditi"');
    expect(twiml).toContain("Namaste Arko Kundu");
    expect(twiml).toContain("Dr. Ramesh Gupta");
    expect(twiml).toContain("Apollo Multispecialty Hospital");
    expect(twiml).toContain("<Gather");
    expect(twiml).toContain('input="speech dtmf"');
    expect(twiml).toContain("</Response>");
  });

  it("interprets confirmation digits and speech correctly", () => {
    const confirmDigit = generateGatherResponseTwiML({ digits: "1" });
    expect(confirmDigit.confirmed).toBe(true);
    expect(confirmDigit.action).toBe("confirmed");
    expect(confirmDigit.twiml).toContain("successfully confirmed");

    const confirmSpeech = generateGatherResponseTwiML({ speechResult: "Yes, I will be coming to confirm." });
    expect(confirmSpeech.confirmed).toBe(true);
    expect(confirmSpeech.action).toBe("confirmed");
  });

  it("interprets rescheduling digits and speech correctly", () => {
    const rescheduleDigit = generateGatherResponseTwiML({ digits: "2" });
    expect(rescheduleDigit.confirmed).toBe(false);
    expect(rescheduleDigit.action).toBe("reschedule");
    expect(rescheduleDigit.twiml).toContain("rescheduling");

    const rescheduleSpeech = generateGatherResponseTwiML({ speechResult: "Please reschedule my visit" });
    expect(rescheduleSpeech.confirmed).toBe(false);
    expect(rescheduleSpeech.action).toBe("reschedule");
  });
});
