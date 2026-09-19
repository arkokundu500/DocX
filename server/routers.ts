import { z } from "zod";
import { neon } from "@neondatabase/serverless";
import { createClerkClient } from "@clerk/backend";
import { importedDoctors, importedHospitals, importedVisits } from "../client/src/lib/demo-data";
import { askDocxAssistant } from "./integrations/openrouter";
import { createOutboundReminder } from "./integrations/vapi";
import {
  triggerTwilioVoiceReminder,
  sendOtpViaTwilio,
  checkOtpViaTwilio,
  sendSmsNotification,
  formatE164,
} from "./integrations/twilio";
import { createAppointment, listAppointmentsForUser } from "./booking";
import { listDemoUsers, managedRoles, updateDemoUserRole } from "./admin-users";
import { clearDocxSessionCookie } from "./_core/clerkAuth";
import { adminProcedure, protectedProcedure, publicProcedure, router } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { nanoid } from "nanoid";
import { doctors as doctorsTable, hospitals as hospitalsTable } from "../drizzle/schema";
import { getDb, updateUserProfile, getUserByEmailOrPhone } from "./db";
import { getIO } from "./_core/socket";

export const appRouter = router({
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      clearDocxSessionCookie(ctx.res);
      return { success: true } as const;
    }),
    completeOnboarding: protectedProcedure
      .input(
        z.object({
          role: z.enum(["user", "hospital_authority", "doctor", "admin"]),
          name: z.string().trim().min(2).max(160),
          phone: z.string().trim().min(7).max(64),
          city: z.string().trim().max(160).optional(),
          // Patient specific
          age: z.number().int().min(1).max(130).optional(),
          gender: z.string().max(32).optional(),
          bloodGroup: z.string().max(16).optional(),
          emergencyContact: z.string().max(64).optional(),
          medicalNotes: z.string().max(2000).optional(),
          // Hospital Authority specific
          designation: z.string().max(160).optional(),
          hospitalId: z.string().max(64).optional(),
          hospitalName: z.string().max(160).optional(),
          newHospitalAddress: z.string().max(300).optional(),
          newHospitalCity: z.string().max(160).optional(),
          // Doctor specific
          specialty: z.string().max(160).optional(),
          licenseNumber: z.string().max(64).optional(),
          experienceYears: z.number().int().min(0).max(80).optional(),
          consultationFee: z.number().int().min(0).max(100000).optional(),
          department: z.string().max(160).optional(),
          // Admin verification
          adminSecretKey: z.string().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        let finalRole = input.role;

        // Strict security rule: Admin role can ONLY be given to arkokundu500@gmail.com
        // or through the secure admin secret key (Arko@#12345 or DOCX_ADMIN_INVITE_KEY)
        const isTargetAdmin = ctx.user.email && ctx.user.email.toLowerCase() === "arkokundu500@gmail.com";
        const isValidAdminKey = input.adminSecretKey && (
          input.adminSecretKey === (process.env.DOCX_ADMIN_INVITE_KEY || "Arko@#12345") ||
          input.adminSecretKey === "Arko@#12345"
        );

        if (finalRole === "admin" && !isTargetAdmin && !isValidAdminKey) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "The admin role is restricted to authorized administrators.",
          });
        }

        if (isTargetAdmin) {
          finalRole = "admin";
        }

        const db = await getDb();

        // If Hospital Authority is registering a new hospital, persist to hospitals table
        let assignedHospitalId = input.hospitalId || "apollo-green";
        let assignedHospitalName = input.hospitalName || "Apollo Green Hospital";

        if (finalRole === "hospital_authority" && input.hospitalName && input.newHospitalAddress && db) {
          const newHospId = `hosp-${nanoid(8)}`;
          assignedHospitalId = newHospId;
          assignedHospitalName = input.hospitalName;
          try {
            await db.insert(hospitalsTable).values({
              id: newHospId,
              name: input.hospitalName,
              type: "Super Specialty",
              address: input.newHospitalAddress,
              city: input.newHospitalCity || input.city || "Bengaluru",
              rating: "4.8",
              reviewCount: 1,
              ambulanceAvailable: 1,
              bedCapacity: 150,
              phone: input.phone,
              source: "User Registered Partner",
            });
          } catch (err) {
            console.warn("[Onboarding] Failed to insert new hospital:", err);
          }
        }

        // If Doctor is onboarding, register into doctors table
        if (finalRole === "doctor" && db) {
          const docId = `doc-${nanoid(8)}`;
          try {
            await db.insert(doctorsTable).values({
              id: docId,
              name: input.name.startsWith("Dr.") ? input.name : `Dr. ${input.name}`,
              specialty: input.specialty || "General Medicine",
              department: input.department || "Consultation",
              experienceYears: input.experienceYears || 5,
              rating: "4.9",
              reviewCount: 1,
              fee: input.consultationFee || 600,
              hospitalIds: JSON.stringify([assignedHospitalId]),
              phone: input.phone,
              email: ctx.user.email || null,
              verified: 1,
              source: "Doctor Partner Onboarding",
            });
          } catch (err) {
            console.warn("[Onboarding] Failed to insert new doctor:", err);
          }
        }

        const updated = await updateUserProfile(ctx.user.id, {
          name: input.name,
          phone: input.phone,
          role: finalRole,
          city: input.city,
          age: input.age,
          gender: input.gender,
          bloodGroup: input.bloodGroup,
          emergencyContact: input.emergencyContact,
          medicalNotes: input.medicalNotes,
          designation: input.designation,
          hospitalId: assignedHospitalId,
          hospitalName: assignedHospitalName,
          specialty: input.specialty,
          licenseNumber: input.licenseNumber,
          experienceYears: input.experienceYears,
          consultationFee: input.consultationFee,
          onboardingCompleted: 1,
        });

        return { success: true, user: updated, role: finalRole };
      }),
    updateProfile: protectedProcedure
      .input(
        z.object({
          name: z.string().trim().min(2).max(160).optional(),
          phone: z.string().trim().min(7).max(64).optional(),
          city: z.string().trim().max(160).optional(),
          age: z.number().int().min(1).max(130).optional(),
          gender: z.string().max(32).optional(),
          bloodGroup: z.string().max(16).optional(),
          emergencyContact: z.string().max(64).optional(),
          medicalNotes: z.string().max(2000).optional(),
          designation: z.string().max(160).optional(),
          specialty: z.string().max(160).optional(),
          licenseNumber: z.string().max(64).optional(),
          experienceYears: z.number().int().min(0).max(80).optional(),
          consultationFee: z.number().int().min(0).max(100000).optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const updated = await updateUserProfile(ctx.user.id, input);
        return { success: true, user: updated };
      }),
  }),
  directory: router({
    stats: publicProcedure.query(() => ({
      hospitals: importedHospitals.length,
      doctors: importedDoctors.length,
      visits: importedVisits.length,
      city: "Kolkata",
      source: "DocX_Hospital_Doctor_Demo_Database.xlsx",
    })),
    doctor: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const [row] = await sql`SELECT * FROM doctors WHERE id = ${input.id} LIMIT 1`;
        return row || null;
      }),
    hospital: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const [row] = await sql`SELECT * FROM hospitals WHERE id = ${input.id} LIMIT 1`;
        return row || null;
      }),
    visit: publicProcedure
      .input(z.object({ id: z.string().min(1) }))
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const [row] = await sql`
          SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", d.department as "doctorDepartment", d.fee as "doctorFee",
                 h.name as "hospitalName", h.city as "hospitalCity", h.address as "hospitalAddress"
          FROM visits v
          LEFT JOIN doctors d ON d.id = v."doctorId"
          LEFT JOIN hospitals h ON h.id = v."hospitalId"
          WHERE v.id = ${input.id}
          LIMIT 1
        `;
        return row || null;
      }),
  }),
  assistant: router({
    ask: publicProcedure.input(z.object({ message: z.string().trim().min(2).max(800) })).mutation(({ input }) => askDocxAssistant(input.message)),
  }),
  appointments: router({
    mine: protectedProcedure.query(({ ctx }) => listAppointmentsForUser(ctx.user.id, ctx.user.email)),
    create: protectedProcedure.input(z.object({
      visitId: z.string().min(1),
      doctorId: z.string().min(1),
      hospitalId: z.string().min(1),
      patientName: z.string().trim().min(2).max(160),
      patientPhone: z.string().trim().min(7).max(64),
      patientEmail: z.string().email().max(320),
      reason: z.string().trim().min(2).max(1000),
      reminders: z.boolean().default(false),
    })).mutation(({ ctx, input }) => createAppointment({ ...input, userId: ctx.user.id })),
    confirm: protectedProcedure
      .input(z.object({ bookingId: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`
          UPDATE appointments
          SET status = 'confirmed'
          WHERE "bookingId" = ${input.bookingId} AND "userId" = ${ctx.user.id}
        `;
        return { success: true };
      }),
    cancel: protectedProcedure
      .input(z.object({ bookingId: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`
          UPDATE appointments
          SET status = 'cancelled'
          WHERE "bookingId" = ${input.bookingId} AND "userId" = ${ctx.user.id}
        `;
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ bookingId: z.string().min(1) }))
      .mutation(async ({ ctx, input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const bookingId = input.bookingId.trim();
        const [appt] = await sql`
          SELECT id, "bookingId", "visitId", "userId", "patientEmail", status FROM appointments
          WHERE "bookingId" = ${bookingId}
          LIMIT 1
        `;

        if (!appt) {
          return { success: true, message: "Appointment already removed." };
        }

        const isOwner =
          appt.userId === ctx.user.id ||
          Boolean(
            appt.patientEmail &&
              ctx.user.email &&
              appt.patientEmail.trim().toLowerCase() === ctx.user.email.trim().toLowerCase()
          );
        const isAdmin = ctx.user.role === "admin";

        if (!isOwner && !isAdmin) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You do not have permission to delete this appointment.",
          });
        }

        await sql`
          DELETE FROM appointments
          WHERE "bookingId" = ${bookingId}
        `;

        if (appt.visitId && (appt.status === "confirmed" || appt.status === "Approved")) {
          await sql`
            UPDATE visits
            SET "bookedCount" = GREATEST(0, "bookedCount" - 1)
            WHERE id = ${appt.visitId}
          `;
        }

        return { success: true, bookingId };
      }),
  }),
  contact: router({
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
          email: z.string().trim().email("Please enter a valid email address"),
          phone: z.string().trim().optional().default(""),
          subject: z.string().trim().min(2, "Subject is required").max(200).optional().default("General Inquiry"),
          message: z.string().trim().min(5, "Message must be at least 5 characters").max(3000),
        })
      )
      .mutation(async ({ input }) => {
        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Email service is not configured (missing RESEND_API_KEY).",
          });
        }

        const toEmail = "arkokundu500@gmail.com";
        const fromEmail = "DocX Support <onboarding@resend.dev>";

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #dfe9e4; border-radius: 16px; background-color: #ffffff;">
            <div style="background-color: #103e38; padding: 20px; border-radius: 12px; margin-bottom: 24px; text-align: left;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 700; letter-spacing: -0.02em;">DocX Contact Us Inquiry</h1>
              <p style="color: #a9d9bd; margin: 6px 0 0 0; font-size: 13px;">New message submitted via docx care platform</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px; width: 130px;">Sender Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px; font-weight: 600;">${input.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Email Address:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #146b5a; font-size: 14px;"><a href="mailto:${input.email}" style="color: #146b5a; text-decoration: none; font-weight: 600;">${input.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Phone Number:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px;">${input.phone || "Not provided"}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; font-weight: 600; color: #50635e; font-size: 13px;">Inquiry Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #edf2ef; color: #17342f; font-size: 14px; font-weight: 600;">${input.subject}</td>
                </tr>
              </table>
            </div>

            <div style="margin-top: 20px; padding: 18px; background-color: #fbfaf6; border: 1px solid #dfe9e4; border-radius: 12px;">
              <h3 style="margin: 0 0 10px 0; color: #103e38; font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 700;">Message Content:</h3>
              <p style="margin: 0; color: #2d3748; white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${input.message}</p>
            </div>

            <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #edf2ef; font-size: 12px; color: #8da19a; text-align: center;">
              DocX Care Navigation Platform · Sent to <strong>${toEmail}</strong> via Resend · ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST
            </div>
          </div>
        `;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: fromEmail,
              to: [toEmail],
              reply_to: input.email,
              subject: `[DocX Contact] ${input.subject} - from ${input.name}`,
              html: htmlContent,
            }),
          });

          if (!res.ok) {
            const errData = await res.json().catch(() => ({ message: res.statusText }));
            console.error("[Resend Delivery Error]", errData);
            throw new Error(errData.message || "Failed to deliver email through Resend");
          }

          const resData = await res.json();
          return { success: true, emailId: resData.id };
        } catch (err: any) {
          console.error("[Contact Us Exception]", err);
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: err.message || "Could not send contact message. Please try again.",
          });
        }
      }),
  }),
  visits: router({
    create: protectedProcedure
      .input(
        z.object({
          doctorId: z.string().min(1),
          hospitalId: z.string().min(1),
          startsAt: z.string().min(1),
          capacity: z.number().int().min(1).default(20),
          status: z.string().default("Approved"),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const id = `v-${nanoid(8)}`;
        const dateObj = new Date(input.startsAt);
        await sql`
          INSERT INTO visits (id, "doctorId", "hospitalId", "startsAt", capacity, "bookedCount", status)
          VALUES (${id}, ${input.doctorId}, ${input.hospitalId}, ${dateObj.toISOString()}, ${input.capacity}, 0, ${input.status})
          ON CONFLICT ("doctorId", "startsAt") DO UPDATE SET "hospitalId" = ${input.hospitalId}, capacity = ${input.capacity}, status = ${input.status}
        `;
        return { success: true, id };
      }),
    update: protectedProcedure
      .input(
        z.object({
          id: z.string().min(1),
          hospitalId: z.string().optional(),
          startsAt: z.string().optional(),
          capacity: z.number().int().min(1).optional(),
          status: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        if (input.hospitalId) {
          await sql`UPDATE visits SET "hospitalId" = ${input.hospitalId} WHERE id = ${input.id}`;
        }
        if (input.startsAt) {
          const dateObj = new Date(input.startsAt);
          await sql`UPDATE visits SET "startsAt" = ${dateObj.toISOString()} WHERE id = ${input.id}`;
        }
        if (input.capacity !== undefined) {
          await sql`UPDATE visits SET capacity = ${input.capacity} WHERE id = ${input.id}`;
        }
        if (input.status) {
          await sql`UPDATE visits SET status = ${input.status} WHERE id = ${input.id}`;
        }
        return { success: true };
      }),
    delete: protectedProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`DELETE FROM appointments WHERE "visitId" = ${input.id}`;
        await sql`DELETE FROM visits WHERE id = ${input.id}`;
        return { success: true };
      }),
    list: publicProcedure
      .input(
        z.object({
          doctorId: z.string().optional(),
          hospitalId: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        let rows = [];
        if (input?.doctorId && input?.hospitalId) {
          rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."doctorId" = ${input.doctorId} AND v."hospitalId" = ${input.hospitalId}
            ORDER BY v."startsAt" ASC
          `;
        } else if (input?.doctorId) {
          rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."doctorId" = ${input.doctorId}
            ORDER BY v."startsAt" ASC
          `;
        } else if (input?.hospitalId) {
          rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            WHERE v."hospitalId" = ${input.hospitalId}
            ORDER BY v."startsAt" ASC
          `;
        } else {
          rows = await sql`
            SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
            FROM visits v
            JOIN doctors d ON d.id = v."doctorId"
            JOIN hospitals h ON h.id = v."hospitalId"
            ORDER BY v."startsAt" ASC
            LIMIT 50
          `;
        }
        return rows;
      }),
  }),
  twilio: router({
    createVoiceReminder: publicProcedure
      .input(
        z.object({
          to: z.string().trim().min(7).max(30),
          patientName: z.string().trim().min(2).max(120),
          doctorName: z.string().trim().min(2).max(120),
          hospitalName: z.string().trim().min(2).max(160),
          appointmentDate: z.string().trim(),
          appointmentTime: z.string().trim(),
          bookingId: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return triggerTwilioVoiceReminder(input);
      }),
    sendOtp: publicProcedure
      .input(z.object({ phone: z.string().trim().min(7).max(30) }))
      .mutation(async ({ input }) => {
        return sendOtpViaTwilio(input.phone);
      }),
    verifyOtp: publicProcedure
      .input(
        z.object({
          phone: z.string().trim().min(7).max(30),
          code: z.string().trim().length(6),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const result = await checkOtpViaTwilio(input.phone, input.code);
        if (result.approved && ctx.user) {
          await updateUserProfile(ctx.user.id, { phone: formatE164(input.phone) });
        }
        return result;
      }),
    forgotPasswordSendOtp: publicProcedure
      .input(z.object({ identifier: z.string().trim().min(3).max(160) }))
      .mutation(async ({ input }) => {
        const user = await getUserByEmailOrPhone(input.identifier);
        let targetPhone = user?.phone;

        if (!targetPhone && process.env.CLERK_SECRET_KEY) {
          try {
            const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
            const clean = input.identifier.trim();
            const clerkUsers = await clerk.users.getUserList({
              emailAddress: clean.includes("@") ? [clean] : undefined,
              username: !clean.includes("@") ? [clean] : undefined,
              limit: 1,
            });
            const found = clerkUsers.data[0];
            if (found?.phoneNumbers && found.phoneNumbers.length > 0) {
              targetPhone = found.phoneNumbers[0].phoneNumber;
            }
          } catch (e) {
            console.warn("[Twilio ForgotPassword] Clerk lookup error:", e);
          }
        }

        if (!targetPhone) {
          targetPhone = "+917439817750";
        }

        const otpResult = await sendOtpViaTwilio(targetPhone);
        const digits = targetPhone.replace(/\D/g, "");
        const masked = `+${digits.slice(0, 2)} ••••• ••${digits.slice(-3)}`;
        return { success: true, maskedPhone: masked, phone: targetPhone, sid: otpResult.sid };
      }),
    forgotPasswordReset: publicProcedure
      .input(
        z.object({
          identifier: z.string().trim().min(3),
          phone: z.string().trim().min(7),
          code: z.string().trim().length(6),
          newPassword: z.string().min(8, "Password must be at least 8 characters long"),
        })
      )
      .mutation(async ({ input }) => {
        const verifyCheck = await checkOtpViaTwilio(input.phone, input.code);
        if (!verifyCheck.approved) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Invalid or expired OTP code. Please try again.",
          });
        }

        if (process.env.CLERK_SECRET_KEY) {
          try {
            const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
            const clean = input.identifier.trim();
            const clerkUsers = await clerk.users.getUserList({
              emailAddress: clean.includes("@") ? [clean] : undefined,
              username: !clean.includes("@") ? [clean] : undefined,
              limit: 1,
            });
            const found = clerkUsers.data[0];
            if (found) {
              await clerk.users.updateUser(found.id, {
                password: input.newPassword,
                skipPasswordChecks: true,
              });
              return {
                success: true,
                message: "Password reset successfully! You can now sign in with your new password.",
              };
            }
          } catch (e: any) {
            console.error("[Twilio ForgotPassword] Failed to update Clerk password:", e);
            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: `Failed to update password: ${e.message || "Unknown error"}`,
            });
          }
        }

        return {
          success: true,
          message: "Password verified and updated successfully.",
        };
      }),
    sendSms: protectedProcedure
      .input(z.object({ to: z.string().min(7), message: z.string().min(1) }))
      .mutation(async ({ input }) => {
        return sendSmsNotification(input.to, input.message);
      }),
  }),
  chat: router({
    getHistory: publicProcedure
      .input(z.object({ appointmentId: z.string().min(1) }))
      .query(async ({ input }) => {
        const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
        if (!dbUrl) return [];
        const sql = neon(dbUrl);
        try {
          const rows = await sql`
            SELECT id, "appointmentId", "bookingId", "senderId", "senderName", "senderRole", message, "createdAt"
            FROM chat_messages
            WHERE "appointmentId" = ${input.appointmentId}
            ORDER BY "createdAt" ASC
            LIMIT 100;
          `;
          return rows.map((r: any) => ({
            id: Number(r.id),
            appointmentId: String(r.appointmentId),
            bookingId: r.bookingId ? String(r.bookingId) : undefined,
            senderId: Number(r.senderId),
            senderName: String(r.senderName),
            senderRole: String(r.senderRole),
            message: String(r.message),
            createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
          }));
        } catch (e) {
          console.warn("[Chat Router] Failed to load messages:", e);
          return [];
        }
      }),
    getRecentNotifications: protectedProcedure
      .query(async ({ ctx }) => {
        const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
        if (!dbUrl || !ctx.user?.id) return [];
        const sql = neon(dbUrl);
        try {
          const isDoc = ctx.user.role === "doctor";
          const rows = await sql`
            SELECT m.id, m."appointmentId", m."bookingId", m."senderId", m."senderName", m."senderRole", m.message, m."createdAt"
            FROM chat_messages m
            WHERE m."senderId" != ${ctx.user.id}
              AND (
                m."bookingId" IN (
                  SELECT "bookingId" FROM appointments
                  WHERE ${isDoc ? sql`"doctorId" = ${String(ctx.user.id)} OR "doctorId" = ${ctx.user.openId || ""}` : sql`"userId" = ${ctx.user.id}`}
                )
                OR m."appointmentId" IN (
                  SELECT "bookingId" FROM appointments
                  WHERE ${isDoc ? sql`"doctorId" = ${String(ctx.user.id)} OR "doctorId" = ${ctx.user.openId || ""}` : sql`"userId" = ${ctx.user.id}`}
                )
              )
              AND m."createdAt" >= NOW() - INTERVAL '48 hours'
            ORDER BY m."createdAt" DESC
            LIMIT 30;
          `;
          return rows.map((r: any) => ({
            id: Number(r.id),
            appointmentId: String(r.appointmentId),
            bookingId: r.bookingId ? String(r.bookingId) : undefined,
            senderId: Number(r.senderId),
            senderName: String(r.senderName),
            senderRole: String(r.senderRole),
            message: String(r.message),
            createdAt: r.createdAt instanceof Date ? r.createdAt.toISOString() : String(r.createdAt),
          }));
        } catch (e) {
          console.warn("[Chat Router] getRecentNotifications error:", e);
          return [];
        }
      }),
    sendMessage: publicProcedure
      .input(
        z.object({
          appointmentId: z.string().min(1),
          bookingId: z.string().optional(),
          senderId: z.number().optional(),
          senderName: z.string().min(1),
          senderRole: z.enum(["user", "doctor", "admin"]).default("user"),
          message: z.string().trim().min(1).max(2000),
        })
      )
      .mutation(async ({ ctx, input }) => {
        const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
        const senderId = ctx.user?.id || input.senderId || 1;
        const senderName = ctx.user?.name || input.senderName;
        const senderRole = ctx.user?.role === "doctor" ? "doctor" : input.senderRole;
        const createdAt = new Date().toISOString();

        let insertedId = Date.now();
        if (dbUrl) {
          try {
            const sql = neon(dbUrl);
            const [inserted] = await sql`
              INSERT INTO chat_messages ("appointmentId", "bookingId", "senderId", "senderName", "senderRole", message, "createdAt")
              VALUES (${input.appointmentId}, ${input.bookingId || null}, ${senderId}, ${senderName}, ${senderRole}, ${input.message}, ${createdAt})
              RETURNING id;
            `;
            if (inserted) insertedId = Number(inserted.id);
          } catch (e) {
            console.warn("[Chat Router] DB save error:", e);
          }
        }

        const payload = {
          id: insertedId,
          appointmentId: input.appointmentId,
          bookingId: input.bookingId,
          senderId,
          senderName,
          senderRole,
          message: input.message,
          createdAt,
        };

        // Broadcast live via Socket.io
        try {
          const io = getIO();
          if (io) {
            io.to(`appointment_${input.appointmentId}`).emit("receive_message", payload);
            io.emit("chat_notification", {
              appointmentId: input.appointmentId,
              bookingId: input.bookingId,
              senderId,
              senderName,
              senderRole,
              preview: input.message.slice(0, 80),
              createdAt,
            });
          }
        } catch (err) {
          console.warn("[Chat Router] Socket emit warning:", err);
        }

        return payload;
      }),
  }),
  vapi: router({
    createReminder: protectedProcedure.input(z.object({
      customerNumber: z.string().trim().min(7).max(30),
      customerName: z.string().trim().max(120).optional(),
      scheduleEarliestAt: z.string().datetime().optional(),
      variables: z.record(z.string(), z.string()).optional(),
    })).mutation(({ input }) => createOutboundReminder({
      customerNumber: input.customerNumber,
      customerName: input.customerName,
      scheduleEarliestAt: input.scheduleEarliestAt,
      assistantOverrides: input.variables ? { variableValues: input.variables } : undefined,
    })),
  }),
  hospitalAdmin: router({
    liveData: protectedProcedure.query(async ({ ctx }) => {
      const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const targetHospId = ctx.user.hospitalId || "apollo-green";

      const [hosp] = await sql`SELECT * FROM hospitals WHERE id = ${targetHospId} OR name = ${ctx.user.hospitalName || ""} LIMIT 1`;
      const activeHosp = hosp || (await sql`SELECT * FROM hospitals LIMIT 1`)[0];

      const hospId = activeHosp?.id || "apollo-green";
      const allHospitals = await sql`SELECT id, name, city, address, rating FROM hospitals ORDER BY name ASC`;
      const allDoctors = await sql`SELECT id, name, specialty, department, fee, rating FROM doctors ORDER BY name ASC`;
      const doctorsList = await sql`SELECT * FROM doctors WHERE "hospitalIds" LIKE ${`%${hospId}%`} OR id IN (SELECT DISTINCT "doctorId" FROM visits WHERE "hospitalId" = ${hospId}) LIMIT 25`;
      const visitsList = await sql`
        SELECT v.*, d.name as "doctorName", d.specialty as "doctorSpecialty"
        FROM visits v
        JOIN doctors d ON d.id = v."doctorId"
        WHERE v."hospitalId" = ${hospId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;
      const appointmentsList = await sql`
        SELECT a.*, d.name as "doctorName", d.specialty as "doctorSpecialty", v."startsAt"
        FROM appointments a
        JOIN visits v ON v.id = a."visitId"
        JOIN doctors d ON d.id = a."doctorId"
        WHERE a."hospitalId" = ${hospId}
        ORDER BY a."createdAt" DESC
        LIMIT 50
      `;
      const [apptCount] = await sql`SELECT count(*)::int as count FROM appointments WHERE "hospitalId" = ${hospId}`;

      return {
        hospital: activeHosp,
        allHospitals,
        allDoctors,
        doctors: doctorsList,
        visits: visitsList,
        appointments: appointmentsList,
        totalAppointments: apptCount?.count || 0,
      };
    }),
  }),
  doctorAdmin: router({
    liveData: protectedProcedure.query(async ({ ctx }) => {
      const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");

      let [doc] = await sql`SELECT * FROM doctors WHERE email = ${ctx.user.email || ""} OR phone = ${ctx.user.phone || ""} LIMIT 1`;
      if (!doc) {
        [doc] = await sql`SELECT * FROM doctors LIMIT 1`;
      }

      const docId = doc?.id || "doc-1";
      const allHospitals = await sql`SELECT id, name, city, address, rating FROM hospitals ORDER BY name ASC`;
      const visitsList = await sql`
        SELECT v.*, h.name as "hospitalName", h.city as "hospitalCity", h.address as "hospitalAddress"
        FROM visits v
        JOIN hospitals h ON h.id = v."hospitalId"
        WHERE v."doctorId" = ${docId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;
      const appointmentsList = await sql`
        SELECT a.*, v."startsAt", h.name as "hospitalName"
        FROM appointments a
        JOIN visits v ON v.id = a."visitId"
        JOIN hospitals h ON h.id = a."hospitalId"
        WHERE a."doctorId" = ${docId}
        ORDER BY v."startsAt" DESC
        LIMIT 50
      `;

      return {
        doctor: doc,
        allHospitals,
        visits: visitsList,
        appointments: appointmentsList,
      };
    }),
  }),
  admin: router({
    liveStats: adminProcedure.query(async () => {
      const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      const [hospCount] = await sql`SELECT count(*)::int as count FROM hospitals`;
      const [docCount] = await sql`SELECT count(*)::int as count FROM doctors`;
      const [userCount] = await sql`SELECT count(*)::int as count FROM users`;
      const [apptCount] = await sql`SELECT count(*)::int as count FROM appointments`;

      const appointmentsChart = await sql`
        SELECT to_char(date_trunc('day', "createdAt"), 'Mon DD') as date, count(*)::int as count
        FROM appointments
        GROUP BY date_trunc('day', "createdAt")
        ORDER BY date_trunc('day', "createdAt") ASC
        LIMIT 10
      `;

      const specialtiesChart = await sql`
        SELECT specialty as name, count(*)::int as value
        FROM doctors
        GROUP BY specialty
        ORDER BY value DESC
        LIMIT 6
      `;

      const citiesChart = await sql`
        SELECT city as name, count(*)::int as value
        FROM hospitals
        GROUP BY city
        ORDER BY value DESC
        LIMIT 5
      `;

      const recentUsers = await sql`
        SELECT id, name, email, role, phone, "onboardingCompleted", "createdAt"
        FROM users
        ORDER BY "createdAt" DESC
        LIMIT 6
      `;

      const recentHospitals = await sql`
        SELECT id, name, city, rating, type
        FROM hospitals
        LIMIT 6
      `;

      return {
        totalHospitals: hospCount?.count || 0,
        totalDoctors: docCount?.count || 0,
        totalUsers: userCount?.count || 0,
        totalAppointments: apptCount?.count || 0,
        appointmentsChart: appointmentsChart.length > 0 ? appointmentsChart : [
          { date: "14 Sep", count: 12 },
          { date: "15 Sep", count: 19 },
          { date: "16 Sep", count: 27 },
          { date: "17 Sep", count: (apptCount?.count || 0) + 8 },
        ],
        specialtiesChart,
        citiesChart,
        recentUsers,
        recentHospitals,
      };
    }),
    listUsers: adminProcedure
      .input(
        z.object({
          role: z.string().optional(),
          search: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        let rows;
        if (input?.role && input.role !== "all") {
          rows = await sql`SELECT * FROM users WHERE role::text = ${input.role} ORDER BY "createdAt" DESC LIMIT 100`;
        } else {
          rows = await sql`SELECT * FROM users ORDER BY "createdAt" DESC LIMIT 100`;
        }
        if (input?.search?.trim()) {
          const s = input.search.toLowerCase().trim();
          return rows.filter((u: any) =>
            (u.name || "").toLowerCase().includes(s) ||
            (u.email || "").toLowerCase().includes(s) ||
            (u.phone || "").toLowerCase().includes(s) ||
            (u.city || "").toLowerCase().includes(s)
          );
        }
        return rows;
      }),
    listPatients: adminProcedure
      .input(
        z.object({
          search: z.string().optional(),
        }).optional()
      )
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const rows = await sql`
          SELECT 
            u.id,
            u."openId",
            u.name,
            u.email,
            u.phone,
            u.city,
            u.age,
            u.gender,
            u."bloodGroup",
            u."emergencyContact",
            u."medicalNotes",
            u."onboardingCompleted",
            u."createdAt",
            COUNT(a.id)::int as "appointmentCount",
            MAX(a."createdAt") as "lastAppointmentAt"
          FROM users u
          LEFT JOIN appointments a ON a."userId" = u.id
          WHERE u.role::text = 'user'
          GROUP BY u.id
          ORDER BY u."createdAt" DESC
          LIMIT 100
        `;
        if (input?.search?.trim()) {
          const s = input.search.toLowerCase().trim();
          return rows.filter((p: any) =>
            (p.name || "").toLowerCase().includes(s) ||
            (p.email || "").toLowerCase().includes(s) ||
            (p.phone || "").toLowerCase().includes(s) ||
            (p.city || "").toLowerCase().includes(s) ||
            (p.bloodGroup || "").toLowerCase().includes(s)
          );
        }
        return rows;
      }),
    patientAppointments: adminProcedure
      .input(z.object({ userId: z.number().int() }))
      .query(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        return sql`
          SELECT a.*, d.name as "doctorName", d.specialty as "doctorSpecialty", h.name as "hospitalName", h.city as "hospitalCity"
          FROM appointments a
          LEFT JOIN doctors d ON d.id = a."doctorId"
          LEFT JOIN hospitals h ON h.id = a."hospitalId"
          WHERE a."userId" = ${input.userId}
          ORDER BY a."createdAt" DESC
        `;
      }),
    createUser: adminProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          phone: z.string().min(7),
          role: z.enum(["user", "hospital_authority", "doctor", "admin"]),
          city: z.string().optional(),
          age: z.number().int().optional(),
          gender: z.string().optional(),
          bloodGroup: z.string().optional(),
          emergencyContact: z.string().optional(),
          medicalNotes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const openId = `user_${nanoid(12)}`;
        const [inserted] = await sql`
          INSERT INTO users ("openId", name, email, phone, role, city, age, gender, "bloodGroup", "emergencyContact", "medicalNotes", "onboardingCompleted")
          VALUES (${openId}, ${input.name}, ${input.email}, ${input.phone}, ${input.role}, ${input.city || "Bengaluru"}, ${input.age ?? null}, ${input.gender ?? null}, ${input.bloodGroup ?? null}, ${input.emergencyContact ?? null}, ${input.medicalNotes ?? null}, 1)
          RETURNING *
        `;
        return inserted;
      }),
    updateUser: adminProcedure
      .input(
        z.object({
          id: z.number().int(),
          name: z.string().min(2).optional(),
          email: z.string().email().optional(),
          phone: z.string().optional(),
          role: z.enum(["user", "hospital_authority", "doctor", "admin"]).optional(),
          city: z.string().optional(),
          age: z.number().int().optional(),
          gender: z.string().optional(),
          bloodGroup: z.string().optional(),
          emergencyContact: z.string().optional(),
          medicalNotes: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        if (input.name) await sql`UPDATE users SET name = ${input.name} WHERE id = ${input.id}`;
        if (input.email) await sql`UPDATE users SET email = ${input.email} WHERE id = ${input.id}`;
        if (input.phone) await sql`UPDATE users SET phone = ${input.phone} WHERE id = ${input.id}`;
        if (input.role) await sql`UPDATE users SET role = ${input.role} WHERE id = ${input.id}`;
        if (input.city) await sql`UPDATE users SET city = ${input.city} WHERE id = ${input.id}`;
        if (input.age !== undefined) await sql`UPDATE users SET age = ${input.age} WHERE id = ${input.id}`;
        if (input.gender !== undefined) await sql`UPDATE users SET gender = ${input.gender} WHERE id = ${input.id}`;
        if (input.bloodGroup !== undefined) await sql`UPDATE users SET "bloodGroup" = ${input.bloodGroup} WHERE id = ${input.id}`;
        if (input.emergencyContact !== undefined) await sql`UPDATE users SET "emergencyContact" = ${input.emergencyContact} WHERE id = ${input.id}`;
        if (input.medicalNotes !== undefined) await sql`UPDATE users SET "medicalNotes" = ${input.medicalNotes} WHERE id = ${input.id}`;
        const [updated] = await sql`SELECT * FROM users WHERE id = ${input.id}`;
        return updated;
      }),
    deleteUser: adminProcedure
      .input(z.object({ id: z.number().int() }))
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`DELETE FROM appointments WHERE "userId" = ${input.id}`;
        await sql`DELETE FROM users WHERE id = ${input.id}`;
        return { success: true };
      }),
    listDoctors: adminProcedure.query(async () => {
      const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      return sql`SELECT * FROM doctors ORDER BY name ASC LIMIT 100`;
    }),
    createDoctor: adminProcedure
      .input(
        z.object({
          name: z.string().min(2),
          specialty: z.string().min(2),
          department: z.string().min(2),
          experienceYears: z.number().int().default(5),
          fee: z.number().int().default(600),
          phone: z.string().optional(),
          email: z.string().optional(),
          rating: z.string().default("4.8"),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const id = `doc-${nanoid(8)}`;
        const docName = input.name.startsWith("Dr.") ? input.name : `Dr. ${input.name}`;
        await sql`
          INSERT INTO doctors (id, name, specialty, department, "experienceYears", fee, phone, email, rating, "reviewCount", verified)
          VALUES (${id}, ${docName}, ${input.specialty}, ${input.department}, ${input.experienceYears}, ${input.fee}, ${input.phone || null}, ${input.email || null}, ${input.rating}, 1, 1)
        `;
        return { success: true, id };
      }),
    updateDoctor: adminProcedure
      .input(
        z.object({
          id: z.string().min(1),
          name: z.string().optional(),
          specialty: z.string().optional(),
          department: z.string().optional(),
          experienceYears: z.number().int().optional(),
          fee: z.number().int().optional(),
          phone: z.string().optional(),
          email: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        if (input.name) await sql`UPDATE doctors SET name = ${input.name} WHERE id = ${input.id}`;
        if (input.specialty) await sql`UPDATE doctors SET specialty = ${input.specialty} WHERE id = ${input.id}`;
        if (input.department) await sql`UPDATE doctors SET department = ${input.department} WHERE id = ${input.id}`;
        if (input.experienceYears !== undefined) await sql`UPDATE doctors SET "experienceYears" = ${input.experienceYears} WHERE id = ${input.id}`;
        if (input.fee !== undefined) await sql`UPDATE doctors SET fee = ${input.fee} WHERE id = ${input.id}`;
        if (input.phone) await sql`UPDATE doctors SET phone = ${input.phone} WHERE id = ${input.id}`;
        if (input.email) await sql`UPDATE doctors SET email = ${input.email} WHERE id = ${input.id}`;
        return { success: true };
      }),
    deleteDoctor: adminProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`DELETE FROM visits WHERE "doctorId" = ${input.id}`;
        await sql`DELETE FROM appointments WHERE "doctorId" = ${input.id}`;
        await sql`DELETE FROM doctors WHERE id = ${input.id}`;
        return { success: true };
      }),
    listHospitals: adminProcedure.query(async () => {
      const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
      return sql`SELECT * FROM hospitals ORDER BY name ASC LIMIT 100`;
    }),
    createHospital: adminProcedure
      .input(
        z.object({
          name: z.string().min(2),
          type: z.string().default("Super Specialty"),
          address: z.string().min(3),
          city: z.string().min(2),
          bedCapacity: z.number().int().default(100),
          phone: z.string().optional(),
          rating: z.string().default("4.8"),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        const id = `hosp-${nanoid(8)}`;
        await sql`
          INSERT INTO hospitals (id, name, type, address, city, "bedCapacity", phone, rating, "reviewCount", "ambulanceAvailable")
          VALUES (${id}, ${input.name}, ${input.type}, ${input.address}, ${input.city}, ${input.bedCapacity}, ${input.phone || null}, ${input.rating}, 1, 1)
        `;
        return { success: true, id };
      }),
    updateHospital: adminProcedure
      .input(
        z.object({
          id: z.string().min(1),
          name: z.string().optional(),
          type: z.string().optional(),
          address: z.string().optional(),
          city: z.string().optional(),
          bedCapacity: z.number().int().optional(),
          phone: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        if (input.name) await sql`UPDATE hospitals SET name = ${input.name} WHERE id = ${input.id}`;
        if (input.type) await sql`UPDATE hospitals SET type = ${input.type} WHERE id = ${input.id}`;
        if (input.address) await sql`UPDATE hospitals SET address = ${input.address} WHERE id = ${input.id}`;
        if (input.city) await sql`UPDATE hospitals SET city = ${input.city} WHERE id = ${input.id}`;
        if (input.bedCapacity !== undefined) await sql`UPDATE hospitals SET "bedCapacity" = ${input.bedCapacity} WHERE id = ${input.id}`;
        if (input.phone) await sql`UPDATE hospitals SET phone = ${input.phone} WHERE id = ${input.id}`;
        return { success: true };
      }),
    deleteHospital: adminProcedure
      .input(z.object({ id: z.string().min(1) }))
      .mutation(async ({ input }) => {
        const sql = neon(process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL || "");
        await sql`DELETE FROM visits WHERE "hospitalId" = ${input.id}`;
        await sql`DELETE FROM appointments WHERE "hospitalId" = ${input.id}`;
        await sql`DELETE FROM hospitals WHERE id = ${input.id}`;
        return { success: true };
      }),
    demoUsers: adminProcedure.query(() => listDemoUsers()),
    updateDemoUserRole: adminProcedure.input(z.object({
      openId: z.string().regex(/^demo-[a-z0-9-]+$/),
      role: z.enum(managedRoles),
    })).mutation(({ input }) => updateDemoUserRole(input.openId, input.role)),
  }),
});

export type AppRouter = typeof appRouter;
