CREATE TYPE "public"."appointment_status" AS ENUM('confirmed', 'cancelled');--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"bookingId" varchar(32) NOT NULL,
	"visitId" varchar(64) NOT NULL,
	"doctorId" varchar(64) NOT NULL,
	"hospitalId" varchar(64) NOT NULL,
	"userId" integer NOT NULL,
	"patientName" varchar(160) NOT NULL,
	"patientPhone" varchar(64) NOT NULL,
	"patientEmail" varchar(320) NOT NULL,
	"reason" text NOT NULL,
	"reminders" integer DEFAULT 0 NOT NULL,
	"status" "appointment_status" DEFAULT 'confirmed' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "appointments_bookingId_unique" UNIQUE("bookingId")
);
--> statement-breakpoint
CREATE TABLE "doctors" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"specialty" varchar(160) NOT NULL,
	"department" varchar(160) NOT NULL,
	"experienceYears" integer DEFAULT 0 NOT NULL,
	"rating" text NOT NULL,
	"reviewCount" integer DEFAULT 0 NOT NULL,
	"fee" integer DEFAULT 0 NOT NULL,
	"hospitalIds" text DEFAULT '[]' NOT NULL,
	"phone" varchar(64),
	"email" varchar(320),
	"verified" integer DEFAULT 0 NOT NULL,
	"source" varchar(160) DEFAULT 'DocX demo workbook' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "hospitals" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" varchar(32) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(160) NOT NULL,
	"rating" text NOT NULL,
	"reviewCount" integer DEFAULT 0 NOT NULL,
	"ambulanceAvailable" integer DEFAULT 0 NOT NULL,
	"bedCapacity" integer DEFAULT 0 NOT NULL,
	"specialties" text DEFAULT '[]' NOT NULL,
	"tests" text DEFAULT '[]' NOT NULL,
	"phone" varchar(64),
	"source" varchar(160) DEFAULT 'DocX demo workbook' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "visits" (
	"id" varchar(64) PRIMARY KEY NOT NULL,
	"doctorId" varchar(64) NOT NULL,
	"hospitalId" varchar(64) NOT NULL,
	"startsAt" timestamp with time zone NOT NULL,
	"capacity" integer DEFAULT 20 NOT NULL,
	"status" varchar(32) DEFAULT 'Approved' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX "appointments_visit_user_unique" ON "appointments" USING btree ("visitId","userId");--> statement-breakpoint
CREATE UNIQUE INDEX "visits_doctor_slot_unique" ON "visits" USING btree ("doctorId","startsAt");