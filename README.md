# DocX

> **Care, without the runaround.**  
> Real-time hospital outpatient (OPD) slot booking, verified doctor directory, atomic database concurrency, and automated conversational Twilio voice reminders.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb.svg)](https://react.dev/)
[![tRPC](https://img.shields.io/badge/tRPC-v11-2596be.svg)](https://trpc.io/)
[![Neon](https://img.shields.io/badge/Postgres-Neon%20Serverless-00e699.svg)](https://neon.tech/)
[![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF.svg)](https://clerk.com/)
[![Twilio](https://img.shields.io/badge/Voice-Twilio-F22F46.svg)](https://www.twilio.com/)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-doc--x--five.vercel.app-146b5a.svg?style=for-the-badge&logo=vercel)](https://doc-x-five.vercel.app/)

> 🌐 **Live Website**: [https://doc-x-five.vercel.app/](https://doc-x-five.vercel.app/)

---

## 🌟 Overview

**DocX** is a modern healthcare appointment and care-navigation platform engineered to eliminate outpatient overcrowding and long waiting hours in hospitals.

Key highlights:
- **Zero Double-Bookings**: Atomic PostgreSQL SQL transactions guarantee that a slot is reserved exactly once under concurrent requests.
- **Automated Twilio Voice Reminders**: Outbound phone calls placed 24 hours prior to consultations allow patients to confirm or cancel their appointments via natural voice speech.
- **Four Role-Based Workspaces**: Distinct, access-guarded portals for **Patients**, **Doctors**, **Hospital Authorities**, and **Central Administrators**.
- **Instant Hospital Check-In**: Transparent booking IDs and real-time appointment tracking.
- **Resend Contact Dispatch**: Instant email delivery directly to the care operations team.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Wouter, Radix UI Primitives, Lucide Icons, Recharts, Framer Motion.
- **Backend**: Node.js, Express, tRPC v11 (end-to-end type safety).
- **Database & ORM**: Neon Serverless PostgreSQL with Drizzle ORM.
- **Authentication**: Clerk Auth + signed DocX session cookies with role-based routing.
- **Voice & Telephony**: Twilio Voice (TwiML Gather & automated speech recognition) + VAPI Voice Agent webhooks.
- **AI Navigation**: OpenRouter (DeepSeek LLM) for intelligent triage guidance.
- **Email Delivery**: Resend API for transactional contact forms and support dispatch.

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 20+ (Node 22+ recommended)
- `pnpm` (version 9 or 10)

### 1. Clone & Install
```bash
git clone https://github.com/arkokundu500/DocX.git
cd DocX
pnpm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
DOCX_DATABASE_URL=postgresql://... (Neon connection string)
DATABASE_URL=postgresql://...

VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

JWT_SECRET=your-secret-key-change-in-production

RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=arkokundu500@gmail.com

TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_API_KEY_SID=...
TWILIO_API_KEY_SECRET=...
TWILIO_PHONE_NUMBER=...

VAPI_PRIVATE_API_KEY=...
VAPI_PUBLIC_API_KEY=...
VAPI_ASSISTANT_ID=...
VAPI_PHONE_NUMBER=...

OPENROUTER_API_KEY=...
OPENROUTER_MODEL=deepseek/deepseek-v4-flash-0731
```

### 3. Database Migration & Seeding
```bash
pnpm db:migrate:neon    # Run Drizzle migrations on Neon
pnpm db:seed            # Seed 100 hospitals, 100 doctors, and visit slots
pnpm db:seed:accounts   # Seed demo Clerk test accounts
```

### 4. Run Development Server
```bash
pnpm dev
# Open http://localhost:3000
```

---

## 🔑 Demo Accounts (Role-Based Testing)

Sign in at `/login` with test credentials (email verification code in test mode is `424242`):

| Role | Username | Password | Default Portal |
| :--- | :--- | :--- | :--- |
| **Patient** | `docx-patient` | `DocxPatient#2026` | `/dashboard` |
| **Central Admin** | `docx-admin` | `DocxAdmin#2026` | `/admin` |
| **Doctor** | `docx-doctor` | `DocxDoctor#2026` | `/doctor-admin` |
| **Hospital Authority** | `docx-hospital` | `DocxHospital#2026` | `/hospital-admin` |

---

## 🌐 Deploying to Vercel

DocX is configured for deployment on Vercel:
- **Build Command**: `pnpm run build`
- **Output Directory**: `dist/public`
- **API Serverless Handler**: `api/index.ts`
- **Configuration File**: `vercel.json`

### Required Vercel Environment Variables:
Add the following in your **Vercel Project Settings > Environment Variables**:
- `DOCX_DATABASE_URL` & `DATABASE_URL`
- `VITE_CLERK_PUBLISHABLE_KEY` & `CLERK_SECRET_KEY`
- `JWT_SECRET`
- `RESEND_API_KEY` & `RESEND_FROM_EMAIL`
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
- `VAPI_PRIVATE_API_KEY`, `VAPI_ASSISTANT_ID`, `VAPI_PHONE_NUMBER`
- `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`

---

## 📄 License
MIT License. Built with ❤️ for better patient care.
