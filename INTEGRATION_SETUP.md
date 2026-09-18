# DocX integration setup guide

This guide explains how to move the DocX MVP from local/demo behavior to secure integration behavior. The current project keeps private API keys on the server and uses the supplied workbook as demo seed data. Do not place any secret in React code, `client/public`, browser local storage, screenshots, or chat-visible source files.

## What is already configured

The secure WebDev environment now contains the provided Clerk, Resend, OpenRouter, LangSmith, VAPI, and Google Maps demo variables. The OpenRouter and VAPI credentials were checked through lightweight authenticated API requests. The project also contains:

- `server/integrations/openrouter.ts` — server-only DocX Assistant client.
- `server/integrations/vapi.ts` — server-only outbound-call client and event normalizer.
- `server/integrations/vapi-webhook.ts` — `POST /api/vapi/webhook` receiver.
- `server/routers.ts` — `assistant.ask`, `directory.stats`, and authenticated `vapi.createReminder` procedures.
- `client/src/lib/demo-data.ts` — generated seed data from the workbook.
- `client/src/lib/mock-data.ts` — featured Bengaluru records plus the imported 100-hospital, 100-doctor, and 100-visit demo records.

The supplied workbook has four sheets: `Hospitals`, `Doctors`, `Schema_Map`, and `Lookups`. The current import preserves demo IDs, names, specialties, city areas, contact placeholders, ratings, fee bands, emergency flags, bed capacity, tests, OPD eligibility, and pseudonymous doctor records. The workbook is demo data and must not be treated as verified medical or licensing data.

## VAPI setup: dashboard steps

### 1. Confirm the VAPI project and phone number

Open the VAPI Dashboard and select the project that owns these resources:

- Assistant ID: `VAPI_ASSISTANT_ID`
- Outbound phone number resource: `VAPI_PHONE_NUMBER_ID`
- Caller number: `VAPI_PHONE_NUMBER`

The outbound-calling API requires a saved assistant (or a transient assistant), a phone-number ID to call from, and a customer destination number. VAPI's official outbound-calling documentation describes these as the required call inputs.

The provided caller number is a US `+1` number. Before calling Indian patients, confirm that the number is permitted for the destination country and that the telephony provider, consent rules, caller-ID registration, and applicable local regulations are satisfied. For production, use a verified business number and follow the provider's anti-spam and caller-identity requirements.

### 2. Configure the assistant

Create or open the DocX reminder assistant. Use a short, explicit system prompt such as:

```text
You are the DocX appointment reminder assistant. You call only people who have opted in to receive a reminder about a healthcare appointment. Confirm the patient's name, hospital, doctor, appointment date, and time. Ask whether they will attend. If they say yes, thank them and end the call. If they want to change or cancel, explain that a DocX coordinator will follow up; do not invent availability or make a medical recommendation. If the person says this is an emergency, tell them to contact local emergency services immediately and do not continue appointment logistics. Never ask for payment card numbers, passwords, one-time codes, or detailed medical histories.
```

Configure:

- **First message:** `Hello, this is DocX calling about your upcoming appointment. Is now a good time?`
- **Voice:** choose a clear, slower voice suitable for older callers.
- **Language:** start with English; add local languages only after reviewing transcription and consent quality.
- **Temperature / creativity:** keep low for reminders.
- **End-call behavior:** end after confirmation, refusal, repeated no-response, or emergency escalation.
- **Call analysis:** enable a short summary and structured outcome such as `confirmed`, `request_change`, `cancel_requested`, `no_answer`, or `escalate_emergency`.
- **Variables:** configure placeholders for `customer_name`, `hospital_name`, `doctor_name`, `appointment_date`, `appointment_time`, `booking_id`, and `callback_number`. The DocX server sends patient-specific values through assistant overrides; never put them in the assistant's permanent prompt.

### 3. Configure the VAPI Server URL

Set the assistant-level or phone-number-level Server URL to:

```text
https://YOUR-DOCX-DOMAIN/api/vapi/webhook
```

The current route is `/api/vapi/webhook`. VAPI server URLs can receive status updates, transcript updates, function calls, assistant requests, end-of-call reports, and hang notifications. The current MVP normalizes the safe operational fields and acknowledges the event; the next production step is to persist events into a notification/call-log table.

If your VAPI workspace supports a server authentication secret, create a `VAPI_SERVER_SECRET` secret in WebDev and configure the same value in VAPI. The current webhook accepts `x-vapi-secret` or `x-vapi-webhook-secret` when `VAPI_SERVER_SECRET` is present. In production, require this secret and reject unsigned requests.

### 4. Create an outbound call

The backend already uses the VAPI phone-call endpoint. The important request shape is:

