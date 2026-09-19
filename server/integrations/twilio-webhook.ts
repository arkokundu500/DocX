import type { Express, Request, Response } from "express";
import { generateGatherResponseTwiML, generateReminderTwiML } from "./twilio";
import { getDb } from "../db";
import { appointments } from "../../drizzle/schema";
import { eq } from "drizzle-orm";

export function registerTwilioWebhooks(app: Express) {
  /**
   * Generates dynamic TwiML for outbound reminder calls.
   */
  app.all(["/api/twilio/voice/reminder-twiml", "/twilio/voice/reminder-twiml"], (req: Request, res: Response) => {
    const patientName = String(req.query.patientName || req.body.patientName || "Patient");
    const doctorName = String(req.query.doctorName || req.body.doctorName || "your specialist");
    const hospitalName = String(req.query.hospitalName || req.body.hospitalName || "DocX Partner Hospital");
    const appointmentDate = String(req.query.appointmentDate || req.body.appointmentDate || "tomorrow");
    const appointmentTime = String(req.query.appointmentTime || req.body.appointmentTime || "the scheduled time");
    const bookingId = String(req.query.bookingId || req.body.bookingId || "");

    const host = req.get("host") || "localhost:3000";
    const protocol = req.protocol === "https" || req.headers["x-forwarded-proto"] === "https" ? "https" : "http";
    const actionUrl = `${protocol}://${host}/api/twilio/voice/gather-response?bookingId=${encodeURIComponent(bookingId)}&hospitalName=${encodeURIComponent(hospitalName)}`;

    const twiml = generateReminderTwiML({
      patientName,
      doctorName,
      hospitalName,
      appointmentDate,
      appointmentTime,
      bookingId,
      actionUrl,
    });

    console.info("[Twilio Voice] Generated TwiML reminder for booking:", { bookingId, patientName });
    res.type("text/xml").send(twiml);
  });

  /**
   * Handles user speech or DTMF responses from <Gather>.
   */
  app.post(["/api/twilio/voice/gather-response", "/twilio/voice/gather-response"], async (req: Request, res: Response) => {
    const digits = typeof req.body.Digits === "string" ? req.body.Digits : undefined;
    const speechResult = typeof req.body.SpeechResult === "string" ? req.body.SpeechResult : undefined;
    const bookingId = String(req.query.bookingId || req.body.bookingId || "");
    const hospitalName = String(req.query.hospitalName || req.body.hospitalName || "DocX Partner Hospital");

    console.info("[Twilio Voice] Received Gather response:", { digits, speechResult, bookingId });

    const result = generateGatherResponseTwiML({
      digits,
      speechResult,
      hospitalName,
    });

    // If user requested reschedule, update appointment in database
    if (result.action === "reschedule" && bookingId) {
      try {
        const db = await getDb();
        if (db) {
          await db
            .update(appointments)
            .set({ status: "cancelled" })
            .where(eq(appointments.bookingId, bookingId));
          console.info("[Twilio Voice] Marked appointment as cancelled for reschedule:", bookingId);
        }
      } catch (err) {
        console.warn("[Twilio Voice] Could not update appointment status in DB:", err);
      }
    }

    res.type("text/xml").send(result.twiml);
  });

  /**
   * Tracks call lifecycle events (initiated, ringing, answered, completed).
   */
  app.post(["/api/twilio/voice/status", "/twilio/voice/status"], (req: Request, res: Response) => {
    const callSid = req.body.CallSid;
    const callStatus = req.body.CallStatus;
    const duration = req.body.CallDuration;
    console.info("[Twilio Voice] Status update:", { callSid, callStatus, duration });
    res.sendStatus(200);
  });
}
