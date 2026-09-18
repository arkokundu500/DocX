import 'dotenv/config';
import { createOutboundReminder } from '../server/integrations/vapi';

async function main() {
  const targetNumber = process.argv[2] || "7439817750";
  console.log(`Initiating test VAPI reminder call to: ${targetNumber}`);

  try {
    const result = await createOutboundReminder({
      customerNumber: targetNumber,
      customerName: "Arko Kundu",
      assistantOverrides: {
        variableValues: {
          customer_name: "Arko Kundu",
          hospital_name: "Apollo Green Hospital",
          doctor_name: "Dr. Ananya Rao",
          appointment_date: "19 September 2026",
          appointment_time: "5:00 PM",
          booking_id: "DX-TEST-7439",
        },
      },
    });

    console.log("VAPI Call created successfully!");
    console.log("Response:", JSON.stringify(result, null, 2));
  } catch (err: any) {
    console.error("VAPI Call failed:", err.message || err);
  }
}

main();
