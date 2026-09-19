import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  CheckCircle2,
  ChevronDown,
  Clock3,
  HeartPulse,
  Menu,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { hospitals, doctors, getDoctor, getDoctorName, getHospitalName } from "@/lib/mock-data";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { roleHome } from "@/lib/roles";
import { ContactModal, InfoModal } from "./ContactModal";

export const colors = {
  ink: "#17342f",
  forest: "#146b5a",
  forestDeep: "#0e4c42",
  mint: "#dcefe5",
  cream: "#fbfaf6",
  red: "#b8443e",
  coral: "#f0d7cb",
  line: "#dfe9e4",
};

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label="DocX home">
      <span className={`grid size-10 place-items-center rounded-[14px] ${inverse ? "bg-white/15 text-white" : "bg-[#dcefe5] text-[#146b5a]"}`}>
        <HeartPulse size={21} strokeWidth={2.5} />
      </span>
      <span className={`font-display text-[22px] font-semibold tracking-[-0.04em] ${inverse ? "text-white" : "text-[#17342f]"}`}>doc<span className={inverse ? "text-[#f0b1a5]" : "text-[#b8443e]"}>x</span></span>
    </Link>
  );
}

export function TopNav() {
  const [open, setOpen] = useState(false);
  const [location, navigate] = useLocation();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const navItems = [
    { label: "Find care", href: "/hospitals" },
    { label: "Find Doc", href: "/doctors" },
    { label: "How it works", href: "/#how-it-works" },
    ...(isAuthenticated && user?.role === "hospital_authority" ? [{ label: "Hospital workspace", href: "/hospital-admin" }] : []),
    ...(isAuthenticated && user?.role === "doctor" ? [{ label: "Doctor workspace", href: "/doctor-admin" }] : []),
  ];
  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/");
  };
  return (
    <>
      <div className="hidden bg-[#0e4c42] text-white sm:block">
        <div className="container flex min-h-9 items-center justify-between text-[11px] font-semibold tracking-[0.03em] text-white/75">
          <span>Trusted by many Indians</span>
          <span className="inline-flex items-center gap-2"><ShieldCheck size={13} className="text-[#a9d9bd]" /> Verified hospitals & doctors</span>
        </div>
      </div>
      <header className="sticky top-0 z-40 border-b border-[#dfe9e4]/80 bg-[#fbfaf6]/90 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center justify-between gap-5">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={`group inline-flex items-center gap-1.5 text-[13px] font-semibold transition-colors ${location.startsWith(item.href.replace("/#how-it-works", "")) ? "text-[#146b5a]" : "text-[#50635e] hover:text-[#146b5a]"}`}>
                {item.label}{item.label === "For hospitals" && <ChevronDown size={13} />}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-2.5 sm:flex">
            {isAuthenticated ? <><Link href={roleHome(user?.role)} className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(20,107,90,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0e4c42]">My workspace <ArrowRight size={14} /></Link><button type="button" disabled={loading} onClick={handleLogout} className="rounded-full px-4 py-2.5 text-[13px] font-bold text-[#17342f] transition hover:bg-[#f9e3df] hover:text-[#a53f39]">{loading ? "Signing out…" : "Sign out"}</button></> : <><Link href="/login" className="rounded-full px-4 py-2.5 text-[13px] font-bold text-[#17342f] transition hover:bg-[#eaf3ed]">Sign in</Link><Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-[13px] font-bold text-white shadow-[0_8px_20px_rgba(20,107,90,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0e4c42]">Get started <ArrowRight size={14} /></Link></>}
          </div>
          <button className="grid size-11 place-items-center rounded-full bg-[#eaf3ed] text-[#146b5a] sm:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>{open ? <X size={21} /> : <Menu size={21} />}</button>
        </div>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="border-t border-[#dfe9e4] bg-[#fbfaf6] px-5 py-5 sm:hidden">
            <nav className="grid gap-2">
              {navItems.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-[#17342f] hover:bg-[#eaf3ed]">{item.label}</Link>)}
              {isAuthenticated ? <><Link href={roleHome(user?.role)} onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#146b5a] px-4 py-3 text-center text-sm font-bold text-white">My workspace</Link><button type="button" disabled={loading} onClick={handleLogout} className="rounded-full border border-[#dfe9e4] px-4 py-3 text-center text-sm font-bold text-[#a53f39]">{loading ? "Signing out…" : "Sign out"}</button></> : <Link href="/login" onClick={() => setOpen(false)} className="mt-2 rounded-full border border-[#dfe9e4] px-4 py-3 text-center text-sm font-bold text-[#17342f]">Sign in</Link>}
            </nav>
          </motion.div>
        )}
      </header>
    </>
  );
}

export function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactSubject, setContactSubject] = useState("General Inquiry");
  const [infoModal, setInfoModal] = useState<"about" | "privacy" | "terms" | "emergency" | null>(null);

  useEffect(() => {
    const handleCustomContact = (e: Event) => {
      const detail = (e as CustomEvent)?.detail;
      setContactSubject(detail?.subject || "General Inquiry");
      setContactOpen(true);
    };
    window.addEventListener("docx:open-contact", handleCustomContact);
    return () => window.removeEventListener("docx:open-contact", handleCustomContact);
  }, []);

  const openContact = (subject: string = "General Inquiry") => {
    setContactSubject(subject);
    setContactOpen(true);
  };

  return (
    <>
      <footer className="bg-[#103e38] text-white">
        <div className="container py-14 sm:py-18">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
            <div>
              <Logo inverse />
              <p className="mt-5 max-w-xs text-sm leading-6 text-white/65">
                The calmer way to find the right care, book an OPD visit, and keep every appointment on track.
              </p>
              <button
                type="button"
                onClick={() => setInfoModal("emergency")}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-2 text-xs text-white/80 hover:bg-white/15 hover:text-white transition"
              >
                <PhoneCall size={14} className="text-[#f0b1a5]" /> 24/7 emergency support directory
              </button>
            </div>

            {/* Column 1: Patients */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">For patients</h3>
              <div className="mt-4 grid gap-3">
                <Link href="/hospitals" className="w-fit text-sm text-white/75 transition hover:text-white">
                  Find a hospital
                </Link>
                <Link href="/hospitals" className="w-fit text-sm text-white/75 transition hover:text-white">
                  Find a doctor
                </Link>
                <Link href="/#how-it-works" className="w-fit text-sm text-white/75 transition hover:text-white">
                  How it works
                </Link>
                <Link href="/dashboard" className="w-fit text-sm text-white/75 transition hover:text-white">
                  Your dashboard
                </Link>
              </div>
            </div>

            {/* Column 2: Care teams */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">For care teams</h3>
              <div className="mt-4 grid gap-3">
                <Link href="/hospital-admin" className="w-fit text-sm text-white/75 transition hover:text-white">
                  Hospital authority
                </Link>
                <Link href="/doctor-admin" className="w-fit text-sm text-white/75 transition hover:text-white">
                  Doctor workspace
                </Link>
                <button
                  type="button"
                  onClick={() => openContact("Partner with DocX")}
                  className="w-fit text-left text-sm text-white/75 transition hover:text-white"
                >
                  Partner with DocX
                </button>
                <button
                  type="button"
                  onClick={() => openContact("Feedback")}
                  className="w-fit text-left text-sm text-white/75 transition hover:text-white"
                >
                  Feedback
                </button>
              </div>
            </div>

            {/* Column 3: Company */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-white/45">Company</h3>
              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={() => setInfoModal("about")}
                  className="w-fit text-left text-sm text-white/75 transition hover:text-white"
                >
                  About DocX
                </button>
                <button
                  type="button"
                  onClick={() => setInfoModal("privacy")}
                  className="w-fit text-left text-sm text-white/75 transition hover:text-white"
                >
                  Privacy
                </button>
                <button
                  type="button"
                  onClick={() => setInfoModal("terms")}
                  className="w-fit text-left text-sm text-white/75 transition hover:text-white"
                >
                  Terms
                </button>
                <button
                  type="button"
                  onClick={() => openContact("General Inquiry")}
                  className="w-fit text-left text-sm font-bold text-[#a9d9bd] transition hover:text-white flex items-center gap-1.5"
                >
                  Contact us <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 DocX Technologies. Built for better visits.</span>
            <span>DocX is a booking and care-navigation platform, not a medical provider.</span>
          </div>
        </div>
      </footer>

      {/* Global Contact Us Pop-up Modal connected via Resend */}
      <ContactModal
        open={contactOpen}
        onOpenChange={setContactOpen}
        defaultSubject={contactSubject}
      />

      {/* About DocX Informational Modal */}
      <InfoModal
        open={infoModal === "about"}
        onOpenChange={(open) => { if (!open) setInfoModal(null); }}
        title="About DocX"
        subtitle="Empowering smarter, calmer hospital outpatient care"
      >
        <p>
          <strong>DocX</strong> is a next-generation healthcare appointment and care-navigation platform. Our mission is to eliminate outpatient overcrowding, end long waiting hours, and provide patients with reliable, verified doctor consultations.
        </p>
        <div className="rounded-2xl bg-[#f4faf7] p-4 border border-[#d2e5db] space-y-2">
          <div className="font-bold text-[#146b5a]">Key Innovations:</div>
          <ul className="list-disc list-inside space-y-1 text-xs text-[#50635e]">
            <li><strong>Live Neon DB OPD Sync:</strong> Real-time consultation slot inventory matching doctor availability.</li>
            <li><strong>Automated Twilio Voice Reminders:</strong> Proactive phone reminders 24 hours prior to confirm or reschedule visits.</li>
            <li><strong>Verified Hospitals & Doctors:</strong> Credential-checked medical practitioners and transparent consultation fees.</li>
            <li><strong>Digital Check-in:</strong> Instant booking verification reference codes for seamless hospital arrivals.</li>
          </ul>
        </div>
        <p className="text-xs text-[#78918a]">
          For hospital partnerships or queries, contact our leadership team directly at <strong>arkokundu500@gmail.com</strong>.
        </p>
      </InfoModal>

      {/* Privacy Policy Modal */}
      <InfoModal
        open={infoModal === "privacy"}
        onOpenChange={(open) => { if (!open) setInfoModal(null); }}
        title="Privacy Policy"
        subtitle="How we protect your personal health information"
      >
        <p>
          At DocX, patient privacy and medical confidentiality are paramount. We follow strict data protection standards in accordance with India's Digital Personal Data Protection (DPDP) Act 2023.
        </p>
        <div className="space-y-3 text-xs">
          <div>
            <strong className="text-[#17342f] block mb-0.5">1. Health Data Confidentiality</strong>
            <span className="text-[#78918a]">Your consultation reasons, patient notes, and phone numbers are encrypted both in transit (TLS 1.3) and at rest. Data is exclusively shared with the attending doctor and hospital authority for appointment preparation.</span>
          </div>
          <div>
            <strong className="text-[#17342f] block mb-0.5">2. No Third-Party Selling or Ads</strong>
            <span className="text-[#78918a]">We never sell, broker, or monetize your medical or contact details. Data is solely used for appointment scheduling and Twilio voice call notifications.</span>
          </div>
          <div>
            <strong className="text-[#17342f] block mb-0.5">3. Patient Autonomy & Deletion</strong>
            <span className="text-[#78918a]">You have full autonomy over your records. You can delete your scheduled appointment from your personal dashboard at any time, immediately releasing the hospital slot and purging the record.</span>
          </div>
        </div>
      </InfoModal>

      {/* Terms of Service Modal */}
      <InfoModal
        open={infoModal === "terms"}
        onOpenChange={(open) => { if (!open) setInfoModal(null); }}
        title="Terms of Service"
        subtitle="Important information regarding platform use and appointments"
      >
        <p>
          By booking appointments or accessing workspaces on DocX, you agree to the following terms:
        </p>
        <div className="space-y-3 text-xs">
          <div>
            <strong className="text-[#17342f] block mb-0.5">1. Platform Role</strong>
            <span className="text-[#78918a]">DocX provides technology for appointment scheduling, hospital queue coordination, and automated communication. DocX is not a licensed hospital or doctor and does not provide direct medical treatment or emergency triage.</span>
          </div>
          <div>
            <strong className="text-[#17342f] block mb-0.5">2. Emergency Disclaimer</strong>
            <span className="text-[#78918a]">DocX appointments are intended for routine and outpatient consultations (OPD). In the event of a medical emergency, trauma, or acute condition, immediately visit the nearest emergency room or dial 112 / 108.</span>
          </div>
          <div>
            <strong className="text-[#17342f] block mb-0.5">3. Cancellation & Rescheduling</strong>
            <span className="text-[#78918a]">Patients may cancel or reschedule their consultation prior to the appointment slot. Hospital authorities reserve the right to reschedule in the rare event of emergency doctor redeployment.</span>
          </div>
        </div>
      </InfoModal>

      {/* 24/7 Emergency Support Directory Modal */}
      <InfoModal
        open={infoModal === "emergency"}
        onOpenChange={(open) => { if (!open) setInfoModal(null); }}
        title="24/7 Emergency Directory"
        subtitle="National emergency helplines & urgent medical contacts"
      >
        <div className="grid gap-3 text-xs">
          <div className="flex items-center justify-between rounded-xl bg-[#fff2f0] p-3.5 border border-[#fadad7]">
            <div>
              <div className="font-bold text-[#b8443e] text-sm">National Emergency Helpline</div>
              <div className="text-[11px] text-[#78918a]">All-in-one emergency (Police, Fire, Medical)</div>
            </div>
            <a
              href="tel:112"
              className="rounded-lg bg-[#b8443e] px-3.5 py-1.5 font-bold text-white shadow-sm"
            >
              Dial 112
            </a>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f0faf4] p-3.5 border border-[#cbe9d8]">
            <div>
              <div className="font-bold text-[#146b5a] text-sm">Medical Emergency & Ambulance</div>
              <div className="text-[11px] text-[#78918a]">24/7 National Ambulance Dispatch</div>
            </div>
            <a
              href="tel:108"
              className="rounded-lg bg-[#146b5a] px-3.5 py-1.5 font-bold text-white shadow-sm"
            >
              Dial 108
            </a>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#fdfbf6] p-3.5 border border-[#ede3cf]">
            <div>
              <div className="font-bold text-[#8b6a32] text-sm">Pregnancy & Child Healthcare</div>
              <div className="text-[11px] text-[#78918a]">Janani Shishu Suraksha Karyakram</div>
            </div>
            <a
              href="tel:102"
              className="rounded-lg bg-[#8b6a32] px-3.5 py-1.5 font-bold text-white shadow-sm"
            >
              Dial 102
            </a>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-[#f8faf9] p-3.5 border border-[#dfe9e4]">
            <div>
              <div className="font-bold text-[#17342f] text-sm">DocX Operations Escalations</div>
              <div className="text-[11px] text-[#78918a]">Email dispatch (monitored 24/7)</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setInfoModal(null);
                openContact("Emergency Support Query");
              }}
              className="rounded-lg bg-[#17342f] px-3.5 py-1.5 font-bold text-white shadow-sm"
            >
              Contact
            </button>
          </div>
        </div>
      </InfoModal>
    </>
  );
}

export function PageFrame({ children, wide = false }: { children: React.ReactNode; wide?: boolean }) {
  return <div className="min-h-screen bg-[#fbfaf6] text-[#17342f]"><TopNav /><main className={wide ? "" : ""}>{children}</main><Footer /></div>;
}

export function SectionHeading({ eyebrow, title, body, action }: { eyebrow?: string; title: string; body?: string; action?: React.ReactNode }) {
  return <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div className="max-w-2xl">{eyebrow && <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">{eyebrow}</div>}<h2 className="font-display text-3xl font-semibold leading-[1.04] tracking-[-0.05em] text-[#17342f] sm:text-[42px]">{title}</h2>{body && <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#63736e]">{body}</p>}</div>{action}</div>;
}

export function SearchBar({ defaultValue = "", onSearch, compact = false }: { defaultValue?: string; onSearch?: (value: string) => void; compact?: boolean }) {
  const [value, setValue] = useState(defaultValue);
  const [, navigate] = useLocation();
  const submit = (e: React.FormEvent) => { e.preventDefault(); onSearch?.(value); navigate(`/hospitals${value ? `?q=${encodeURIComponent(value)}` : ""}`); };
  return <form onSubmit={submit} className={`flex w-full items-center gap-2 rounded-[18px] border border-white/60 bg-white p-1.5 shadow-[0_16px_35px_rgba(31,75,65,0.12)] ${compact ? "max-w-xl" : "max-w-2xl"}`}>
    <div className="flex min-w-0 flex-1 items-center gap-3 rounded-[14px] px-3.5 py-2.5"><Search size={18} className="shrink-0 text-[#78918a]" /><input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Search hospitals, doctors, specialties..." className="min-w-0 flex-1 bg-transparent text-sm font-medium text-[#17342f] outline-none placeholder:text-[#8aa09a]" aria-label="Search hospitals and doctors" /></div>
    <button className="inline-flex h-12 shrink-0 items-center gap-2 rounded-[14px] bg-[#146b5a] px-5 text-sm font-bold text-white transition hover:bg-[#0e4c42] active:scale-[0.98]">Search <ArrowRight size={15} /></button>
  </form>;
}

export function TrustPill({ children, tone = "green" }: { children: React.ReactNode; tone?: "green" | "red" | "cream" }) {
  return <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold ${tone === "red" ? "bg-[#f9e3df] text-[#a53f39]" : tone === "cream" ? "bg-[#f7f0df] text-[#8b6a32]" : "bg-[#e3f2e8] text-[#17644f]"}`}>{children}</span>;
}

export function Rating({ rating, count, dark = false }: { rating: number; count?: number; dark?: boolean }) {
  return <span className={`inline-flex items-center gap-1 text-sm font-bold ${dark ? "text-white" : "text-[#17342f]"}`}><span className="text-[#e79a42]">★</span> {rating.toFixed(1)} {count && <span className={`font-medium ${dark ? "text-white/55" : "text-[#8a9994]"}`}>({count})</span>}</span>;
}

export function HospitalCard({ hospital, featured = false }: { hospital: (typeof hospitals)[number]; featured?: boolean }) {
  return <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={`group overflow-hidden rounded-[24px] border border-[#dfe9e4] bg-white shadow-[0_12px_35px_rgba(26,61,52,0.06)] ${featured ? "lg:grid lg:grid-cols-[0.95fr_1.05fr]" : ""}`}>
    <div className={`relative overflow-hidden ${featured ? "min-h-[230px] lg:min-h-full" : "h-48"}`}><img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0f352e]/55 via-transparent to-transparent" /><div className="absolute left-4 top-4"><TrustPill tone={hospital.type === "Public" ? "cream" : "green"}>{hospital.type} hospital</TrustPill></div><div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white"><span className="text-xs font-semibold text-white/80">{hospital.openHours}</span><span className="inline-flex items-center gap-1.5 text-xs font-bold"><span className="text-[#f5c36a]">★</span>{hospital.rating}</span></div></div>
    <div className="p-5 sm:p-6"><div className="flex items-start justify-between gap-4"><div><Link href={`/hospitals/${hospital.id}`} className="font-display text-xl font-semibold tracking-[-0.04em] text-[#17342f] hover:text-[#146b5a]">{hospital.name}</Link><p className="mt-1.5 text-sm text-[#78918a]">{hospital.address}</p></div><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf3ed] text-[#146b5a]"><HeartPulse size={16} /></span></div><div className="mt-5 flex flex-wrap gap-1.5">{hospital.specialties.slice(0, 3).map((specialty) => <span key={specialty} className="rounded-full bg-[#f3f7f3] px-2.5 py-1 text-[11px] font-semibold text-[#59736b]">{specialty}</span>)}</div><div className="mt-5 flex items-center justify-between border-t border-[#edf2ef] pt-4"><div className="flex items-center gap-3 text-xs font-semibold text-[#6e817b]"><Rating rating={hospital.rating} count={hospital.reviewCount} />{hospital.ambulanceAvailable && <span className="inline-flex items-center gap-1 text-[#b8443e]"><PhoneCall size={13} /> Ambulance</span>}</div><Link href={`/hospitals/${hospital.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[#146b5a]">View details <ArrowRight size={13} /></Link></div></div>
  </motion.article>;
}

export function DoctorCard({ doctor }: { doctor: (typeof doctors)[number] }) {
  return <motion.article whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="group flex flex-col overflow-hidden rounded-[24px] border border-[#dfe9e4] bg-white p-4 shadow-[0_12px_35px_rgba(26,61,52,0.05)]"><div className="relative h-52 overflow-hidden rounded-[18px] bg-[#eaf3ed]"><img src={doctor.image} alt={doctor.name} className="h-full w-full object-cover object-top grayscale-[15%] transition duration-700 group-hover:scale-105" /><div className="absolute left-3 top-3"><TrustPill><ShieldCheck size={12} /> Verified</TrustPill></div></div><div className="flex flex-1 flex-col px-1 pb-1 pt-4"><div className="flex items-start justify-between gap-3"><div><Link href={`/doctors/${doctor.id}`} className="font-display text-lg font-semibold tracking-[-0.035em] text-[#17342f] hover:text-[#146b5a]">{doctor.name}</Link><p className="mt-1 text-xs font-semibold text-[#6b8179]">{doctor.specialty} · {doctor.experienceYears} yrs exp.</p></div><Rating rating={doctor.rating} /></div><div className="mt-auto flex items-center justify-between pt-5"><div><span className="block text-[11px] font-semibold uppercase tracking-[0.08em] text-[#9aa9a4]">Consultation</span><span className="mt-1 block text-sm font-bold text-[#17342f]">₹{doctor.fee.toLocaleString("en-IN")}</span></div><Link href={`/doctors/${doctor.id}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3ed] px-3.5 py-2.5 text-xs font-bold text-[#146b5a] transition hover:bg-[#dcefe5]">Profile <ArrowRight size={13} /></Link></div></div></motion.article>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#8da099]"><Link href="/" className="hover:text-[#146b5a]">Home</Link>{items.map((item, index) => <span key={item.label} className="inline-flex items-center gap-2"><span className="text-[#c4d1ca]">/</span>{item.href ? <Link href={item.href} className="hover:text-[#146b5a]">{item.label}</Link> : <span className={index === items.length - 1 ? "text-[#50635e]" : ""}>{item.label}</span>}</span>)}</div>;
}

export function AssistantCard({ compact = false }: { compact?: boolean }) {
  const [message, setMessage] = useState("");
  const ask = trpc.assistant.ask.useMutation();
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!message.trim() || ask.isPending) return;
    ask.mutate({ message: message.trim() });
  };
  return <div className={`relative overflow-hidden rounded-[28px] bg-[#103e38] text-white ${compact ? "p-5" : "p-7 sm:p-9"}`}><div className="absolute -right-10 -top-12 size-40 rounded-full border-[20px] border-[#2b7d68]/30" /><div className="absolute -bottom-16 right-20 size-36 rounded-full border-[16px] border-[#b8443e]/25" /><div className="relative"><div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-bold text-[#c9f0d6]"><Sparkles size={13} /> DocX Assistant</div><h3 className={`mt-4 max-w-lg font-display font-semibold leading-tight tracking-[-0.045em] ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>A little guidance before you book?</h3><p className="mt-3 max-w-lg text-sm leading-6 text-white/65">Tell us what you’re looking for and we’ll help you find the right specialty, hospital, or next step. DocX helps you navigate care — it does not diagnose.</p><form onSubmit={submit} className="mt-5 flex max-w-xl gap-2"><input value={message} onChange={(event) => setMessage(event.target.value)} className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#b8efd0]" placeholder="e.g. I need a cardiologist in Kolkata" aria-label="Ask DocX Assistant" /><button className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#f0b1a5] text-[#71352f] transition hover:bg-[#f5c4ba]" aria-label="Ask DocX Assistant">{ask.isPending ? <span className="size-4 animate-spin rounded-full border-2 border-[#71352f] border-t-transparent" /> : <ArrowRight size={17} />}</button></form>{ask.data && <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/85">{ask.data.text}</div>}{ask.error && <div className="mt-4 rounded-2xl bg-[#b8443e]/20 p-4 text-xs leading-5 text-[#ffd2cb]">The assistant is unavailable right now. You can still browse the directory and compare care partners.</div>}<Link href="/hospitals" className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#f0b1a5] px-4 py-3 text-xs font-bold text-[#71352f] transition hover:bg-[#f5c4ba]">Explore care options <ArrowRight size={14} /></Link></div></div>;
}

export function VoiceReminderCard({
  appointment,
  compact = false,
}: {
  appointment?: any;
  compact?: boolean;
}) {
  const { user, isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [isCalling, setIsCalling] = useState(false);
  const [confirmedLocally, setConfirmedLocally] = useState(false);

  // If appointment is not passed as prop, query patient's appointments if authenticated
  const myAppts = trpc.appointments.mine.useQuery(undefined, {
    enabled: isAuthenticated && !appointment,
    retry: false,
  });

  // Resolve active appointment: prop or first from user's live appointments
  const liveRows = (myAppts.data ?? []).map((row: any) => ({
    bookingId: row.bookingId as string,
    doctorId: row.doctorId as string,
    hospitalId: row.hospitalId as string,
    doctorName: row.doctorName || getDoctor(row.doctorId)?.name || "Specialist Doctor",
    hospitalName: row.hospitalName || getHospitalName(row.hospitalId),
    patientName: row.patientName as string,
    patientPhone: row.patientPhone as string,
    date: new Date(row.startsAt as unknown as string).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),
    time: new Date(row.startsAt as unknown as string).toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "2-digit",
    }),
    reason: String(row.reason),
    status: row.status === "cancelled" ? "Cancelled" : "Confirmed",
  }));

  const activeAppt = appointment || (liveRows.length > 0 ? liveRows[0] : null);

  // Dynamic doctor & hospital display
  const doctorName =
    activeAppt?.doctorName ||
    (activeAppt?.doctorId ? getDoctor(activeAppt.doctorId)?.name : null) ||
    "Dr. Sayan Mukherjee";

  const hospitalName =
    activeAppt?.hospitalName ||
    (activeAppt?.hospitalId ? getHospitalName(activeAppt.hospitalId) : null) ||
    "Kasturi Das Memorial Super Speciality Hospital";

  const rawDate =
    activeAppt?.date ||
    (activeAppt?.startsAt
      ? new Date(activeAppt.startsAt).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "Tomorrow");

  const rawTime =
    activeAppt?.time ||
    (activeAppt?.startsAt
      ? new Date(activeAppt.startsAt).toLocaleTimeString("en-IN", {
          hour: "numeric",
          minute: "2-digit",
        })
      : "10:30 AM");

  const bookingId = activeAppt?.bookingId;
  const isConfirmed =
    confirmedLocally ||
    (activeAppt?.status && String(activeAppt.status).toLowerCase() === "confirmed");

  // Real-time voice call mutation
  const createVoiceReminder = trpc.twilio.createVoiceReminder.useMutation();

  // Real-time visit confirmation mutation
  const confirmMutation = trpc.appointments.confirm.useMutation({
    onSuccess: () => {
      setConfirmedLocally(true);
      utils.appointments.mine.invalidate();
      toast.success(`Visit confirmed with ${doctorName} in Neon DB!`);
    },
    onError: (err) => {
      toast.error(err.message || "Could not confirm visit");
    },
  });

  const [customPhone, setCustomPhone] = useState(user?.phone || activeAppt?.patientPhone || "+917439817750");
  const [isEditingPhone, setIsEditingPhone] = useState(false);

  const handleConfirm = () => {
    if (bookingId) {
      confirmMutation.mutate({ bookingId });
    } else {
      setConfirmedLocally(true);
      toast.success(`Visit marked confirmed for ${doctorName}!`);
    }
  };

  const handleTestCall = async () => {
    const targetPhone = customPhone.trim() || user?.phone || activeAppt?.patientPhone || "+917439817750";
    setIsCalling(true);
    try {
      const res = await createVoiceReminder.mutateAsync({
        to: targetPhone,
        patientName: user?.name || activeAppt?.patientName || "Patient",
        doctorName,
        hospitalName,
        appointmentDate: rawDate,
        appointmentTime: rawTime,
        bookingId: bookingId || undefined,
      });

      if ((res as any)?.status === "trial_skipped") {
        toast.info(
          `Twilio Trial Mode: Call queued for ${targetPhone}. Note: Twilio trial accounts require verifying caller IDs at twilio.com/user/account/phone-numbers/verified.`
        );
      } else {
        toast.success(`Twilio Voice Agent is dialing ${targetPhone} now! Please answer your phone.`);
      }
    } catch (err: any) {
      toast.error(err?.message || "Failed to place voice call. Check phone number.");
    } finally {
      setIsCalling(false);
    }
  };

  return (
    <div className={`relative overflow-hidden rounded-[28px] border border-[#ead8d0] bg-[#f9eee9] ${compact ? "p-5" : "p-7 sm:p-9"}`}>
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_top_right,rgba(184,68,62,0.12),transparent_63%)]" />
      <div className={`relative grid gap-7 ${compact ? "grid-cols-1" : "lg:grid-cols-[1fr_0.86fr] lg:items-center"}`}>
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1.5 text-[11px] font-bold text-[#146b5a] shadow-xs">
            <span className="size-2 rounded-full bg-[#146b5a] animate-pulse" />
            <PhoneCall size={13} className="text-[#146b5a]" /> Twilio Voice Agent · Live in Realtime
          </div>
          <h3 className={`mt-4 max-w-lg font-display font-semibold leading-tight tracking-[-0.045em] text-[#71352f] ${compact ? "text-xl" : "text-2xl sm:text-3xl"}`}>
            The reminder you’d actually want to answer.
          </h3>
          <p className="mt-3 max-w-lg text-sm leading-6 text-[#906660]">
            24 hours before your visit, DocX Voice Agent dials your registered phone number to confirm, cancel, or reschedule. Realtime speech recognition with zero chasing.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={handleTestCall}
              disabled={isCalling}
              className="inline-flex items-center gap-2 rounded-full bg-[#b8443e] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#a03833] disabled:opacity-60 shadow-xs cursor-pointer"
            >
              {isCalling ? (
                <>
                  <span className="size-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Dialing your phone...
                </>
              ) : (
                <>
                  <PhoneCall size={14} />
                  Test Live Voice Call
                </>
              )}
            </button>

            {isEditingPhone ? (
              <div className="flex items-center gap-2 rounded-full border border-[#ead8d0] bg-white px-3 py-1 shadow-xs">
                <input
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  placeholder="+91..."
                  className="w-32 bg-transparent text-xs font-bold text-[#71352f] outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsEditingPhone(false)}
                  className="text-[10px] font-bold text-[#146b5a] hover:underline"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#906660]">
                <span>Target: <strong className="text-[#71352f]">{customPhone}</strong></span>
                <button
                  type="button"
                  onClick={() => setIsEditingPhone(true)}
                  className="text-[10px] font-bold text-[#b8443e] hover:underline cursor-pointer ml-1"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Realtime DocX Voice Agent Card */}
        <div className="rounded-[22px] border border-white/80 bg-white/85 p-4 shadow-[0_12px_30px_rgba(136,64,52,0.08)] backdrop-blur-xs">
          <div className="flex items-center gap-3 border-b border-[#f0ded8] pb-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#f4d4cd] text-[#a53f39]">
              <PhoneCall size={17} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#71352f]">DocX Voice Agent</span>
                <span className="rounded-full bg-[#e1f3e7] px-2 py-0.5 text-[9px] font-bold text-[#277352]">
                  {activeAppt ? "Active Booking" : "Ready"}
                </span>
              </div>
              <div className="mt-0.5 truncate text-[10px] font-semibold text-[#bd837a]">
                {rawDate} · {rawTime} · {hospitalName}
              </div>
            </div>
            <span className="ml-auto grid size-6 place-items-center rounded-full bg-[#e1f3e7] text-[#277352]">
              <Bell size={12} />
            </span>
          </div>

          <div className="py-4 text-center text-xs font-semibold text-[#7e5c57] leading-relaxed">
            “Will you be visiting {doctorName} {rawDate === "Tomorrow" ? "tomorrow" : `on ${rawDate}`} at {rawTime}?”
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleConfirm}
              disabled={isConfirmed || confirmMutation.isPending}
              className={`rounded-xl py-2.5 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                isConfirmed
                  ? "bg-[#277352] text-white"
                  : "bg-[#e1f3e7] text-[#277352] hover:bg-[#d2edd9]"
              }`}
            >
              {isConfirmed ? (
                <>
                  <CheckCircle2 size={13} />
                  Confirmed
                </>
              ) : confirmMutation.isPending ? (
                "Confirming..."
              ) : (
                "Yes, I’ll be there"
              )}
            </button>
            <Link
              href="/dashboard"
              className="rounded-xl bg-[#f9e3df] py-2.5 text-center text-xs font-bold text-[#a53f39] transition hover:bg-[#f4d4cd]"
            >
              Change my visit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppointmentMiniCard({ appointment = { hospitalId: "apollo-green", doctorId: "ananya-rao", date: "18 September 2026", time: "4:30 PM", reason: "Lower back pain for the last two weeks", status: "Confirmed" } }) {
  const doc = getDoctor(appointment.doctorId);
  const docImage = doc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85";
  return <div className="rounded-[24px] border border-[#dfe9e4] bg-white p-5 shadow-[0_12px_35px_rgba(26,61,52,0.05)]"><div className="flex items-start justify-between gap-4"><div><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9aa9a4]">Next appointment</div><h3 className="mt-2 font-display text-xl font-semibold tracking-[-0.04em] text-[#17342f]">{appointment.date}</h3><p className="mt-1 text-sm font-semibold text-[#6f817b]">{appointment.time} · {getHospitalName(appointment.hospitalId)}</p></div><TrustPill><span className="size-1.5 rounded-full bg-[#3b9a6d]" /> {appointment.status}</TrustPill></div><div className="mt-5 flex items-center gap-3 rounded-2xl bg-[#f3f7f3] p-3"><img src={docImage} alt={getDoctorName(appointment.doctorId)} className="size-11 rounded-xl object-cover object-top" /><div><div className="text-sm font-bold text-[#17342f]">{getDoctorName(appointment.doctorId)}</div><div className="mt-0.5 text-xs text-[#769087]">{appointment.reason}</div></div></div><div className="mt-4 grid grid-cols-2 gap-2"><Link href="/appointment/confirmation" className="rounded-xl bg-[#146b5a] py-3 text-center text-xs font-bold text-white transition hover:bg-[#0e4c42]">View appointment</Link><button className="rounded-xl border border-[#dfe9e4] py-3 text-xs font-bold text-[#50635e] transition hover:bg-[#f3f7f3]">Reschedule</button></div></div>;
}

export function StatCard({ label, value, change, icon: Icon, tone = "green" }: { label: string; value: string; change?: string; icon: React.ComponentType<{ size?: number; strokeWidth?: number }>; tone?: "green" | "red" | "cream" }) {
  const styles = tone === "red" ? "bg-[#f9e3df] text-[#a53f39]" : tone === "cream" ? "bg-[#f7f0df] text-[#8b6a32]" : "bg-[#e3f2e8] text-[#17644f]";
  return <div className="rounded-[20px] border border-[#dfe9e4] bg-white p-5 shadow-[0_8px_24px_rgba(26,61,52,0.04)]"><div className="flex items-start justify-between"><span className={`grid size-10 place-items-center rounded-xl ${styles}`}><Icon size={18} strokeWidth={2.2} /></span>{change && <span className="text-[11px] font-bold text-[#3b9a6d]">{change}</span>}</div><div className="mt-5 font-display text-3xl font-semibold tracking-[-0.06em] text-[#17342f]">{value}</div><div className="mt-1 text-xs font-semibold text-[#8a9994]">{label}</div></div>;
}

export function MobileBottomNav() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const workspaceHref = roleHome(user?.role);
  const workspaceLabel =
    user?.role === "doctor"
      ? "Doctor"
      : user?.role === "hospital_authority"
      ? "Hospital"
      : user?.role === "admin"
      ? "Admin"
      : "Dashboard";

  return (
    <div className="fixed inset-x-3 bottom-[calc(0.75rem+env(safe-area-inset-bottom,0px))] z-30 grid grid-cols-5 rounded-2xl border border-[#dfe9e4] bg-[#fbfaf6]/95 p-1 shadow-[0_12px_40px_rgba(26,61,52,0.14)] backdrop-blur-xl sm:hidden">
      <BottomNavItem href="/" label="Home" active={location === "/"} icon={<HeartPulse size={16} />} />
      <BottomNavItem href="/hospitals" label="Care" active={location.startsWith("/hospitals")} icon={<Search size={16} />} />
      <BottomNavItem href="/doctors" label="Find Doc" active={location === "/doctors"} icon={<Stethoscope size={16} />} />
      <BottomNavItem
        href={workspaceHref}
        label={workspaceLabel}
        active={location.startsWith(workspaceHref)}
        icon={<Clock3 size={16} />}
      />
      <BottomNavItem
        href={isAuthenticated ? "/account" : "/login"}
        label={isAuthenticated ? "Account" : "Sign in"}
        active={location.startsWith("/login") || location.startsWith("/account")}
        icon={<ShieldCheck size={16} />}
      />
    </div>
  );
}

function BottomNavItem({ href, label, active, icon }: { href: string; label: string; active: boolean; icon: React.ReactNode }) {
  return <Link href={href} className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[10px] font-bold ${active ? "bg-[#e3f2e8] text-[#146b5a]" : "text-[#8a9994]"}`}>{icon}<span>{label}</span></Link>;
}

export function AppLayout({ children }: { children: React.ReactNode }) {
  return <><PageFrame>{children}</PageFrame><MobileBottomNav /></>;
}