```ts
const response = await fetch("https://api.vapi.ai/call/phone", {
  method: "POST",
  headers: {
    Authorization: `Bearer ${process.env.VAPI_PRIVATE_API_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    assistantId: process.env.VAPI_ASSISTANT_ID,
    phoneNumberId: process.env.VAPI_PHONE_NUMBER_ID,
    customer: {
      number: "+919876543210",
      name: "Riya Kapoor",
    },
    assistantOverrides: {
      variableValues: {
        customer_name: "Riya Kapoor",
        hospital_name: "Apollo Green Hospital",
        doctor_name: "Dr. Ananya Rao",
        appointment_date: "18 September 2026",
        appointment_time: "4:30 PM",
        booking_id: "DX-28419",
      },
    },
  }),
});
```

For a future reminder, pass `schedulePlan.earliestAt` as an ISO timestamp rather than relying on the browser to stay open. The DocX `vapi.createReminder` procedure accepts a scheduled ISO time and variable map, and requires an authenticated user.

### 5. Test safely

Start with a phone number you control and a test appointment. Check:

1. The call uses the expected caller ID.
2. The assistant reads the correct appointment details.
3. `yes` creates a `confirmed` outcome.
4. `change` and `cancel` do not invent a replacement slot.
5. No-answer and voicemail behavior are clear and bounded.
6. The webhook receives status and end-of-call events.
7. No API key, full transcript, or medical detail is written to normal application logs.
8. Repeated requests do not create duplicate calls; add an idempotency key before production.

A VAPI call is an external action with real telephony cost and patient impact. Add an explicit opt-in check, quiet hours, retry limits, and a human escalation path before enabling automatic reminders for real patients.

## OpenRouter DocX Assistant

The live assistant card calls the server-only `assistant.ask` procedure. The server reads `OPENROUTER_API_KEY` and `OPENROUTER_MODEL`, so the key is never sent to the browser. The selected model is:

```text
deepseek/deepseek-v4-flash-0731
```

The current implementation uses the official TypeScript SDK with an internally streamed response. The server collects the visible text and final usage metadata before returning the safe answer to the browser; hidden reasoning tokens are never displayed to patients.

Keep the assistant grounded in directory data when it is upgraded to production. It should retrieve hospitals and doctors from the database, cite the matching record internally, and clearly say when no match exists. It must not diagnose or give emergency medical advice.

## Deep Agents and LangSmith

Deep Agents is better suited to multi-step back-office workflows than the short patient-facing assistant. A future care-operations agent could review a failed reminder, summarize the call, propose a follow-up queue, and ask for human approval before changing an appointment.

Example server-side shape:

```ts
import { createDeepAgent } from "deepagents";

const agent = await createDeepAgent({
  model: "openrouter:openrouter:z-ai/glm-5.2",
  systemPrompt: "You are a DocX care-operations assistant. Never change a patient appointment without human approval.",
});

const result = await agent.invoke({
  messages: [{ role: "user", content: "Summarize this reminder outcome and suggest the next queue action." }],
});
```

Use LangSmith for tracing, debugging, and evaluation. Configure `LANGSMITH_API_KEY`, `LANGSMITH_ENDPOINT`, `LANGSMITH_PROJECT`, and `LANGSMITH_TRACING=true`. Do not include phone numbers, full transcripts, or identifying health information in traces unless the privacy, retention, and access controls have been reviewed. Prefer redacted test fixtures for evaluation.

## Neon Postgres and Redis

The project uses the server-only `DOCX_DATABASE_URL` variable because the platform reserves the built-in `DATABASE_URL`. The value points to the supplied Neon pooled connection and is consumed by `drizzle-orm/neon-http`; it is never imported by client code. The project also uses `DOCX_REDIS_URL=redis://localhost:6379` as a local-only fallback for future queues or cache work. Replace it with a managed TLS Redis URL before production.

The Postgres migrations generated from `drizzle/schema.ts` were reviewed and applied directly through the Neon serverless driver. Neon now contains the `user_role`, `appointment_status`, `users`, `hospitals`, `doctors`, `visits`, and `appointments` structures. The workbook seed is recorded by source and currently contains 100 hospitals, 100 doctors, and 100 visit slots. The WebDev SQL tool was not used for these migrations because it targets the platform's built-in TiDB database rather than the supplied Neon instance. Neon `SELECT 1`, Drizzle query, import-count, and migration checks pass.

### Booking concurrency

`server/booking.ts` reserves a slot with one atomic Postgres statement: a conditional `UPDATE visits ... WHERE bookedCount < capacity` is materialized in a CTE, then the appointment is inserted from the reserved row. If capacity is exhausted or the same user already has a confirmed appointment for that visit, the statement returns no row and the request fails. The `visits_doctor_slot_unique` index prevents duplicate doctor/time slots, while `appointments_visit_user_unique` prevents duplicate user reservations. A concurrent capacity-one test proves that exactly one of two simultaneous reservations succeeds.

