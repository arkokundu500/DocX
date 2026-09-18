import { neon } from "@neondatabase/serverless";
import { afterEach, describe, expect, it } from "vitest";
import { createAppointment } from "./booking";

const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
const visitId = "test-atomic-slot";

async function cleanup() {
  await sql`DELETE FROM appointments WHERE "visitId" = ${visitId}`;
  await sql`DELETE FROM visits WHERE id = ${visitId}`;
}

describe("transactional appointment slot locking", () => {
  afterEach(cleanup);

  it("allows only one of two concurrent reservations for a capacity-one slot", async () => {
    await cleanup();
    await sql`INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status) VALUES (${visitId}, 'test-doctor', 'test-hospital', now() + interval '1 day', 1, 0, 'Approved')`;

    const attempts = await Promise.allSettled([
      createAppointment({ userId: 900001, visitId, doctorId: "test-doctor", hospitalId: "test-hospital", patientName: "Test One", patientPhone: "+910000000001", patientEmail: "test1@example.com", reason: "Concurrency test", reminders: false }),
      createAppointment({ userId: 900002, visitId, doctorId: "test-doctor", hospitalId: "test-hospital", patientName: "Test Two", patientPhone: "+910000000002", patientEmail: "test2@example.com", reason: "Concurrency test", reminders: false }),
    ]);

    expect(attempts.filter((attempt) => attempt.status === "fulfilled")).toHaveLength(1);
    expect(attempts.filter((attempt) => attempt.status === "rejected")).toHaveLength(1);
    const rows = await sql`SELECT "bookedCount" FROM visits WHERE id = ${visitId}`;
    expect(Number(rows[0]?.bookedCount)).toBe(1);
  }, 20_000);
});
