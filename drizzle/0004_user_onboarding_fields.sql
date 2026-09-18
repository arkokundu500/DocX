ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "phone" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "onboardingCompleted" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "specialty" varchar(160);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "licenseNumber" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "experienceYears" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "consultationFee" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "hospitalId" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "hospitalName" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "designation" varchar(160);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "age" integer;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "gender" varchar(32);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "bloodGroup" varchar(16);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "emergencyContact" varchar(64);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "medicalNotes" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN IF NOT EXISTS "city" varchar(160);
