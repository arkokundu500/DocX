# DocX MVP handoff

DocX is a mobile-first healthcare discovery and appointment-booking MVP. It includes a polished patient-facing experience, hospital and doctor discovery, appointment booking, patient dashboard, and role-aware operational previews.

🌐 **Live Production Website**: [https://doc-x-five.vercel.app/](https://doc-x-five.vercel.app/)

## Run it locally (Windows/macOS/Linux)

```bash
pnpm install
pnpm db:migrate:neon   # applies the drizzle migrations to Neon
pnpm db:seed           # imports the 100/100/100 workbook + featured records + demo users
pnpm db:seed:accounts  # creates the 4 demo Clerk accounts (see below)
pnpm dev               # http://localhost:3000
```

## Demo accounts (role-based sign-in)

Sign in at `/login` with a username and password. The Clerk dev instance asks for a one-time email code — in test mode it is always **424242**.

| Role               | Username       | Password          | Lands on        |
|--------------------|----------------|-------------------|-----------------|
| Patient            | `docx-patient` | `DocxPatient#2026`| `/dashboard`    |
| Admin              | `docx-admin`   | `DocxAdmin#2026`  | `/admin`        |
| Doctor             | `docx-doctor`  | `DocxDoctor#2026` | `/doctor-admin` |
| Hospital authority | `docx-hospital`| `DocxHospital#2026`| `/hospital-admin` |

Each role has its own dashboard and route guards (`/admin` and `/admin/users` are admin-only; anyone else gets an "Access restricted" page). Recreate/update the accounts any time with `pnpm db:seed:accounts`. The Clerk instance has **test mode enabled** (via the Backend API), which is what allows auto-verified `+1555…` / `+clerk_test` credentials — real Indian phone numbers cannot receive SMS on a development instance.

All secrets live in `.env` (gitignored): Neon `DOCX_DATABASE_URL`, Clerk (`VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`), VAPI, OpenRouter, Resend, LangSmith, and Google Maps keys. `pnpm check`, `pnpm test` (16 tests, including live OpenRouter/VAPI credential checks and the booking-concurrency test), and `pnpm build` all pass.

Authentication is real Clerk sign-in: the browser session is exchanged on the server for a long-lived DocX session cookie (`app_session_id`), and users are upserted into the Neon `users` table on first sign-in. To smoke-test protected endpoints without the browser, mint a session for an existing row and call the API with it:

```bash
pnpm exec tsx scripts/mint-session.ts demo-doctor-ananya-rao
# then: curl -H "Cookie: app_session_id=<token>" http://localhost:3000/api/trpc/appointments.mine?batch=1&input=%7B%220%22%3A%7B%7D%7D
```

The featured Bengaluru records (3 hospitals, 6 doctors, 9 visit slots) are seeded by `scripts/seed-featured.ts`; the Kolkata workbook records by `scripts/seed-workbook.ts`; the five demo role profiles by `scripts/seed-demo-users.ts`.

## What changed in this iteration

The project was upgraded from a static frontend to the WebDev full-stack template with server, database, and user-management scaffolding. The supplied `DocX_Hospital_Doctor_Demo_Database.xlsx` workbook was imported into generated demo seed data: **100 hospitals, 100 doctors, and 100 visit records**. The three featured Bengaluru records remain at the top of the experience; the workbook records are shown in the directory as demo listings.

The server now includes:

- `directory.stats` — public typed counts for the imported demo directory.
- `assistant.ask` — server-only OpenRouter assistant procedure.
- `vapi.createReminder` — authenticated outbound-reminder procedure.
- `POST /api/vapi/webhook` — VAPI event receiver with optional shared-secret validation.

Private keys are stored through the secure WebDev environment and are not written into source files or exposed to React. The OpenRouter and VAPI credentials passed the authenticated smoke test. No real VAPI phone call was placed.

## Routes

- `/` — landing page, assistant form, trust metrics, featured care, and voice-reminder preview.
- `/hospitals` — searchable directory with specialty, rating, fee, and ambulance filters.
- `/hospitals/:id` — hospital profile with contact, facilities, tests, visiting doctors, and OPD availability.
- `/doctors/:id` — doctor profile with affiliated hospitals, visits, fee, rating, and booking path.
- `/appointment/book` — appointment form with time selection, visit reason, patient details, and reminder consent.
- `/appointment/confirmation` — confirmation summary with booking ID placeholder.
- `/dashboard` — patient dashboard with appointment history, profile completion, saved care, and live assistant entry point.
- `/account`, `/feedback`, `/login` — patient profile, feedback, and authentication placeholder flows.
- `/admin`, `/hospital-admin`, `/doctor-admin` — role-aware operations previews.

## Integration guide

Read [`INTEGRATION_SETUP.md`](./INTEGRATION_SETUP.md) for the complete VAPI setup sequence, outbound call payload, assistant prompt, server URL, webhook behavior, OpenRouter streaming notes, Deep Agents/LangSmith guidance, environment checklist, security controls, and production database follow-up.

## Current production boundary

The project now uses Neon Postgres through the server-only `DOCX_DATABASE_URL` secret and the Neon HTTP Drizzle adapter. The workbook has been imported into Neon: **100 hospitals, 100 doctors, and 100 visit slots**. The `users`, `hospitals`, `doctors`, `visits`, and `appointments` tables are migrated, with unique visit-slot constraints and atomic capacity updates. `DOCX_REDIS_URL` is configured as `redis://localhost:6379` for local development only; it is not a production Redis deployment.

The landing page and login page are public. Care discovery, hospital/doctor profiles, dashboard, booking, confirmation, account, feedback, and admin routes are guarded by the DocX session. The booking mutation requires authentication and uses one atomic Postgres statement to increment a slot only when capacity remains, then insert the appointment; concurrent attempts are tested and one is rejected for a capacity-one slot. The login CTA opens the configured OAuth flow and redirects an authenticated session to the dashboard.

The authenticated desktop and mobile navigation now exposes **Sign out**. It calls the existing server-side `auth.logout` mutation, clears the session cookie and preview token, invalidates the cached user session, and returns the user to the public home page. Neon also contains five repeatable demo role profiles: two `hospital_authority` users and three `doctor` users. These are role records for demos and administration—not password accounts—so an actual OAuth identity must be mapped to them before using them as login credentials.

Administrators can open `/admin/users` from the role-aware primary navigation. The dashboard reads current `demo-*` profiles from Neon, filters them by role, shows identity and current role details, and assigns `user`, `admin`, `hospital_authority`, or `doctor` through an admin-only tRPC mutation. Non-admin users see an access-denied state, while the server independently enforces `adminProcedure` and rejects non-demo identities from this management surface.

Before handling real patient information, add server-side booking transactions, slot locking, authentication and role authorization, audit logs, consent records, retention/deletion controls, notification delivery logs, VAPI call-log persistence, transcript redaction, and healthcare security review. DocX is a care-navigation and booking platform, not a medical provider. Emergency copy should always direct urgent users to local emergency services.

## Local validation

```bash
pnpm check
pnpm test
pnpm build
```

The current validation suite covers the auth logout contract, imported-directory counts, VAPI event normalization, protected reminder access, VAPI payload construction, and live OpenRouter/VAPI credential authentication.
