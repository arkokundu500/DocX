import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex, varchar } from "drizzle-orm/pg-core";

export const userRole = pgEnum("user_role", ["user", "admin", "hospital_authority", "doctor"]);
export const appointmentStatus = pgEnum("appointment_status", ["confirmed", "cancelled"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 64 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: userRole("role").default("user").notNull(),
  onboardingCompleted: integer("onboardingCompleted").default(0).notNull(),
  specialty: varchar("specialty", { length: 160 }),
  licenseNumber: varchar("licenseNumber", { length: 64 }),
  experienceYears: integer("experienceYears").default(0),
  consultationFee: integer("consultationFee").default(0),
  hospitalId: varchar("hospitalId", { length: 64 }),
  hospitalName: text("hospitalName"),
  designation: varchar("designation", { length: 160 }),
  age: integer("age"),
  gender: varchar("gender", { length: 32 }),
  bloodGroup: varchar("bloodGroup", { length: 16 }),
  emergencyContact: varchar("emergencyContact", { length: 64 }),
  medicalNotes: text("medicalNotes"),
  city: varchar("city", { length: 160 }),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn", { withTimezone: true }).defaultNow().notNull(),
});

export const hospitals = pgTable("hospitals", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  type: varchar("type", { length: 32 }).notNull(),
  address: text("address").notNull(),
  city: varchar("city", { length: 160 }).notNull(),
  rating: text("rating").notNull(),
  reviewCount: integer("reviewCount").notNull().default(0),
  ambulanceAvailable: integer("ambulanceAvailable").notNull().default(0),
  bedCapacity: integer("bedCapacity").notNull().default(0),
  specialties: text("specialties").notNull().default("[]"),
  tests: text("tests").notNull().default("[]"),
  phone: varchar("phone", { length: 64 }),
  source: varchar("source", { length: 160 }).notNull().default("DocX demo workbook"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export const doctors = pgTable("doctors", {
  id: varchar("id", { length: 64 }).primaryKey(),
  name: text("name").notNull(),
  specialty: varchar("specialty", { length: 160 }).notNull(),
  department: varchar("department", { length: 160 }).notNull(),
  experienceYears: integer("experienceYears").notNull().default(0),
  rating: text("rating").notNull(),
  reviewCount: integer("reviewCount").notNull().default(0),
  fee: integer("fee").notNull().default(0),
  hospitalIds: text("hospitalIds").notNull().default("[]"),
  phone: varchar("phone", { length: 64 }),
  email: varchar("email", { length: 320 }),
  verified: integer("verified").notNull().default(0),
  source: varchar("source", { length: 160 }).notNull().default("DocX demo workbook"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
});

export const visits = pgTable("visits", {
  id: varchar("id", { length: 64 }).primaryKey(),
  doctorId: varchar("doctorId", { length: 64 }).notNull(),
  hospitalId: varchar("hospitalId", { length: 64 }).notNull(),
  startsAt: timestamp("startsAt", { withTimezone: true }).notNull(),
  capacity: integer("capacity").notNull().default(20),
  bookedCount: integer("bookedCount").notNull().default(0),
  status: varchar("status", { length: 32 }).notNull().default("Approved"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({ doctorSlot: uniqueIndex("visits_doctor_slot_unique").on(table.doctorId, table.startsAt) }));

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  bookingId: varchar("bookingId", { length: 32 }).notNull().unique(),
  visitId: varchar("visitId", { length: 64 }).notNull(),
  doctorId: varchar("doctorId", { length: 64 }).notNull(),
  hospitalId: varchar("hospitalId", { length: 64 }).notNull(),
  userId: integer("userId").notNull(),
  patientName: varchar("patientName", { length: 160 }).notNull(),
  patientPhone: varchar("patientPhone", { length: 64 }).notNull(),
  patientEmail: varchar("patientEmail", { length: 320 }).notNull(),
  reason: text("reason").notNull(),
  reminders: integer("reminders").notNull().default(0),
  status: appointmentStatus("status").notNull().default("confirmed"),
  createdAt: timestamp("createdAt", { withTimezone: true }).defaultNow().notNull(),
}, (table) => ({ visitUserUnique: uniqueIndex("appointments_visit_user_unique").on(table.visitId, table.userId) }));

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Hospital = typeof hospitals.$inferSelect;
export type Doctor = typeof doctors.$inferSelect;
export type Visit = typeof visits.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
