import "dotenv/config";
import { triggerTwilioVoiceReminder } from "../server/integrations/twilio";

async function main() {
  const targetNumber = process.argv[2] || "7439817750";
  console.log("==================================================");
  console.log(`Initiating test Twilio Voice Reminder Call to: ${targetNumber}`);
  console.log("From Twilio Number: +17372508034");
  console.log("Using Interactive TwiML: <Response><Say><Gather>");
  console.log("==================================================");

  try {
    const result = await triggerTwilioVoiceReminder({
      to: targetNumber,
      patientName: "Arko Kundu",
      doctorName: "Dr. Ramesh Gupta",
      hospitalName: "Apollo Multispecialty Hospital",
      appointmentDate: "18 Sep 2026",
      appointmentTime: "4:30 PM",
      bookingId: "DX-TEST-9921",
    });

    console.log("✓ Twilio Call initiated successfully!");
    console.log("Call SID:", result.sid);
    console.log("Status:", result.status);
    console.log("To:", result.to);
    console.log("From:", result.from);
    console.log("Direction:", result.direction);
    console.log("Date Created:", result.dateCreated);
    console.log("==================================================");
  } catch (err: any) {
    console.error("✕ Twilio Voice Call failed:", err.message || err);
  }
}

main();
