import { neon } from "@neondatabase/serverless";
import { nanoid } from "nanoid";

function getSql() {
  const url = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
  if (!url?.startsWith("postgres")) throw new Error("Neon database is not configured");
  return neon(url);
}

export type CreateAppointmentInput = {
  userId: number;
  visitId: string;
  doctorId: string;
  hospitalId: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  reason: string;
  reminders: boolean;
};

export async function createAppointment(input: CreateAppointmentInput) {
  const sql = getSql();
  const bookingId = `DX-${nanoid(8).toUpperCase()}`;

  // Ensure the visit exists in Neon DB
  const [existingVisit] = await sql`SELECT id FROM visits WHERE id = ${input.visitId} LIMIT 1`;
  if (!existingVisit) {
    const { visits: mockVisits } = await import("../client/src/lib/mock-data");
    const foundMock = mockVisits.find((v) => v.id === input.visitId);
    if (foundMock) {
      await sql`
        INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
        VALUES (${foundMock.id}, ${input.doctorId}, ${input.hospitalId}, now() + interval '1 day', ${foundMock.capacity || 20}, ${foundMock.booked || 0}, 'Approved')
        ON CONFLICT (id) DO NOTHING
      `;
    }
  }

  const rows = await sql`
    WITH reserved AS (
      UPDATE visits AS v
      SET "bookedCount" = v."bookedCount" + 1
      WHERE v.id = ${input.visitId}
        AND v."doctorId" = ${input.doctorId}
        AND (v."hospitalId" = ${input.hospitalId} OR ${input.hospitalId} = '')
        AND (v.status = 'Approved' OR v.status = 'Open' OR v.status ILIKE 'approved' OR v.status ILIKE 'open')
        AND v."bookedCount" < v.capacity
        AND NOT EXISTS (
          SELECT 1 FROM appointments AS existing
          WHERE existing."visitId" = v.id
            AND existing."userId" = ${input.userId}
            AND existing.status = 'confirmed'
        )
      RETURNING v.id, v."doctorId", v."hospitalId"
    )
    INSERT INTO appointments ("bookingId", "visitId", "doctorId", "hospitalId", "userId", "patientName", "patientPhone", "patientEmail", reason, reminders)
    SELECT ${bookingId}, id, "doctorId", "hospitalId", ${input.userId}, ${input.patientName}, ${input.patientPhone}, ${input.patientEmail}, ${input.reason}, ${input.reminders ? 1 : 0}
    FROM reserved
    RETURNING "bookingId", "visitId", "doctorId", "hospitalId", status, "createdAt"
  `;

  if (rows.length === 0) {
    throw new Error("This appointment slot is no longer available or you already booked it.");
  }

  // Trigger Twilio voice reminder directly to the phone number of the user who booked
  if (input.reminders && input.patientPhone) {
    (async () => {
      try {
        const { triggerTwilioVoiceReminder } = await import("./integrations/twilio");
        const [docRow] = await sql`SELECT name FROM doctors WHERE id = ${input.doctorId}`;
        const [hospRow] = await sql`SELECT name FROM hospitals WHERE id = ${input.hospitalId}`;
        const [visitRow] = await sql`SELECT "startsAt" FROM visits WHERE id = ${input.visitId}`;

        const doctorName = docRow?.name || "your specialist";
        const hospitalName = hospRow?.name || "DocX Partner Hospital";
        const startsAt = visitRow?.startsAt ? new Date(visitRow.startsAt) : new Date();
        const appointmentDate = startsAt.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
        const appointmentTime = startsAt.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" });

        await triggerTwilioVoiceReminder({
          to: input.patientPhone,
          patientName: input.patientName,
          doctorName,
          hospitalName,
          appointmentDate,
          appointmentTime,
          bookingId,
        });
        console.info(`[Twilio Voice] Automated reminder placed to booking user: ${input.patientPhone} for ${bookingId}`);
      } catch (err: any) {
        console.warn(`[Twilio Voice] Could not place automated reminder call to ${input.patientPhone}:`, err.message || err);
      }
    })().catch(() => {});
  }

  return rows[0];
}

export async function listAppointmentsForUser(userId: number, userEmail?: string | null) {
  const sql = getSql();
  const normalizedEmail = userEmail?.trim().toLowerCase() || "";
  const rows = normalizedEmail
    ? await sql`
        SELECT a."bookingId", a."visitId", a."doctorId", a."hospitalId", a."patientName", a."patientPhone", a."patientEmail", a.reason, a.reminders, a.status, a."createdAt",
               COALESCE(v."startsAt", a."createdAt") as "startsAt",
               COALESCE(d.name, '') as "doctorName", COALESCE(d.specialty, '') as "doctorSpecialty",
               COALESCE(h.name, '') as "hospitalName", COALESCE(h.city, '') as "hospitalCity"
        FROM appointments a
        LEFT JOIN visits v ON v.id = a."visitId"
        LEFT JOIN doctors d ON d.id = a."doctorId"
        LEFT JOIN hospitals h ON h.id = a."hospitalId"
        WHERE (a."userId" = ${userId} OR LOWER(COALESCE(a."patientEmail", '')) = ${normalizedEmail})
          AND COALESCE(v."startsAt", a."createdAt") >= NOW()
        ORDER BY COALESCE(v."startsAt", a."createdAt") ASC
      `
    : await sql`
        SELECT a."bookingId", a."visitId", a."doctorId", a."hospitalId", a."patientName", a."patientPhone", a."patientEmail", a.reason, a.reminders, a.status, a."createdAt",
               COALESCE(v."startsAt", a."createdAt") as "startsAt",
               COALESCE(d.name, '') as "doctorName", COALESCE(d.specialty, '') as "doctorSpecialty",
               COALESCE(h.name, '') as "hospitalName", COALESCE(h.city, '') as "hospitalCity"
        FROM appointments a
        LEFT JOIN visits v ON v.id = a."visitId"
        LEFT JOIN doctors d ON d.id = a."doctorId"
        LEFT JOIN hospitals h ON h.id = a."hospitalId"
        WHERE a."userId" = ${userId}
          AND COALESCE(v."startsAt", a."createdAt") >= NOW()
        ORDER BY COALESCE(v."startsAt", a."createdAt") ASC
      `;

  const { doctors: mockDoctors, hospitals: mockHospitals } = await import("../client/src/lib/mock-data");

  return rows.map((row: any) => {
    let docName = row.doctorName;
    let docSpecialty = row.doctorSpecialty;
    if (!docName) {
      const foundMock = mockDoctors.find((d: any) => d.id === row.doctorId);
      if (foundMock) {
        docName = foundMock.name;
        docSpecialty = foundMock.specialty;
      } else {
        docName = "Consultation with Specialist";
      }
    }

    let hospName = row.hospitalName;
    if (!hospName) {
      const foundHosp = mockHospitals.find((h: any) => h.id === row.hospitalId);
      if (foundHosp) {
        hospName = foundHosp.name;
      } else {
        hospName = "DocX Partner Hospital";
      }
    }

    return {
      ...row,
      doctorName: docName,
      doctorSpecialty: docSpecialty || "Specialist",
      hospitalName: hospName,
    };
  });
}