### Route access

Only `/` and `/login` are public. All directory, doctor, hospital, booking, confirmation, dashboard, account, feedback, and admin routes render through the session guard. The `/login` CTA calls the real OAuth starter, and successful authentication navigates to `/dashboard`. VAPI reminder creation remains protected server-side; no private VAPI key is sent to React.

### Sign out and demo users

The shared `TopNav` uses `useAuth().logout()` for both desktop and mobile sign-out buttons. The mutation clears the server session cookie; the client then removes the preview session token, invalidates `auth.me`, closes the mobile menu, and navigates to `/`. The logout contract is covered by `server/auth.logout.test.ts`.

### Admin demo-user dashboard

The protected `/admin/users` page is available to users whose server session has the `admin` role. It uses `admin.demoUsers` to load the current `demo-*` profiles from Neon and `admin.updateDemoUserRole` to assign one of the supported roles: `user`, `admin`, `hospital_authority`, or `doctor`. The UI provides an all-profiles view, role filters, current identity details, and inline role selectors with success/error feedback. Both procedures use `adminProcedure`; the update helper also rejects non-demo OpenIDs. The page is linked in the primary navigation only for authenticated admins.

Run `pnpm exec tsx scripts/seed-demo-users.ts` to idempotently seed the current demo profiles. The script creates two `hospital_authority` users—Arvind Sharma for Apollo Green and Neha Bhatia for Manipal Heritage—and three `doctor` users—Dr. Ananya Rao, Dr. Vivek Menon, and Dr. Meera Iyer. Their `openId` values are `demo-*` identifiers and their `loginMethod` is `demo`; they are not password credentials. The `user_role` enum now supports `user`, `admin`, `hospital_authority`, and `doctor`.

Before importing the workbook into production tables:

1. Provision the remaining database tables and keep all Neon credentials in the secret manager.
2. Add tables for hospitals, doctors, hospital-doctor visits, appointments, feedback, notification jobs, VAPI call logs, and audit logs.
3. Store all business timestamps as UTC milliseconds and format them in the user's local timezone.
4. Add unique constraints for hospital IDs, doctor IDs, phone/email identity, appointment slots, and webhook event IDs.
5. Add slot locking or a transaction around appointment creation.
6. Use Clerk authentication plus server-side role checks for patient, hospital authority, doctor, and central admin actions.
7. Add retention, consent, export, deletion, and audit-log policies before storing real patient information.

## Environment checklist

Set these through the secret manager, not in committed files:

| Variable | Status / purpose |
|---|---|
| `NEXT_PUBLIC_APP_URL` | Set to the deployed DocX URL when known |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Configured |
| `CLERK_SECRET_KEY` | Configured |
| `DOCX_DATABASE_URL` | Configured with the supplied Neon pooled Postgres connection; server-only |
| `DATABASE_URL` | Platform-reserved; not overwritten by DocX |
| `DIRECT_URL` | Not required by the current Neon HTTP Drizzle migration path |
| `DOCX_REDIS_URL` | Configured as `redis://localhost:6379` for local development only |
| `RESEND_API_KEY` | Configured |
| `RESEND_FROM_EMAIL` | Configured; verify domain/sender before production |
| `OPENROUTER_API_KEY` | Configured |
| `OPENROUTER_MODEL` | Configured |
| `LANGSMITH_API_KEY` | Configured |
| `LANGSMITH_ENDPOINT` | Configured |
| `LANGSMITH_PROJECT` | Configured as `docx` |
| `LANGSMITH_TRACING` | Configured as `true`; review PHI redaction first |
| `N8N_WEBHOOK_URL` | Intentionally blank; not needed for the current flow |
| `VAPI_PRIVATE_API_KEY` | Configured; server-only |
| `VAPI_PUBLIC_API_KEY` | Configured; avoid exposing unless a browser widget needs it |
| `VAPI_ASSISTANT_ID` | Configured |
| `VAPI_PHONE_NUMBER_ID` | Configured |
| `VAPI_PHONE_NUMBER` | Configured as the caller-number reference |
| `VAPI_SERVER_SECRET` | Recommended before production webhook use |
| `GOOGLE_MAPS_DEMO_API_KEY` | Stored for demo reference; current WebDev map proxy does not require it |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Not required with the current WebDev map proxy |

## Official references

- [VAPI outbound calling](https://docs.vapi.ai/calls/outbound-calling)
- [VAPI Server URLs](https://docs.vapi.ai/server-url)
- [OpenRouter Quickstart](https://openrouter.ai/docs/quickstart)
- [OpenRouter TypeScript SDK](https://www.npmjs.com/package/@openrouter/sdk)
- [Deep Agents JavaScript overview](https://docs.langchain.com/oss/javascript/deepagents/overview)
