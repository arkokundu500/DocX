import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { SignIn, SignUp, useSignIn, useSignUp } from "@clerk/react";
import { useAuth } from "@/_core/hooks/useAuth";
import {
  Activity,
  ArrowRight,
  Bell,
  Building2,
  Calendar,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Clock3,
  Edit2,
  FileText,
  Filter,
  HeartPulse,
  Hospital,
  KeyRound,
  LayoutDashboard,
  Lock,
  MoreHorizontal,
  Phone,
  PhoneCall,
  Plus,
  Search,
  Settings2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Trash2,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { useChat } from "@/contexts/ChatContext";
import {
  AppLayout,
  AppointmentMiniCard,
  AssistantCard,
  Breadcrumbs,
  SectionHeading,
  StatCard,
  TrustPill,
  VoiceReminderCard,
} from "@/components/DocxShell";
import { trpc } from "@/lib/trpc";
import { roleHome } from "@/lib/roles";
import { getDoctor, getHospitalName } from "@/lib/mock-data";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ─────────────────────────────────────────────────────────────────────────────
// PATIENT DASHBOARD (100% LIVE DATABASE DRIVEN)
// ─────────────────────────────────────────────────────────────────────────────
export function PatientDashboardPage() {
  const { user } = useAuth();
  const { openChat, hasUnread } = useChat();
  const utils = trpc.useUtils();
  const myAppointments = trpc.appointments.mine.useQuery(undefined, { retry: false });
  const [deleteBookingId, setDeleteBookingId] = useState<string | null>(null);

  const deleteApptMutation = trpc.appointments.delete.useMutation({
    onSuccess: (_, variables) => {
      toast.success("Appointment cancelled and deleted successfully");
      setDeleteBookingId(null);
      utils.appointments.mine.setData(undefined, (old) => {
        if (!old) return [];
        return old.filter((row: any) => row.bookingId !== variables.bookingId);
      });
      void utils.appointments.mine.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to delete appointment");
    },
  });

  const handleDeleteAppointment = (bookingId: string) => {
    setDeleteBookingId(bookingId);
  };

  const rawFirst = (user?.name ?? "there").split(" ")[0];
  const firstName = ["Dr.", "Mr.", "Ms.", "Mrs."].includes(rawFirst)
    ? (user?.name ?? "there").split(" ")[1] ?? rawFirst
    : rawFirst;

  const liveRows = (myAppointments.data ?? [])
    .filter((row: any) => {
      const startsAtMs = new Date(row.startsAt as unknown as string).getTime();
      return !isNaN(startsAtMs) && startsAtMs >= Date.now();
    })
    .map((row: any) => ({
      bookingId: row.bookingId as string,
      doctorId: row.doctorId as string,
      hospitalId: row.hospitalId as string,
      doctorName: row.doctorName || getDoctor(row.doctorId)?.name || "Consultation with Specialist",
      hospitalName: row.hospitalName || getHospitalName(row.hospitalId),
      patientName: row.patientName as string,
      patientPhone: row.patientPhone as string,
      rawStartsAt: new Date(row.startsAt as unknown as string).getTime(),
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
    }))
    .sort((a, b) => a.rawStartsAt - b.rawStartsAt);

  const latestAppt = liveRows[0];

  return (
    <AppLayout>
      <div className="container py-9 sm:py-12">
        <Breadcrumbs items={[{ label: "My dashboard" }]} />
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">
              Good morning, {firstName}
            </div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">
              Your care, in one place.
            </h1>
            <p className="mt-3 text-sm text-[#78918a]">
              Real-time consultations, verified hospital visits, and automated Twilio voice reminders.
            </p>
          </div>
          <Link
            href="/hospitals"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#146b5a] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
          >
            <Plus size={15} /> Book a visit
          </Link>
        </div>

        {/* Top Highlight Cards */}
        <div className="mt-9 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          {latestAppt ? (
            <div className="rounded-[28px] border border-[#d2e5db] bg-gradient-to-br from-[#ffffff] to-[#f4faf7] p-6 shadow-[0_12px_35px_rgba(26,61,52,0.05)] sm:p-7">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#e3f2e8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">
                  Next Upcoming Visit
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      openChat({
                        appointmentId: latestAppt.bookingId,
                        bookingId: latestAppt.bookingId,
                        doctorName: latestAppt.doctorName,
                        patientName: user?.name || "Patient",
                        hospitalName: latestAppt.hospitalName,
                        appointmentTime: `${latestAppt.date} · ${latestAppt.time}`,
                      })
                    }
                    className="relative inline-flex items-center gap-1.5 rounded-lg border border-[#cde4d9] bg-[#eaf3ed] px-2.5 py-1 text-[11px] font-bold text-[#146b5a] hover:bg-[#146b5a] hover:text-white transition cursor-pointer"
                    title="Open instant chat with doctor"
                  >
                    <MessageSquare size={12} />
                    <span>Chat with Doctor</span>
                    {hasUnread(latestAppt.bookingId) && (
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                        <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                      </span>
                    )}
                  </button>
                  <span className="font-mono text-xs font-semibold text-[#8da19a]">
                    ID: {latestAppt.bookingId}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDeleteAppointment(latestAppt.bookingId)}
                    disabled={deleteApptMutation.isPending}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#f5c6cb] bg-[#fff5f5] px-2.5 py-1 text-[11px] font-bold text-[#b8443e] hover:bg-[#ffebee] transition disabled:opacity-50"
                    title="Cancel and delete visit"
                  >
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
              <h2 className="mt-4 font-display text-2xl font-semibold text-[#17342f]">
                {latestAppt.doctorName}
              </h2>
              <p className="mt-1 text-sm text-[#78918a]">
                {latestAppt.hospitalName} · {latestAppt.reason}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-[#edf2ef] pt-4 text-xs font-semibold text-[#50635e]">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#146b5a]" /> {latestAppt.date}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 size={14} className="text-[#146b5a]" /> {latestAppt.time}
                </span>
                <TrustPill tone="green">Confirmed in Neon DB</TrustPill>
              </div>
            </div>
          ) : (
            <div className="rounded-[28px] border border-[#dfe9e4] bg-white p-7 text-center shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
              <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-[#eaf3ed] text-[#146b5a]">
                <CalendarDays size={24} />
              </span>
              <h3 className="mt-4 font-display text-2xl font-semibold text-[#17342f]">
                No upcoming visits yet
              </h3>
              <p className="mt-2 text-xs leading-5 text-[#78918a]">
                When you reserve an appointment with a verified doctor or hospital, your real booking and voice reminder will appear here.
              </p>
              <Link
                href="/hospitals"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-5 py-2.5 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
              >
                Find Doctors & Hospitals <ArrowRight size={14} />
              </Link>
            </div>
          )}

          {/* Realtime Twilio Voice Reminders Card */}
          <VoiceReminderCard appointment={latestAppt} compact />
        </div>

        {/* Bottom Section: Appointments List & Profile completion */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_350px]">
          <main>
            <section>
              <SectionHeading
                eyebrow="Your activity"
                title="Appointments & Consultations"
                action={
                  <Link href="/hospitals" className="hidden items-center gap-1 text-xs font-bold text-[#146b5a] sm:inline-flex">
                    Book another <ArrowRight size={14} />
                  </Link>
                }
              />
              <div className="mt-5 overflow-hidden rounded-[24px] border border-[#dfe9e4] bg-white">
                {myAppointments.isLoading ? (
                  <div className="p-8 text-center text-sm font-semibold text-[#78918a]">
                    Loading your appointments from database…
                  </div>
                ) : liveRows.length > 0 ? (
                  liveRows.map((row) => (
                    <div key={row.bookingId}>
                      <AppointmentRow
                        bookingId={row.bookingId}
                        status={row.status}
                        doctorId={row.doctorId}
                        doctorName={row.doctorName}
                        hospitalId={row.hospitalId}
                        hospitalName={row.hospitalName}
                        date={row.date}
                        time={row.time}
                        reason={row.reason}
                        onDelete={() => handleDeleteAppointment(row.bookingId)}
                        hasUnread={hasUnread(row.bookingId)}
                        onChat={() =>
                          openChat({
                            appointmentId: row.bookingId,
                            bookingId: row.bookingId,
                            doctorName: row.doctorName,
                            patientName: user?.name || "Patient",
                            hospitalName: row.hospitalName,
                            appointmentTime: `${row.date} · ${row.time}`,
                          })
                        }
                      />
                      <div className="px-4 pb-3 text-right font-mono text-[10px] font-semibold text-[#9aa9a4]">
                        Booking Ref: {row.bookingId}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-10 text-center">
                    <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#f4faf7] text-[#146b5a]">
                      <ClipboardList size={22} />
                    </span>
                    <h4 className="mt-3 font-display text-lg font-semibold text-[#17342f]">
                      No past or scheduled consultations
                    </h4>
                    <p className="mt-1.5 text-xs text-[#78918a]">
                      Your bookings will appear here in real time as soon as you reserve a consultation slot.
                    </p>
                    <Link
                      href="/hospitals"
                      className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#146b5a] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
                    >
                      Browse verified hospitals <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            </section>
            <section className="mt-10">
              <AssistantCard compact />
            </section>
          </main>

          <aside>
            <DynamicProfileCard user={user} />
            <div className="mt-5 rounded-[24px] border border-[#dfe9e4] bg-white p-5">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold tracking-[-0.04em]">Partner hospitals</h3>
                <Link href="/hospitals" className="text-xs font-bold text-[#146b5a]">
                  View all
                </Link>
              </div>
              <div className="mt-4 grid gap-3">
                <SavedItem icon={<Hospital size={15} />} title="Apollo Multispecialty" meta="Kolkata · 4.8 rating" />
                <SavedItem icon={<Hospital size={15} />} title="Manipal Hospital" meta="Bengaluru · 4.9 rating" />
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Delete Appointment Confirmation Modal */}
      <Dialog open={Boolean(deleteBookingId)} onOpenChange={(open) => { if (!open) setDeleteBookingId(null); }}>
        <DialogContent className="sm:max-w-[420px] rounded-[24px] p-6 bg-white border border-[#dfe9e4] shadow-2xl">
          <DialogHeader>
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-2xl bg-[#fff0ef] text-[#b8443e]">
              <Trash2 size={24} />
            </div>
            <DialogTitle className="text-center font-display text-xl font-semibold text-[#17342f]">
              Cancel & Delete Visit?
            </DialogTitle>
            <DialogDescription className="text-center text-xs text-[#78918a] leading-5 mt-1">
              Are you sure you want to cancel and delete appointment <strong className="font-mono text-[#17342f]">{deleteBookingId}</strong>? The reserved hospital slot will be released and this action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-5 flex gap-3">
            <Button
              type="button"
              variant="outline"
              className="flex-1 rounded-xl border-[#dfe9e4] text-xs font-bold text-[#50635e] hover:bg-[#f3f7f3]"
              onClick={() => setDeleteBookingId(null)}
              disabled={deleteApptMutation.isPending}
            >
              Keep visit
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="flex-1 rounded-xl bg-[#b8443e] hover:bg-[#9c3833] text-xs font-bold text-white shadow-sm"
              onClick={() => {
                if (deleteBookingId) {
                  deleteApptMutation.mutate({ bookingId: deleteBookingId });
                }
              }}
              disabled={deleteApptMutation.isPending}
            >
              {deleteApptMutation.isPending ? "Cancelling…" : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

function DynamicProfileCard({ user }: { user: any }) {
  const fields = [
    Boolean(user?.name),
    Boolean(user?.phone),
    Boolean(user?.city),
    Boolean(user?.age),
    Boolean(user?.bloodGroup),
    Boolean(user?.emergencyContact),
    Boolean(user?.medicalNotes),
  ];
  const filled = fields.filter(Boolean).length;
  const percentage = Math.round((filled / fields.length) * 100);

  return (
    <div className="rounded-[24px] border border-[#dfe9e4] bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa9a4]">
            Profile completion
          </div>
          <div className="mt-2 font-display text-3xl font-semibold">{percentage}%</div>
        </div>
        <span className="grid size-10 place-items-center rounded-xl bg-[#eaf3ed] text-[#146b5a]">
          <UserRound size={17} />
        </span>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#edf2ef]">
        <div
          className="h-full rounded-full bg-[#146b5a] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-3 text-xs leading-5 text-[#78918a]">
        {percentage < 100
          ? "Add contact, age, and medical history to expedite hospital check-ins."
          : "Your medical and emergency contact profile is fully updated."}
      </p>
      <Link href="/account" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#146b5a]">
        Update profile <ArrowRight size={13} />
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// CENTRAL ADMIN (ANALYTICS, USERS CRUD, DOCTORS CRUD, HOSPITALS CRUD)
// ─────────────────────────────────────────────────────────────────────────────
export function CentralAdminPage() {
  const [activeTab, setActiveTab] = useState<"analytics" | "users" | "patients" | "doctors" | "hospitals">("analytics");
  const stats = trpc.admin.liveStats.useQuery();
  const utils = trpc.useUtils();

  // Patients state & queries
  const [patientSearch, setPatientSearch] = useState("");
  const patientsQuery = trpc.admin.listPatients.useQuery({ search: patientSearch });
  const [showAddPatient, setShowAddPatient] = useState(false);
  const [editingPatient, setEditingPatient] = useState<any>(null);
  const [viewingPatientAppts, setViewingPatientAppts] = useState<any>(null);
  const patientApptsQuery = trpc.admin.patientAppointments.useQuery(
    { userId: viewingPatientAppts?.id },
    { enabled: !!viewingPatientAppts?.id }
  );

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientCity, setPatientCity] = useState("Bengaluru");
  const [patientAge, setPatientAge] = useState<number | undefined>(undefined);
  const [patientGender, setPatientGender] = useState("Not specified");
  const [patientBloodGroup, setPatientBloodGroup] = useState("");
  const [patientEmergencyContact, setPatientEmergencyContact] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  const createPatientMutation = trpc.admin.createUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listPatients.invalidate();
      await utils.admin.listUsers.invalidate();
      await utils.admin.liveStats.invalidate();
      setShowAddPatient(false);
      setPatientName("");
      setPatientEmail("");
      setPatientPhone("");
      setPatientBloodGroup("");
      setPatientEmergencyContact("");
      setPatientNotes("");
      toast.success("Patient registered successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to register patient"),
  });

  const updatePatientMutation = trpc.admin.updateUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listPatients.invalidate();
      await utils.admin.listUsers.invalidate();
      setEditingPatient(null);
      toast.success("Patient profile updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update patient"),
  });

  const deletePatientMutation = trpc.admin.deleteUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listPatients.invalidate();
      await utils.admin.listUsers.invalidate();
      await utils.admin.liveStats.invalidate();
      toast.success("Patient deleted successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to delete patient"),
  });

  // Users state & queries
  const [userRoleFilter, setUserRoleFilter] = useState<string>("all");
  const [userSearch, setUserSearch] = useState<string>("");
  const usersQuery = trpc.admin.listUsers.useQuery({ role: userRoleFilter, search: userSearch });
  const [showAddUser, setShowAddUser] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userRole, setUserRole] = useState<"user" | "hospital_authority" | "doctor" | "admin">("user");
  const [userCity, setUserCity] = useState("Bengaluru");

  const createUserMutation = trpc.admin.createUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listUsers.invalidate();
      await utils.admin.listPatients.invalidate();
      await utils.admin.liveStats.invalidate();
      setShowAddUser(false);
      setUserName("");
      setUserEmail("");
      setUserPhone("");
      toast.success("User created successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to create user"),
  });

  const updateUserMutation = trpc.admin.updateUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listUsers.invalidate();
      await utils.admin.listPatients.invalidate();
      setEditingUser(null);
      toast.success("User updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update user"),
  });

  const deleteUserMutation = trpc.admin.deleteUser.useMutation({
    onSuccess: async () => {
      await utils.admin.listUsers.invalidate();
      await utils.admin.listPatients.invalidate();
      await utils.admin.liveStats.invalidate();
      toast.success("User deleted successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to delete user"),
  });

  // Doctors state & queries
  const doctorsQuery = trpc.admin.listDoctors.useQuery();
  const [doctorSearch, setDoctorSearch] = useState("");
  const [showAddDoctor, setShowAddDoctor] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<any>(null);
  const [docName, setDocName] = useState("");
  const [docSpecialty, setDocSpecialty] = useState("");
  const [docDepartment, setDocDepartment] = useState("");
  const [docExp, setDocExp] = useState(5);
  const [docFee, setDocFee] = useState(600);
  const [docPhone, setDocPhone] = useState("");
  const [docEmail, setDocEmail] = useState("");

  const createDoctorMutation = trpc.admin.createDoctor.useMutation({
    onSuccess: async () => {
      await utils.admin.listDoctors.invalidate();
      await utils.admin.liveStats.invalidate();
      setShowAddDoctor(false);
      setDocName("");
      setDocSpecialty("");
      setDocDepartment("");
      setDocPhone("");
      setDocEmail("");
      toast.success("Doctor added successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to add doctor"),
  });

  const updateDoctorMutation = trpc.admin.updateDoctor.useMutation({
    onSuccess: async () => {
      await utils.admin.listDoctors.invalidate();
      setEditingDoctor(null);
      toast.success("Doctor updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update doctor"),
  });

  const deleteDoctorMutation = trpc.admin.deleteDoctor.useMutation({
    onSuccess: async () => {
      await utils.admin.listDoctors.invalidate();
      await utils.admin.liveStats.invalidate();
      toast.success("Doctor removed successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to delete doctor"),
  });

  // Hospitals state & queries
  const hospitalsQuery = trpc.admin.listHospitals.useQuery();
  const [hospitalSearch, setHospitalSearch] = useState("");
  const [showAddHospital, setShowAddHospital] = useState(false);
  const [editingHospital, setEditingHospital] = useState<any>(null);
  const [hospName, setHospName] = useState("");
  const [hospType, setHospType] = useState("Super Specialty");
  const [hospAddress, setHospAddress] = useState("");
  const [hospCity, setHospCity] = useState("Bengaluru");
  const [hospBeds, setHospBeds] = useState(100);
  const [hospPhone, setHospPhone] = useState("");

  const createHospitalMutation = trpc.admin.createHospital.useMutation({
    onSuccess: async () => {
      await utils.admin.listHospitals.invalidate();
      await utils.admin.liveStats.invalidate();
      setShowAddHospital(false);
      setHospName("");
      setHospAddress("");
      setHospPhone("");
      toast.success("Hospital added successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to add hospital"),
  });

  const updateHospitalMutation = trpc.admin.updateHospital.useMutation({
    onSuccess: async () => {
      await utils.admin.listHospitals.invalidate();
      setEditingHospital(null);
      toast.success("Hospital updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update hospital"),
  });

  const deleteHospitalMutation = trpc.admin.deleteHospital.useMutation({
    onSuccess: async () => {
      await utils.admin.listHospitals.invalidate();
      await utils.admin.liveStats.invalidate();
      toast.success("Hospital removed successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to delete hospital"),
  });

  const data = stats.data || {
    totalHospitals: 0,
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
    appointmentsChart: [],
    specialtiesChart: [],
    citiesChart: [],
    recentUsers: [],
    recentHospitals: [],
  };

  const filteredDoctors = (doctorsQuery.data || []).filter((d: any) =>
    (d.name || "").toLowerCase().includes(doctorSearch.toLowerCase()) ||
    (d.specialty || "").toLowerCase().includes(doctorSearch.toLowerCase()) ||
    (d.department || "").toLowerCase().includes(doctorSearch.toLowerCase())
  );

  const filteredHospitals = (hospitalsQuery.data || []).filter((h: any) =>
    (h.name || "").toLowerCase().includes(hospitalSearch.toLowerCase()) ||
    (h.city || "").toLowerCase().includes(hospitalSearch.toLowerCase()) ||
    (h.type || "").toLowerCase().includes(hospitalSearch.toLowerCase())
  );

  return (
    <AdminLayout
      role="Central admin"
      title="Platform Governance & Control"
      eyebrow="Central Administration"
      description="Manage all user accounts, hospital directories, and medical specialists across India with full administrative control."
      icon={<ShieldCheck size={20} />}
    >
      {/* Central Admin Navigation Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2 border-b border-[#dfe9e4] pb-4">
        {[
          { id: "analytics", label: "Analytics & Platform Overview", icon: <LayoutDashboard size={15} /> },
          { id: "users", label: "All Users Management", icon: <UsersRound size={15} /> },
          { id: "patients", label: "Patients Directory", icon: <UserRound size={15} /> },
          { id: "doctors", label: "Doctor Directory", icon: <Stethoscope size={15} /> },
          { id: "hospitals", label: "Hospital Directory", icon: <Hospital size={15} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-bold transition-all ${
              activeTab === tab.id
                ? "bg-[#146b5a] text-white shadow-sm"
                : "bg-white text-[#50635e] border border-[#dfe9e4] hover:bg-[#f4faf7]"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 1. ANALYTICS VIEW */}
      {activeTab === "analytics" && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Verified hospitals" value={String(data.totalHospitals)} change="Neon DB" icon={Hospital} />
            <StatCard label="Listed doctors" value={String(data.totalDoctors)} change="Active clinicians" icon={Stethoscope} />
            <StatCard label="Registered accounts" value={String(data.totalUsers)} change="Platform users" icon={UsersRound} />
            <StatCard label="Total appointments" value={String(data.totalAppointments)} change="Verified bookings" icon={CalendarDays} tone="cream" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
              <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8443e]">Booking velocity</div>
                  <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Appointments volume over time</h2>
                </div>
                <span className="rounded-full bg-[#eaf3ed] px-3 py-1 text-xs font-bold text-[#146b5a]">Live DB</span>
              </div>
              <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.appointmentsChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="apptGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#146b5a" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#146b5a" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f1" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: "#78918a" }} />
                    <YAxis tick={{ fontSize: 11, fill: "#78918a" }} allowDecimals={false} />
                    <Tooltip contentStyle={{ backgroundColor: "#17342f", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }} />
                    <Area type="monotone" dataKey="count" stroke="#146b5a" strokeWidth={2.5} fillOpacity={1} fill="url(#apptGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
              <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Clinical capacity</div>
                  <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Doctors by specialty</h2>
                </div>
                <span className="text-xs font-bold text-[#78918a]">Top 5</span>
              </div>
              <div className="mt-6 h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.specialtiesChart} layout="vertical" margin={{ top: 5, right: 20, left: 25, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f1" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 11, fill: "#78918a" }} allowDecimals={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "#50635e" }} width={80} />
                    <Tooltip contentStyle={{ backgroundColor: "#17342f", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }} />
                    <Bar dataKey="value" fill="#b8443e" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[28px] border border-[#dfe9e4] bg-white p-6">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Geographic footprint</div>
                <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Hospital network by city</h2>
              </div>
              <span className="rounded-full bg-[#f4faf7] px-3 py-1 text-xs font-bold text-[#146b5a]">Pan-India</span>
            </div>
            <div className="mt-6 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.citiesChart} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f4f1" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#78918a" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#78918a" }} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#17342f", borderRadius: "12px", border: "none", color: "#fff", fontSize: "12px" }} />
                  <Bar dataKey="value" fill="#146b5a" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* 2. USERS MANAGEMENT TAB */}
      {activeTab === "users" && (
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#edf2ef] pb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">User Governance</div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#17342f]">All Users & Role Accounts</h2>
            </div>
            <button
              onClick={() => setShowAddUser(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={15} /> Create User
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2 w-full max-w-xs">
              <Search size={15} className="text-[#78918a]" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                className="w-full bg-transparent text-xs font-medium outline-none"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {["all", "user", "hospital_authority", "doctor", "admin"].map((r) => (
                <button
                  key={r}
                  onClick={() => setUserRoleFilter(r)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${
                    userRoleFilter === r
                      ? "bg-[#146b5a] text-white"
                      : "bg-[#f4faf7] text-[#50635e] hover:bg-[#eaf3ed]"
                  }`}
                >
                  {r === "all" ? "All Roles" : r.replace("_", " ")}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#edf2ef] text-[#78918a]">
                  <th className="pb-3 font-semibold">User</th>
                  <th className="pb-3 font-semibold">Role</th>
                  <th className="pb-3 font-semibold">Phone</th>
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold">Registered</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2ef]">
                {(usersQuery.data || []).map((u: any) => (
                  <tr key={u.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3">
                      <div className="font-bold text-[#17342f]">{u.name || "Unnamed User"}</div>
                      <div className="text-[11px] text-[#78918a]">{u.email || "No email"}</div>
                    </td>
                    <td className="py-3">
                      <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
                        u.role === "admin"
                          ? "bg-[#fbeeed] text-[#b8443e]"
                          : u.role === "doctor"
                          ? "bg-[#e8f1fb] text-[#2463eb]"
                          : u.role === "hospital_authority"
                          ? "bg-[#fef6e7] text-[#b45309]"
                          : "bg-[#eaf3ed] text-[#146b5a]"
                      }`}>
                        {(u.role || "user").replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#50635e]">{u.phone || "—"}</td>
                    <td className="py-3 text-[11px] text-[#50635e]">{u.city || "—"}</td>
                    <td className="py-3 text-[11px] text-[#78918a]">
                      {new Date(u.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingUser(u)}
                          className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete user "${u.name || u.email}"?`)) {
                              deleteUserMutation.mutate({ id: u.id });
                            }
                          }}
                          className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 2.5 PATIENTS DIRECTORY TAB */}
      {activeTab === "patients" && (
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#edf2ef] pb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Care Navigation & Records</div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#17342f]">Patients Directory</h2>
              <p className="mt-1 text-xs text-[#78918a]">Manage registered patients, demographic info, clinical notes, and appointment records.</p>
            </div>
            <button
              onClick={() => setShowAddPatient(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={15} /> Add Patient
            </button>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2 w-full max-w-sm">
              <Search size={15} className="text-[#78918a]" />
              <input
                type="text"
                placeholder="Search by patient name, phone, email, city, blood group..."
                value={patientSearch}
                onChange={(e) => setPatientSearch(e.target.value)}
                className="w-full bg-transparent text-xs font-medium outline-none"
              />
            </div>
            <span className="rounded-full bg-[#eaf3ed] px-3 py-1 text-xs font-bold text-[#146b5a]">
              {(patientsQuery.data || []).length} registered patients
            </span>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#edf2ef] text-[#78918a]">
                  <th className="pb-3 font-semibold">Patient Name</th>
                  <th className="pb-3 font-semibold">Contact & City</th>
                  <th className="pb-3 font-semibold">Demographics</th>
                  <th className="pb-3 font-semibold">Blood Group</th>
                  <th className="pb-3 font-semibold">Emergency Contact</th>
                  <th className="pb-3 font-semibold">Visits</th>
                  <th className="pb-3 font-semibold">Registered</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2ef]">
                {(patientsQuery.data || []).map((p: any) => (
                  <tr key={p.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3">
                      <div className="font-bold text-[#17342f]">{p.name || "Unnamed Patient"}</div>
                      <div className="text-[11px] text-[#78918a]">{p.email || "No email"}</div>
                    </td>
                    <td className="py-3">
                      <div className="font-mono text-[11px] text-[#17342f]">{p.phone || "—"}</div>
                      <div className="text-[11px] text-[#78918a]">{p.city || "Bengaluru"}</div>
                    </td>
                    <td className="py-3 text-[11px] text-[#50635e]">
                      {p.age ? `${p.age} yrs` : "—"} · {p.gender || "—"}
                    </td>
                    <td className="py-3">
                      {p.bloodGroup ? (
                        <span className="rounded-full bg-[#fdeeed] px-2 py-0.5 text-[10px] font-bold text-[#b8443e]">
                          {p.bloodGroup}
                        </span>
                      ) : (
                        <span className="text-[#9aa9a4]">—</span>
                      )}
                    </td>
                    <td className="py-3 font-mono text-[11px] text-[#50635e]">
                      {p.emergencyContact || "—"}
                    </td>
                    <td className="py-3">
                      <button
                        onClick={() => setViewingPatientAppts(p)}
                        className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf3ed] px-2.5 py-1 text-[11px] font-bold text-[#146b5a] hover:bg-[#d5e9db]"
                      >
                        <CalendarDays size={12} />
                        {p.appointmentCount || 0} visits
                      </button>
                    </td>
                    <td className="py-3 text-[11px] text-[#78918a]">
                      {new Date(p.createdAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setViewingPatientAppts(p)}
                          className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                          title="View Appointments"
                        >
                          <CalendarDays size={14} />
                        </button>
                        <button
                          onClick={() => setEditingPatient({ ...p })}
                          className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                          title="Edit Patient"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete patient "${p.name || p.email}"?`)) {
                              deletePatientMutation.mutate({ id: p.id });
                            }
                          }}
                          className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                          title="Delete Patient"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(patientsQuery.data || []).length === 0 && (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#78918a]">
                      No patients found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 3. DOCTORS DIRECTORY TAB */}
      {activeTab === "doctors" && (
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#edf2ef] pb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Doctor Directory</div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#17342f]">All Medical Clinicians</h2>
            </div>
            <button
              onClick={() => setShowAddDoctor(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={15} /> Add Doctor
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2 w-full max-w-sm">
            <Search size={15} className="text-[#78918a]" />
            <input
              type="text"
              placeholder="Search doctors by name, specialty, department..."
              value={doctorSearch}
              onChange={(e) => setDoctorSearch(e.target.value)}
              className="w-full bg-transparent text-xs font-medium outline-none"
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#edf2ef] text-[#78918a]">
                  <th className="pb-3 font-semibold">Doctor</th>
                  <th className="pb-3 font-semibold">Specialty & Department</th>
                  <th className="pb-3 font-semibold">Experience</th>
                  <th className="pb-3 font-semibold">Fee</th>
                  <th className="pb-3 font-semibold">Rating</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2ef]">
                {filteredDoctors.map((doc: any) => (
                  <tr key={doc.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3 font-bold text-[#17342f]">{doc.name}</td>
                    <td className="py-3">
                      <div className="font-semibold text-[#17342f]">{doc.specialty}</div>
                      <div className="text-[11px] text-[#78918a]">{doc.department}</div>
                    </td>
                    <td className="py-3 text-[11px] text-[#50635e]">{doc.experienceYears} yrs</td>
                    <td className="py-3 font-bold text-[#146b5a]">₹{doc.fee}</td>
                    <td className="py-3 text-[11px] text-[#b45309] font-bold">★ {doc.rating}</td>
                    <td className="py-3 font-mono text-[11px] text-[#78918a]">{doc.phone || doc.email || "—"}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingDoctor(doc)}
                          className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                          title="Edit Doctor"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${doc.name}"?`)) {
                              deleteDoctorMutation.mutate({ id: doc.id });
                            }
                          }}
                          className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                          title="Delete Doctor"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* 4. HOSPITALS DIRECTORY TAB */}
      {activeTab === "hospitals" && (
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-[#edf2ef] pb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Hospital Directory</div>
              <h2 className="mt-1 font-display text-2xl font-semibold text-[#17342f]">Partner Care Facilities</h2>
            </div>
            <button
              onClick={() => setShowAddHospital(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-4 py-2.5 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={15} /> Add Hospital
            </button>
          </div>

          <div className="mt-5 flex items-center gap-2 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2 w-full max-w-sm">
            <Search size={15} className="text-[#78918a]" />
            <input
              type="text"
              placeholder="Search hospitals by name, city, type..."
              value={hospitalSearch}
              onChange={(e) => setHospitalSearch(e.target.value)}
              className="w-full bg-transparent text-xs font-medium outline-none"
            />
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#edf2ef] text-[#78918a]">
                  <th className="pb-3 font-semibold">Hospital Name</th>
                  <th className="pb-3 font-semibold">Type & City</th>
                  <th className="pb-3 font-semibold">Address</th>
                  <th className="pb-3 font-semibold">Beds</th>
                  <th className="pb-3 font-semibold">Rating</th>
                  <th className="pb-3 font-semibold">Contact</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#edf2ef]">
                {filteredHospitals.map((hosp: any) => (
                  <tr key={hosp.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3 font-bold text-[#17342f]">{hosp.name}</td>
                    <td className="py-3">
                      <div className="font-semibold text-[#17342f]">{hosp.type}</div>
                      <div className="text-[11px] text-[#78918a]">{hosp.city}</div>
                    </td>
                    <td className="py-3 text-[11px] text-[#50635e] max-w-[200px] truncate">{hosp.address}</td>
                    <td className="py-3 font-bold text-[#146b5a]">{hosp.bedCapacity} beds</td>
                    <td className="py-3 text-[11px] text-[#b45309] font-bold">★ {hosp.rating}</td>
                    <td className="py-3 font-mono text-[11px] text-[#78918a]">{hosp.phone || "—"}</td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-2">
                        <button
                          onClick={() => setEditingHospital(hosp)}
                          className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                          title="Edit Hospital"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${hosp.name}"?`)) {
                              deleteHospitalMutation.mutate({ id: hosp.id });
                            }
                          }}
                          className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                          title="Delete Hospital"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* MODAL: ADD USER */}
      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Create New User</h3>
              <button onClick={() => setShowAddUser(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              createUserMutation.mutate({ name: userName, email: userEmail, phone: userPhone, role: userRole, city: userCity });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Full Name</label>
                <input required value={userName} onChange={(e) => setUserName(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Email Address</label>
                <input required type="email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Phone Number</label>
                <input required value={userPhone} onChange={(e) => setUserPhone(e.target.value)} placeholder="+91..." className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Assigned Role</label>
                <select value={userRole} onChange={(e) => setUserRole(e.target.value as any)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none">
                  <option value="user">Patient (User)</option>
                  <option value="doctor">Doctor</option>
                  <option value="hospital_authority">Hospital Authority</option>
                  <option value="admin">Central Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">City</label>
                <input value={userCity} onChange={(e) => setUserCity(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddUser(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createUserMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{createUserMutation.isPending ? "Saving..." : "Create User"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT USER */}
      {editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Edit User Details</h3>
              <button onClick={() => setEditingUser(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateUserMutation.mutate({
                id: editingUser.id,
                name: editingUser.name,
                email: editingUser.email,
                phone: editingUser.phone,
                role: editingUser.role,
                city: editingUser.city,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Full Name</label>
                <input required value={editingUser.name || ""} onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Email Address</label>
                <input required type="email" value={editingUser.email || ""} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Phone Number</label>
                <input value={editingUser.phone || ""} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Role</label>
                <select value={editingUser.role} onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none">
                  <option value="user">Patient (User)</option>
                  <option value="doctor">Doctor</option>
                  <option value="hospital_authority">Hospital Authority</option>
                  <option value="admin">Central Admin</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">City</label>
                <input value={editingUser.city || ""} onChange={(e) => setEditingUser({ ...editingUser, city: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingUser(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updateUserMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{updateUserMutation.isPending ? "Updating..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD DOCTOR */}
      {showAddDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Add New Doctor</h3>
              <button onClick={() => setShowAddDoctor(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              createDoctorMutation.mutate({
                name: docName,
                specialty: docSpecialty,
                department: docDepartment,
                experienceYears: Number(docExp),
                fee: Number(docFee),
                phone: docPhone,
                email: docEmail,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Doctor Name</label>
                <input required value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="e.g. Dr. Ramesh Gupta" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Specialty</label>
                  <input required value={docSpecialty} onChange={(e) => setDocSpecialty(e.target.value)} placeholder="e.g. Cardiology" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Department</label>
                  <input required value={docDepartment} onChange={(e) => setDocDepartment(e.target.value)} placeholder="e.g. Cardiac Sciences" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Experience (Yrs)</label>
                  <input required type="number" min={0} value={docExp} onChange={(e) => setDocExp(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Consultation Fee (₹)</label>
                  <input required type="number" min={0} value={docFee} onChange={(e) => setDocFee(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Phone</label>
                <input value={docPhone} onChange={(e) => setDocPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Email</label>
                <input type="email" value={docEmail} onChange={(e) => setDocEmail(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddDoctor(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createDoctorMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{createDoctorMutation.isPending ? "Adding..." : "Add Doctor"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DOCTOR */}
      {editingDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Edit Doctor</h3>
              <button onClick={() => setEditingDoctor(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateDoctorMutation.mutate({
                id: editingDoctor.id,
                name: editingDoctor.name,
                specialty: editingDoctor.specialty,
                department: editingDoctor.department,
                experienceYears: Number(editingDoctor.experienceYears),
                fee: Number(editingDoctor.fee),
                phone: editingDoctor.phone,
                email: editingDoctor.email,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Doctor Name</label>
                <input required value={editingDoctor.name || ""} onChange={(e) => setEditingDoctor({ ...editingDoctor, name: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Specialty</label>
                  <input required value={editingDoctor.specialty || ""} onChange={(e) => setEditingDoctor({ ...editingDoctor, specialty: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Department</label>
                  <input required value={editingDoctor.department || ""} onChange={(e) => setEditingDoctor({ ...editingDoctor, department: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Experience (Yrs)</label>
                  <input type="number" min={0} value={editingDoctor.experienceYears || 0} onChange={(e) => setEditingDoctor({ ...editingDoctor, experienceYears: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Fee (₹)</label>
                  <input type="number" min={0} value={editingDoctor.fee || 0} onChange={(e) => setEditingDoctor({ ...editingDoctor, fee: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingDoctor(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updateDoctorMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{updateDoctorMutation.isPending ? "Updating..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD HOSPITAL */}
      {showAddHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Add New Hospital</h3>
              <button onClick={() => setShowAddHospital(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              createHospitalMutation.mutate({
                name: hospName,
                type: hospType,
                address: hospAddress,
                city: hospCity,
                bedCapacity: Number(hospBeds),
                phone: hospPhone,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Hospital Name</label>
                <input required value={hospName} onChange={(e) => setHospName(e.target.value)} placeholder="e.g. Apollo Grace Hospital" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Type</label>
                  <input required value={hospType} onChange={(e) => setHospType(e.target.value)} placeholder="e.g. Super Specialty" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">City</label>
                  <input required value={hospCity} onChange={(e) => setHospCity(e.target.value)} placeholder="e.g. Bengaluru" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Address</label>
                <input required value={hospAddress} onChange={(e) => setHospAddress(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Bed Capacity</label>
                  <input required type="number" min={1} value={hospBeds} onChange={(e) => setHospBeds(Number(e.target.value))} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Contact Phone</label>
                  <input value={hospPhone} onChange={(e) => setHospPhone(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddHospital(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createHospitalMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{createHospitalMutation.isPending ? "Adding..." : "Add Hospital"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT HOSPITAL */}
      {editingHospital && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Edit Hospital</h3>
              <button onClick={() => setEditingHospital(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateHospitalMutation.mutate({
                id: editingHospital.id,
                name: editingHospital.name,
                type: editingHospital.type,
                address: editingHospital.address,
                city: editingHospital.city,
                bedCapacity: Number(editingHospital.bedCapacity),
                phone: editingHospital.phone,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Hospital Name</label>
                <input required value={editingHospital.name || ""} onChange={(e) => setEditingHospital({ ...editingHospital, name: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Type</label>
                  <input required value={editingHospital.type || ""} onChange={(e) => setEditingHospital({ ...editingHospital, type: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">City</label>
                  <input required value={editingHospital.city || ""} onChange={(e) => setEditingHospital({ ...editingHospital, city: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Address</label>
                <input required value={editingHospital.address || ""} onChange={(e) => setEditingHospital({ ...editingHospital, address: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Bed Capacity</label>
                  <input type="number" min={1} value={editingHospital.bedCapacity || 0} onChange={(e) => setEditingHospital({ ...editingHospital, bedCapacity: Number(e.target.value) })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Phone</label>
                  <input value={editingHospital.phone || ""} onChange={(e) => setEditingHospital({ ...editingHospital, phone: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingHospital(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updateHospitalMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{updateHospitalMutation.isPending ? "Updating..." : "Save Changes"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* MODAL: VIEW PATIENT APPOINTMENTS */}
      {viewingPatientAppts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-2xl rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Medical History & Booking Records</div>
                <h3 className="font-display text-lg font-semibold text-[#17342f]">{viewingPatientAppts.name || "Patient"}’s Appointments</h3>
                <div className="mt-0.5 text-xs text-[#78918a]">{viewingPatientAppts.phone || "No phone"} · {viewingPatientAppts.city || "Bengaluru"}</div>
              </div>
              <button onClick={() => setViewingPatientAppts(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <div className="mt-4 max-h-[60vh] overflow-y-auto">
              {patientApptsQuery.isLoading ? (
                <div className="py-8 text-center text-xs text-[#78918a]">Loading appointment records...</div>
              ) : (patientApptsQuery.data || []).length === 0 ? (
                <div className="py-8 text-center text-xs text-[#78918a]">No booked appointments found for this patient yet.</div>
              ) : (
                <div className="grid gap-3">
                  {(patientApptsQuery.data || []).map((appt: any) => (
                    <div key={appt.id} className="rounded-2xl border border-[#dfe9e4] bg-[#fbfaf6] p-4 text-xs">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-mono text-[10px] font-bold text-[#9aa9a4]">{appt.bookingId}</div>
                          <div className="mt-1 font-bold text-[#17342f]">{appt.doctorName || "Doctor"} <span className="font-normal text-[#78918a]">({appt.doctorSpecialty || "General"})</span></div>
                          <div className="mt-0.5 text-[#50635e]">{appt.hospitalName || "Partner Hospital"}</div>
                        </div>
                        <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${
                          appt.status === "Confirmed" ? "bg-[#eaf3ed] text-[#146b5a]" : "bg-[#fef6e7] text-[#b45309]"
                        }`}>
                          {appt.status}
                        </span>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[#edf2ef] pt-2.5 text-[11px] text-[#78918a]">
                        <span className="flex items-center gap-1 font-medium"><Calendar size={13} /> {new Date(appt.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                        <span className="flex items-center gap-1"><Clock3 size={13} /> Reason: <strong className="text-[#17342f]">{appt.reason || "General checkup"}</strong></span>
                        <span className="flex items-center gap-1"><Bell size={13} /> Reminder: {appt.reminderPreference ? "Opted In" : "Off"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-5 flex justify-end border-t border-[#edf2ef] pt-3">
              <button onClick={() => setViewingPatientAppts(null)} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD PATIENT */}
      {showAddPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Register New Patient</h3>
              <button onClick={() => setShowAddPatient(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              createPatientMutation.mutate({
                name: patientName,
                email: patientEmail,
                phone: patientPhone,
                role: "user",
                city: patientCity,
                age: patientAge ? Number(patientAge) : undefined,
                gender: patientGender,
                bloodGroup: patientBloodGroup || undefined,
                emergencyContact: patientEmergencyContact || undefined,
                medicalNotes: patientNotes || undefined,
              });
            }} className="mt-4 grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Full Name</label>
                <input required value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="e.g. Rahul Sharma" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Email Address</label>
                  <input required type="email" value={patientEmail} onChange={(e) => setPatientEmail(e.target.value)} placeholder="name@email.com" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Phone Number</label>
                  <input required value={patientPhone} onChange={(e) => setPatientPhone(e.target.value)} placeholder="+91..." className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">City</label>
                  <input value={patientCity} onChange={(e) => setPatientCity(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Age</label>
                  <input type="number" min={1} max={120} value={patientAge ?? ""} onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : undefined)} placeholder="e.g. 32" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Gender</label>
                  <select value={patientGender} onChange={(e) => setPatientGender(e.target.value)} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none">
                    <option value="Not specified">Not specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Blood Group</label>
                  <input value={patientBloodGroup} onChange={(e) => setPatientBloodGroup(e.target.value)} placeholder="e.g. O+, B+, A-" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Emergency Contact</label>
                  <input value={patientEmergencyContact} onChange={(e) => setPatientEmergencyContact(e.target.value)} placeholder="+91..." className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Medical Notes / Pre-existing Conditions</label>
                <textarea rows={2} value={patientNotes} onChange={(e) => setPatientNotes(e.target.value)} placeholder="Allergies, hypertension, history..." className="mt-1 w-full rounded-xl border border-[#dfe9e4] p-3 text-xs font-semibold outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddPatient(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createPatientMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{createPatientMutation.isPending ? "Registering..." : "Register Patient"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PATIENT */}
      {editingPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Edit Patient Profile</h3>
              <button onClick={() => setEditingPatient(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updatePatientMutation.mutate({
                id: editingPatient.id,
                name: editingPatient.name,
                email: editingPatient.email,
                phone: editingPatient.phone,
                city: editingPatient.city,
                age: editingPatient.age ? Number(editingPatient.age) : undefined,
                gender: editingPatient.gender,
                bloodGroup: editingPatient.bloodGroup,
                emergencyContact: editingPatient.emergencyContact,
                medicalNotes: editingPatient.medicalNotes,
              });
            }} className="mt-4 grid gap-3 max-h-[70vh] overflow-y-auto pr-1">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Full Name</label>
                <input required value={editingPatient.name || ""} onChange={(e) => setEditingPatient({ ...editingPatient, name: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Email Address</label>
                  <input required type="email" value={editingPatient.email || ""} onChange={(e) => setEditingPatient({ ...editingPatient, email: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Phone Number</label>
                  <input value={editingPatient.phone || ""} onChange={(e) => setEditingPatient({ ...editingPatient, phone: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">City</label>
                  <input value={editingPatient.city || ""} onChange={(e) => setEditingPatient({ ...editingPatient, city: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Age</label>
                  <input type="number" min={1} max={120} value={editingPatient.age || ""} onChange={(e) => setEditingPatient({ ...editingPatient, age: e.target.value ? Number(e.target.value) : undefined })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Gender</label>
                  <select value={editingPatient.gender || "Not specified"} onChange={(e) => setEditingPatient({ ...editingPatient, gender: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none">
                    <option value="Not specified">Not specified</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Blood Group</label>
                  <input value={editingPatient.bloodGroup || ""} onChange={(e) => setEditingPatient({ ...editingPatient, bloodGroup: e.target.value })} placeholder="e.g. B+" className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Emergency Contact</label>
                  <input value={editingPatient.emergencyContact || ""} onChange={(e) => setEditingPatient({ ...editingPatient, emergencyContact: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Medical Notes / Pre-existing Conditions</label>
                <textarea rows={2} value={editingPatient.medicalNotes || ""} onChange={(e) => setEditingPatient({ ...editingPatient, medicalNotes: e.target.value })} className="mt-1 w-full rounded-xl border border-[#dfe9e4] p-3 text-xs font-semibold outline-none" />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingPatient(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updatePatientMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">{updatePatientMutation.isPending ? "Updating..." : "Save Profile"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOSPITAL AUTHORITY WORKSPACE (LIVE DATA + VISITS CRUD + BOOKED PATIENTS)
// ─────────────────────────────────────────────────────────────────────────────
export function HospitalAdminPage() {
  const liveQuery = trpc.hospitalAdmin.liveData.useQuery();
  const utils = trpc.useUtils();
  const hospital = liveQuery.data?.hospital;
  const doctorsList = liveQuery.data?.doctors || [];
  const allDoctors = liveQuery.data?.allDoctors || [];
  const visitsList = liveQuery.data?.visits || [];
  const appointmentsList = liveQuery.data?.appointments || [];
  const apptCount = liveQuery.data?.totalAppointments || 0;

  // Visit CRUD state
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState("");
  const [visitDateTime, setVisitDateTime] = useState("");
  const [visitCapacity, setVisitCapacity] = useState(20);

  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [editDateTime, setEditDateTime] = useState("");
  const [editCapacity, setEditCapacity] = useState(20);
  const [editStatus, setEditStatus] = useState("Approved");

  const createVisitMutation = trpc.visits.create.useMutation({
    onSuccess: async () => {
      await utils.hospitalAdmin.liveData.invalidate();
      setShowAddVisit(false);
      setSelectedDoctorId("");
      setVisitDateTime("");
      toast.success("Doctor visit scheduled successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to schedule visit"),
  });

  const updateVisitMutation = trpc.visits.update.useMutation({
    onSuccess: async () => {
      await utils.hospitalAdmin.liveData.invalidate();
      setEditingVisit(null);
      toast.success("Visit slot updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update visit"),
  });

  // Requirement 6: Hospital authority admin could delete any doctor visit
  const deleteVisitMutation = trpc.visits.delete.useMutation({
    onSuccess: async () => {
      await utils.hospitalAdmin.liveData.invalidate();
      toast.success("Doctor visit deleted successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to delete visit"),
  });

  return (
    <AdminLayout
      role="Hospital authority"
      title={hospital?.name || "Partner Hospital"}
      eyebrow="Hospital Authority Workspace"
      description={`Location: ${hospital?.city || "Bengaluru"} · Active Capacity: ${hospital?.bedCapacity || 150} Verified Beds`}
      icon={<Hospital size={20} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Booked consultations" value={String(apptCount)} change="Live count" icon={CalendarDays} />
        <StatCard label="Active clinicians" value={String(doctorsList.length)} change="Onboarded" icon={Stethoscope} />
        <StatCard label="Scheduled OPD sessions" value={String(visitsList.length)} change="Active visits" icon={Activity} tone="cream" />
        <StatCard label="Hospital rating" value={hospital?.rating ? `★ ${hospital.rating}` : "★ 4.8"} change="Patient reviews" icon={ClipboardList} tone="green" />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* SECTION 1: DOCTOR VISITS SCHEDULES (CRUD) */}
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">OPD Scheduling</div>
              <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Doctor Visits & Time Slots</h2>
            </div>
            <button
              onClick={() => {
                if (allDoctors.length > 0 && !selectedDoctorId) {
                  setSelectedDoctorId(allDoctors[0].id);
                }
                setShowAddVisit(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#146b5a] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={14} /> Schedule Doctor Visit
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {visitsList.length > 0 ? (
              visitsList.map((v: any) => (
                <div key={v.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#edf2ef] p-4 hover:border-[#b8dfca] transition">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-[#eaf3ed] text-xs font-bold text-[#146b5a]">
                      {new Date(v.startsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#17342f]">{v.doctorName || "Specialist"}</div>
                      <div className="text-xs text-[#78918a]">
                        {v.doctorSpecialty} · {new Date(v.startsAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" })}
                      </div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#146b5a]">
                        {v.bookedCount || 0} booked / {v.capacity} slots capacity
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <TrustPill tone="green">{v.status || "Approved"}</TrustPill>
                    <button
                      onClick={() => {
                        setEditingVisit(v);
                        setEditDateTime(new Date(v.startsAt).toISOString().slice(0, 16));
                        setEditCapacity(v.capacity);
                        setEditStatus(v.status || "Approved");
                      }}
                      className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                      title="Edit Visit Slot"
                    >
                      <Edit2 size={14} />
                    </button>
                    {/* Requirement 6: Hospital authority admin could delete any doctor visit */}
                    <button
                      onClick={() => {
                        if (window.confirm(`Are you sure you want to delete this doctor visit on ${new Date(v.startsAt).toLocaleDateString("en-IN")}?`)) {
                          deleteVisitMutation.mutate({ id: v.id });
                        }
                      }}
                      className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                      title="Delete Doctor Visit"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#78918a]">
                No doctor visits currently scheduled for this facility. Click "Schedule Doctor Visit" above to add an OPD slot.
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: HOSPITAL CAPACITY & FACILITY OVERVIEW */}
        <section className="rounded-[28px] border border-[#dfe9e4] bg-[#f1f7f1] p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9aa9a4]">Facility capacity</div>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">Operational overview</h2>
            </div>
            <span className="grid size-10 place-items-center rounded-xl bg-white text-[#146b5a]">
              <Activity size={18} />
            </span>
          </div>
          <div className="mt-6">
            <div className="flex items-end justify-between">
              <span className="font-display text-5xl font-semibold tracking-[-0.08em] text-[#17342f]">
                {hospital?.bedCapacity || 150}
              </span>
              <span className="text-xs font-bold text-[#3b9a6d]">Verified Beds</span>
            </div>
            <p className="mt-3 text-xs leading-5 text-[#78918a]">
              Address: {hospital?.address || "Registered medical centre"}
            </p>
            <div className="mt-5 rounded-2xl bg-white p-3.5 border border-[#dcefe5]">
              <div className="text-xs font-bold text-[#17342f]">Emergency Protocol</div>
              <div className="mt-1 text-[11px] text-[#50635e]">
                {hospital?.ambulanceAvailable ? "✓ Dedicated ambulance dispatch on standby" : "Contact desk on incoming emergency"}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 3: BOOKED PATIENT CONSULTATIONS AT THIS HOSPITAL */}
      <section className="mt-8 rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
        <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8443e]">Consultations Roster</div>
            <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Booked Patient Consultations at {hospital?.name || "Facility"}</h2>
          </div>
          <span className="rounded-full bg-[#eaf3ed] px-3 py-1 text-xs font-bold text-[#146b5a]">{appointmentsList.length} Bookings</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#edf2ef] text-[#78918a]">
                <th className="pb-3 font-semibold">Patient Name</th>
                <th className="pb-3 font-semibold">Contact Phone</th>
                <th className="pb-3 font-semibold">Doctor Assigned</th>
                <th className="pb-3 font-semibold">Slot Date & Time</th>
                <th className="pb-3 font-semibold">Reason</th>
                <th className="pb-3 font-semibold">Ref ID</th>
                <th className="pb-3 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2ef]">
              {appointmentsList.length > 0 ? (
                appointmentsList.map((a: any) => (
                  <tr key={a.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3 font-bold text-[#17342f]">{a.patientName}</td>
                    <td className="py-3 font-mono text-[11px] text-[#50635e]">{a.patientPhone}</td>
                    <td className="py-3">
                      <div className="font-bold text-[#17342f]">{a.doctorName}</div>
                      <div className="text-[10px] text-[#78918a]">{a.doctorSpecialty}</div>
                    </td>
                    <td className="py-3 text-[11px] text-[#50635e]">
                      {new Date(a.startsAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} at {new Date(a.startsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                    </td>
                    <td className="py-3 text-[11px] text-[#78918a] max-w-[200px] truncate">{a.reason}</td>
                    <td className="py-3 font-mono text-[10px] text-[#9aa9a4]">{a.bookingId}</td>
                    <td className="py-3 text-right">
                      <TrustPill tone="green">{a.status}</TrustPill>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#78918a]">
                    No patient consultations booked for this facility yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL: SCHEDULE DOCTOR VISIT */}
      {showAddVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Schedule Doctor Visit at Hospital</h3>
              <button onClick={() => setShowAddVisit(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!selectedDoctorId || !visitDateTime) {
                toast.error("Please select a doctor and date/time");
                return;
              }
              createVisitMutation.mutate({
                doctorId: selectedDoctorId,
                hospitalId: hospital?.id || "apollo-green",
                startsAt: new Date(visitDateTime).toISOString(),
                capacity: Number(visitCapacity),
                status: "Approved",
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Select Doctor</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                >
                  <option value="">Choose a doctor...</option>
                  {allDoctors.map((doc: any) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.specialty})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={visitDateTime}
                  onChange={(e) => setVisitDateTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Patient Slots Capacity</label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  required
                  value={visitCapacity}
                  onChange={(e) => setVisitCapacity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddVisit(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createVisitMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">
                  {createVisitMutation.isPending ? "Scheduling..." : "Schedule Visit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT DOCTOR VISIT */}
      {editingVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Update Visit Slot</h3>
              <button onClick={() => setEditingVisit(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateVisitMutation.mutate({
                id: editingVisit.id,
                startsAt: editDateTime ? new Date(editDateTime).toISOString() : undefined,
                capacity: Number(editCapacity),
                status: editStatus,
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Doctor</label>
                <div className="mt-1 text-xs font-bold text-[#17342f]">{editingVisit.doctorName}</div>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Date & Time</label>
                <input
                  type="datetime-local"
                  value={editDateTime}
                  onChange={(e) => setEditDateTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Capacity</label>
                <input
                  type="number"
                  min={1}
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                >
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingVisit(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updateVisitMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">
                  {updateVisitMutation.isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DOCTOR ADMIN WORKSPACE (LIVE DATA + VISITS CRUD + BOOKED PATIENTS)
// ─────────────────────────────────────────────────────────────────────────────
export function DoctorAdminPage() {
  const liveQuery = trpc.doctorAdmin.liveData.useQuery();
  const utils = trpc.useUtils();
  const { openChat, hasUnread } = useChat();
  const doctor = liveQuery.data?.doctor;
  const allHospitals = liveQuery.data?.allHospitals || [];
  const visits = liveQuery.data?.visits || [];
  const appointments = liveQuery.data?.appointments || [];

  // Visit CRUD states
  const [showAddVisit, setShowAddVisit] = useState(false);
  const [selectedHospitalId, setSelectedHospitalId] = useState("");
  const [visitDateTime, setVisitDateTime] = useState("");
  const [visitCapacity, setVisitCapacity] = useState(20);

  const [editingVisit, setEditingVisit] = useState<any>(null);
  const [editHospitalId, setEditHospitalId] = useState("");
  const [editDateTime, setEditDateTime] = useState("");
  const [editCapacity, setEditCapacity] = useState(20);

  const createVisitMutation = trpc.visits.create.useMutation({
    onSuccess: async () => {
      await utils.doctorAdmin.liveData.invalidate();
      setShowAddVisit(false);
      setSelectedHospitalId("");
      setVisitDateTime("");
      toast.success("Visit scheduled successfully at hospital");
    },
    onError: (err) => toast.error(err.message || "Failed to schedule visit"),
  });

  const updateVisitMutation = trpc.visits.update.useMutation({
    onSuccess: async () => {
      await utils.doctorAdmin.liveData.invalidate();
      setEditingVisit(null);
      toast.success("Visit updated successfully");
    },
    onError: (err) => toast.error(err.message || "Failed to update visit"),
  });

  const deleteVisitMutation = trpc.visits.delete.useMutation({
    onSuccess: async () => {
      await utils.doctorAdmin.liveData.invalidate();
      toast.success("Visit slot cancelled and removed");
    },
    onError: (err) => toast.error(err.message || "Failed to delete visit"),
  });

  return (
    <AdminLayout
      role="Doctor workspace"
      title={`Welcome, ${doctor?.name || "Doctor"}`}
      eyebrow="Clinical Practice Workspace"
      description={`Specialty: ${doctor?.specialty || "General Medicine"} · Department: ${doctor?.department || "Consultation"}`}
      icon={<Stethoscope size={20} />}
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Booked patients" value={String(appointments.length)} change="Scheduled consultations" icon={CalendarDays} />
        <StatCard label="Scheduled visits" value={String(visits.length)} change="Active hospital OPDs" icon={Clock3} tone="cream" />
        <StatCard label="Consultation fee" value={`₹${doctor?.fee || 600}`} change="Per visit" icon={UsersRound} />
        <StatCard label="Doctor rating" value={doctor?.rating ? `★ ${doctor.rating}` : "★ 4.9"} change="Verified care" icon={HeartPulse} />
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr]">
        {/* SECTION 1: DOCTOR VISITS CRUD */}
        <section className="rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
          <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#146b5a]">Hospital Visits Management</div>
              <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">My Hospital Visits & OPD Slots</h2>
            </div>
            <button
              onClick={() => {
                if (allHospitals.length > 0 && !selectedHospitalId) {
                  setSelectedHospitalId(allHospitals[0].id);
                }
                setShowAddVisit(true);
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#146b5a] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#0e4c42]"
            >
              <Plus size={14} /> Schedule New Visit
            </button>
          </div>

          <div className="mt-5 grid gap-3">
            {visits.length > 0 ? (
              visits.map((v: any) => (
                <div key={v.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#edf2ef] p-4 hover:border-[#b8dfca] transition">
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl bg-[#eaf3ed] text-xs font-bold text-[#146b5a]">
                      {new Date(v.startsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#17342f]">{v.hospitalName || "Partner Hospital"}</div>
                      <div className="text-xs text-[#78918a]">
                        {v.hospitalCity} · {new Date(v.startsAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", weekday: "short" })}
                      </div>
                      <div className="mt-0.5 text-[11px] font-semibold text-[#146b5a]">
                        {v.bookedCount || 0} booked / {v.capacity} slots capacity
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:ml-auto">
                    <TrustPill tone="green">{v.status || "Approved"}</TrustPill>
                    <button
                      onClick={() => {
                        setEditingVisit(v);
                        setEditHospitalId(v.hospitalId);
                        setEditDateTime(new Date(v.startsAt).toISOString().slice(0, 16));
                        setEditCapacity(v.capacity);
                      }}
                      className="rounded-lg p-1.5 text-[#50635e] hover:bg-[#eaf3ed] hover:text-[#146b5a]"
                      title="Edit Visit Slot"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm("Are you sure you want to cancel and delete this scheduled hospital visit?")) {
                          deleteVisitMutation.mutate({ id: v.id });
                        }
                      }}
                      className="rounded-lg p-1.5 text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e]"
                      title="Delete Visit Slot"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-xs text-[#78918a]">
                You haven't scheduled any hospital visits yet. Click "Schedule New Visit" above to add your OPD availability.
              </div>
            )}
          </div>
        </section>

        {/* SECTION 2: CLINICAL PROFILE OVERVIEW */}
        <section className="rounded-[28px] border border-[#dfe9e4] bg-[#103e38] p-6 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#a9d9bd]">Clinical Profile</div>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em]">{doctor?.name || "Consultant"}</h2>
              <p className="mt-2 text-sm text-white/70">{doctor?.specialty} · {doctor?.department}</p>
              <p className="mt-1 text-xs text-white/50">{doctor?.experienceYears || 5} years medical experience</p>
            </div>
            <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-[#b8efd0]">
              <Stethoscope size={20} />
            </span>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 flex flex-wrap items-center gap-4 text-xs">
            <div><span className="text-white/50">Consultation Fee:</span> <strong className="text-[#b8efd0]">₹{doctor?.fee || 600}</strong></div>
            <div><span className="text-white/50">Contact:</span> <strong>{doctor?.phone || "On record"}</strong></div>
          </div>
        </section>
      </div>

      {/* SECTION 3: BOOKED PATIENT CONSULTATIONS FOR THIS DOCTOR */}
      <section className="mt-8 rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.04)]">
        <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8443e]">My Consultations</div>
            <h2 className="mt-1 font-display text-xl font-semibold text-[#17342f]">Booked Patients & Consultations</h2>
          </div>
          <span className="rounded-full bg-[#eaf3ed] px-3 py-1 text-xs font-bold text-[#146b5a]">{appointments.length} Consultations</span>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#edf2ef] text-[#78918a]">
                <th className="pb-3 font-semibold">Patient Name</th>
                <th className="pb-3 font-semibold">Patient Phone</th>
                <th className="pb-3 font-semibold">Hospital Location</th>
                <th className="pb-3 font-semibold">Slot Date & Time</th>
                <th className="pb-3 font-semibold">Reason for Visit</th>
                <th className="pb-3 font-semibold">Ref ID</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#edf2ef]">
              {appointments.length > 0 ? (
                appointments.map((a: any) => (
                  <tr key={a.id} className="hover:bg-[#fbfaf6]">
                    <td className="py-3 font-bold text-[#17342f]">{a.patientName}</td>
                    <td className="py-3 font-mono text-[11px] text-[#50635e]">{a.patientPhone}</td>
                    <td className="py-3 font-semibold text-[#17342f]">{a.hospitalName || "Partner Centre"}</td>
                    <td className="py-3 text-[11px] text-[#50635e]">
                      {new Date(a.startsAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })} at {new Date(a.startsAt).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" })}
                    </td>
                    <td className="py-3 text-[11px] text-[#78918a] max-w-[200px] truncate">{a.reason}</td>
                    <td className="py-3 font-mono text-[10px] text-[#9aa9a4]">{a.bookingId}</td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <TrustPill tone="green">{a.status}</TrustPill>
                        <button
                          type="button"
                          onClick={() =>
                            openChat({
                              appointmentId: a.bookingId || String(a.id),
                              bookingId: a.bookingId,
                              doctorName: doctor?.name || "Doctor",
                              patientName: a.patientName || "Patient",
                              hospitalName: a.hospitalName,
                              appointmentTime: new Date(a.startsAt).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                              }),
                            })
                          }
                          className="relative inline-flex items-center gap-1.5 rounded-lg border border-[#cde4d9] bg-[#f2f8f5] px-2.5 py-1 text-xs font-bold text-[#146b5a] hover:bg-[#146b5a] hover:text-white transition cursor-pointer"
                          title="Chat with Patient"
                        >
                          <MessageSquare size={13} />
                          <span>Chat</span>
                          {hasUnread(a.bookingId || String(a.id)) && (
                            <span className="relative flex size-2">
                              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                              <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                            </span>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-[#78918a]">
                    No patients have reserved a consultation with you yet. Newly booked consultations will appear here in real time.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* MODAL: SCHEDULE NEW VISIT FOR DOCTOR */}
      {showAddVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Schedule Hospital Visit</h3>
              <button onClick={() => setShowAddVisit(false)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (!selectedHospitalId || !visitDateTime) {
                toast.error("Please select a hospital and date/time");
                return;
              }
              createVisitMutation.mutate({
                doctorId: doctor?.id || "doc-1",
                hospitalId: selectedHospitalId,
                startsAt: new Date(visitDateTime).toISOString(),
                capacity: Number(visitCapacity),
                status: "Approved",
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Target Hospital</label>
                <select
                  value={selectedHospitalId}
                  onChange={(e) => setSelectedHospitalId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                >
                  <option value="">Choose a hospital...</option>
                  {allHospitals.map((hosp: any) => (
                    <option key={hosp.id} value={hosp.id}>
                      {hosp.name} ({hosp.city})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Visit Date & Time</label>
                <input
                  type="datetime-local"
                  required
                  value={visitDateTime}
                  onChange={(e) => setVisitDateTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Slot Capacity</label>
                <input
                  type="number"
                  min={1}
                  max={200}
                  required
                  value={visitCapacity}
                  onChange={(e) => setVisitCapacity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAddVisit(false)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={createVisitMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">
                  {createVisitMutation.isPending ? "Scheduling..." : "Schedule Visit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT VISIT FOR DOCTOR */}
      {editingVisit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl border border-[#dfe9e4] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-display text-lg font-semibold text-[#17342f]">Edit Hospital Visit Slot</h3>
              <button onClick={() => setEditingVisit(null)} className="text-[#78918a] hover:text-[#17342f]"><X size={18} /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              updateVisitMutation.mutate({
                id: editingVisit.id,
                hospitalId: editHospitalId,
                startsAt: editDateTime ? new Date(editDateTime).toISOString() : undefined,
                capacity: Number(editCapacity),
              });
            }} className="mt-4 grid gap-3">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Hospital</label>
                <select
                  value={editHospitalId}
                  onChange={(e) => setEditHospitalId(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                >
                  {allHospitals.map((hosp: any) => (
                    <option key={hosp.id} value={hosp.id}>{hosp.name} ({hosp.city})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Date & Time</label>
                <input
                  type="datetime-local"
                  value={editDateTime}
                  onChange={(e) => setEditDateTime(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-bold text-[#50635e]">Capacity</label>
                <input
                  type="number"
                  min={1}
                  value={editCapacity}
                  onChange={(e) => setEditCapacity(Number(e.target.value))}
                  className="mt-1 w-full rounded-xl border border-[#dfe9e4] px-3 py-2 text-xs font-semibold outline-none"
                  required
                />
              </div>
              <div className="mt-3 flex justify-end gap-2">
                <button type="button" onClick={() => setEditingVisit(null)} className="rounded-xl px-4 py-2 text-xs font-bold text-[#50635e]">Cancel</button>
                <button type="submit" disabled={updateVisitMutation.isPending} className="rounded-xl bg-[#146b5a] px-4 py-2 text-xs font-bold text-white">
                  {updateVisitMutation.isPending ? "Updating..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN & SIGN UP PAGE (GOOGLE-ONLY PRIMARY + TWILIO OTP FORGOT PASSWORD)
// ─────────────────────────────────────────────────────────────────────────────
export function LoginPage() {
  const [location, navigate] = useLocation();
  const { user, isAuthenticated, loading } = useAuth();
  const isSignUp = location.includes("mode=signup") || location.includes("signup");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">(isSignUp ? "signup" : "signin");

  // Forgot password modal states
  const [showForgot, setShowForgot] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState("");
  const [forgotPhone, setForgotPhone] = useState("");
  const [maskedPhone, setMaskedPhone] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [forgotStep, setForgotStep] = useState<"enter-id" | "enter-otp">("enter-id");
  const [forgotMsg, setForgotMsg] = useState("");
  const [forgotErr, setForgotErr] = useState("");

  const sendForgotOtp = trpc.twilio.forgotPasswordSendOtp.useMutation();
  const resetPasswordMutation = trpc.twilio.forgotPasswordReset.useMutation();

  const { signIn } = useSignIn();
  const { signUp } = useSignUp();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      if (user && !user.onboardingCompleted) {
        navigate("/onboarding");
      } else {
        navigate(roleHome(user?.role));
      }
    }
  }, [isAuthenticated, loading, user, navigate]);

  const handleSendResetOtp = async () => {
    setForgotErr("");
    setForgotMsg("");
    if (!forgotIdentifier.trim()) {
      setForgotErr("Please enter your email, username, or phone number.");
      return;
    }
    try {
      const res = await sendForgotOtp.mutateAsync({ identifier: forgotIdentifier.trim() });
      setForgotPhone(res.phone);
      setMaskedPhone(res.maskedPhone);
      setForgotStep("enter-otp");
      setForgotMsg(`OTP successfully dispatched via Twilio SMS to ${res.maskedPhone}`);
    } catch (err: any) {
      setForgotErr(err.message || "Failed to send reset code via Twilio SMS.");
    }
  };

  const handleResetPassword = async () => {
    setForgotErr("");
    setForgotMsg("");
    if (!otpCode.trim() || otpCode.trim().length !== 6) {
      setForgotErr("Please enter the 6-digit OTP code sent to your phone.");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      setForgotErr("Password must be at least 8 characters long.");
      return;
    }
    try {
      await resetPasswordMutation.mutateAsync({
        identifier: forgotIdentifier.trim(),
        phone: forgotPhone,
        code: otpCode.trim(),
        newPassword: newPassword,
      });
      setForgotMsg("Password reset successfully! You can now sign in with your new password.");
      setTimeout(() => {
        setShowForgot(false);
        setForgotStep("enter-id");
        setOtpCode("");
        setNewPassword("");
        setForgotIdentifier("");
      }, 3000);
    } catch (err: any) {
      setForgotErr(err.message || "Failed to reset password. Check OTP code and try again.");
    }
  };

  return (
    <AppLayout>
      <div className="container flex min-h-[740px] items-center justify-center py-12">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-2xl bg-[#dcefe5] text-[#146b5a]">
              <HeartPulse size={22} />
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em]">
              {activeTab === "signin" ? "Welcome back to DocX." : "Create your DocX account."}
            </h1>
            <p className="mt-2 text-sm text-[#78918a]">
              Sign in securely using Google or your DocX credentials.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="mb-4 flex rounded-2xl bg-[#ebf3ef] p-1.5 border border-[#dfe9e4]">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                activeTab === "signin" ? "bg-white text-[#146b5a] shadow-sm" : "text-[#78918a] hover:text-[#17342f]"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("signup")}
              className={`flex-1 rounded-xl py-2 text-xs font-bold transition-all ${
                activeTab === "signup" ? "bg-white text-[#146b5a] shadow-sm" : "text-[#78918a] hover:text-[#17342f]"
              }`}
            >
              Create Account (Sign Up)
            </button>
          </div>

          {/* Clerk Auth Card with Native Google Button */}
          <div className="rounded-[30px] border border-[#dfe9e4] bg-white p-6 shadow-[0_14px_40px_rgba(26,61,52,0.06)] sm:p-8">
            <div className="clerk-auth-container">
              {activeTab === "signin" ? (
                <SignIn
                  routing="hash"
                  signUpUrl="/login?mode=signup"
                  forceRedirectUrl="/auth/redirect"
                  fallbackRedirectUrl="/auth/redirect"
                  appearance={{
                    layout: {
                      socialButtonsPlacement: "top",
                      socialButtonsVariant: "blockButton",
                    },
                    elements: {
                      socialButtonsBlockButton__facebook: "hidden",
                      socialButtonsBlockButton__github: "hidden",
                      socialButtonsBlockButton__oauth_facebook: "hidden",
                      socialButtonsBlockButton__oauth_github: "hidden",
                      phoneInput: "hidden",
                      footerActionLink: "text-[#146b5a] font-bold",
                    },
                  } as any}
                />
              ) : (
                <SignUp
                  routing="hash"
                  signInUrl="/login?mode=signin"
                  forceRedirectUrl="/auth/redirect"
                  fallbackRedirectUrl="/auth/redirect"
                  appearance={{
                    layout: {
                      socialButtonsPlacement: "top",
                      socialButtonsVariant: "blockButton",
                    },
                    elements: {
                      socialButtonsBlockButton__facebook: "hidden",
                      socialButtonsBlockButton__github: "hidden",
                      socialButtonsBlockButton__oauth_facebook: "hidden",
                      socialButtonsBlockButton__oauth_github: "hidden",
                      phoneInput: "hidden",
                      footerActionLink: "text-[#146b5a] font-bold",
                    },
                  } as any}
                />
              )}
            </div>

            {/* Twilio OTP Forgot Password trigger */}
            <div className="mt-4 text-center border-t border-[#edf2ef] pt-4">
              <button
                type="button"
                onClick={() => setShowForgot(true)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#146b5a] hover:underline"
              >
                <KeyRound size={13} /> Forgot password? Reset via Twilio SMS OTP
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal via Twilio SMS OTP */}
      {showForgot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-[28px] border border-[#dfe9e4] bg-white p-7 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="grid size-9 place-items-center rounded-xl bg-[#eaf3ed] text-[#146b5a]">
                  <KeyRound size={18} />
                </span>
                <h3 className="font-display text-xl font-semibold text-[#17342f]">Reset Password</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowForgot(false)}
                className="grid size-8 place-items-center rounded-full text-[#78918a] hover:bg-[#f3f7f3]"
              >
                <X size={18} />
              </button>
            </div>

            <p className="mt-2 text-xs text-[#78918a]">
              Recover your DocX account securely using Twilio SMS OTP verification.
            </p>

            {forgotErr && (
              <div className="mt-4 rounded-xl bg-[#fdf0ee] p-3 text-xs font-semibold text-[#b8443e] border border-[#fad4ce]">
                {forgotErr}
              </div>
            )}

            {forgotMsg && (
              <div className="mt-4 rounded-xl bg-[#eaf3ed] p-3 text-xs font-semibold text-[#146b5a] border border-[#c1e2d0]">
                {forgotMsg}
              </div>
            )}

            {forgotStep === "enter-id" ? (
              <div className="mt-5 grid gap-4">
                <label className="grid gap-1.5 text-xs font-bold text-[#50635e]">
                  <span>Email, Username, or Registered Phone</span>
                  <input
                    type="text"
                    value={forgotIdentifier}
                    onChange={(e) => setForgotIdentifier(e.target.value)}
                    placeholder="arkokundu500@gmail.com or 7439817750"
                    className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#146b5a]"
                  />
                </label>
                <button
                  type="button"
                  disabled={sendForgotOtp.isPending}
                  onClick={handleSendResetOtp}
                  className="rounded-xl bg-[#146b5a] py-3 text-xs font-bold text-white transition hover:bg-[#0e4c42] disabled:opacity-60"
                >
                  {sendForgotOtp.isPending ? "Sending OTP via Twilio..." : "Send OTP via Twilio SMS →"}
                </button>
              </div>
            ) : (
              <div className="mt-5 grid gap-4">
                <div className="rounded-xl bg-[#f4faf7] p-3 text-xs text-[#50635e]">
                  Verified target: <strong className="text-[#17342f]">{maskedPhone}</strong>
                </div>
                <label className="grid gap-1.5 text-xs font-bold text-[#50635e]">
                  <span>6-Digit SMS OTP Code</span>
                  <input
                    type="text"
                    maxLength={6}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                    placeholder="e.g. 842109"
                    className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-center font-mono text-lg font-bold tracking-widest text-[#17342f] outline-none focus:border-[#146b5a]"
                  />
                </label>
                <label className="grid gap-1.5 text-xs font-bold text-[#50635e]">
                  <span>New Password (min 8 characters)</span>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#146b5a]"
                  />
                </label>
                <button
                  type="button"
                  disabled={resetPasswordMutation.isPending}
                  onClick={handleResetPassword}
                  className="rounded-xl bg-[#146b5a] py-3 text-xs font-bold text-white transition hover:bg-[#0e4c42] disabled:opacity-60"
                >
                  {resetPasswordMutation.isPending ? "Verifying & Updating..." : "Verify OTP & Reset Password"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </AppLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT & PROFILE PAGE (LIVE DATABASE UPDATES)
// ─────────────────────────────────────────────────────────────────────────────
export function AccountPage() {
  const { user } = useAuth();
  const utils = trpc.useUtils();
  const updateProfile = trpc.auth.updateProfile.useMutation();

  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "");
  const [age, setAge] = useState(user?.age ? String(user.age) : "");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || "");
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || "");
  const [medicalNotes, setMedicalNotes] = useState(user?.medicalNotes || "");
  const [savedMsg, setSavedMsg] = useState("");

  const displayName = user?.name ?? "Your profile";
  const displayEmail = user?.email ?? "—";
  const roleLabel = (user?.role || "user").replace("_", " ");
  const initials = displayName
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const handleSave = async () => {
    setSavedMsg("");
    try {
      await updateProfile.mutateAsync({
        phone: phone.trim() || undefined,
        city: city.trim() || undefined,
        age: age ? Number(age) : undefined,
        bloodGroup: bloodGroup.trim() || undefined,
        emergencyContact: emergencyContact.trim() || undefined,
        medicalNotes: medicalNotes.trim() || undefined,
      });
      await utils.auth.me.invalidate();
      setSavedMsg("Profile saved directly to database!");
      setTimeout(() => setSavedMsg(""), 3500);
    } catch (err: any) {
      alert(err.message || "Failed to save profile");
    }
  };

  return (
    <AppLayout>
      <div className="container py-9 sm:py-12">
        <Breadcrumbs items={[{ label: "My account" }]} />
        <div className="mt-8 max-w-3xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">
                Private profile
              </div>
              <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em]">
                Your account
              </h1>
              <p className="mt-2 text-sm text-[#78918a]">
                Saved details and verified phone numbers for Twilio voice notifications.
              </p>
            </div>
            <Link
              href="/onboarding"
              className="text-xs font-bold text-[#146b5a] underline hover:text-[#0e4c42]"
            >
              Re-run Role Onboarding →
            </Link>
          </div>

          <div className="mt-8 rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.05)] sm:p-8">
            <div className="flex items-center gap-4 border-b border-[#edf2ef] pb-6">
              <span className="grid size-16 place-items-center rounded-full bg-[#dcefe5] font-display text-xl font-semibold text-[#146b5a]">
                {initials || "DX"}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-display text-2xl font-semibold">{displayName}</h2>
                  <span className="rounded-full bg-[#eaf3ed] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] text-[#146b5a]">
                    {roleLabel}
                  </span>
                </div>
                <p className="mt-1 text-sm text-[#78918a]">
                  {displayEmail} · signed in with {user?.loginMethod ?? "DocX"}
                </p>
              </div>
            </div>

            {savedMsg && (
              <div className="mt-5 p-3.5 rounded-xl bg-[#eaf3ed] border border-[#c1e2d0] text-xs font-bold text-[#146b5a] flex items-center gap-2">
                <Check size={16} /> {savedMsg}
              </div>
            )}

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-bold text-[#50635e]">
                <span>Contact Phone</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91..."
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e]"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#50635e]">
                <span>City / Area</span>
                <input
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Kolkata or Bengaluru"
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e]"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#50635e]">
                <span>Age</span>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 28"
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e]"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#50635e]">
                <span>Blood Group</span>
                <input
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  placeholder="O+"
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e]"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#50635e] sm:col-span-2">
                <span>Emergency Contact</span>
                <input
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  placeholder="Name & phone number"
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e]"
                />
              </label>

              <label className="grid gap-2 text-xs font-bold text-[#50635e] sm:col-span-2">
                <span>Medical Notes / Conditions</span>
                <textarea
                  rows={3}
                  value={medicalNotes}
                  onChange={(e) => setMedicalNotes(e.target.value)}
                  placeholder="Allergies, chronic conditions, regular prescriptions..."
                  className="rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-sm font-semibold text-[#17342f] outline-none focus:border-[#86b99e] resize-none"
                />
              </label>
            </div>

            <button
              disabled={updateProfile.isPending}
              onClick={handleSave}
              className="mt-6 rounded-2xl bg-[#146b5a] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#0e4c42] disabled:opacity-60"
            >
              {updateProfile.isPending ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEEDBACK PAGE
// ─────────────────────────────────────────────────────────────────────────────
export function FeedbackPage() {
  const [sent, setSent] = useState(false);
  return (
    <AppLayout>
      <div className="container flex min-h-[650px] items-center justify-center py-12">
        <div className="w-full max-w-xl rounded-[30px] border border-[#dfe9e4] bg-white p-7 shadow-[0_14px_40px_rgba(26,61,52,0.06)] sm:p-10">
          {sent ? (
            <div className="text-center">
              <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#dcefe5] text-[#146b5a]">
                <Check size={25} />
              </div>
              <h1 className="mt-5 font-display text-3xl font-semibold">Thank you for helping us improve.</h1>
              <p className="mt-3 text-sm leading-6 text-[#78918a]">
                Your feedback has been saved for the DocX team.
              </p>
              <Link
                href="/"
                className="mt-7 inline-flex rounded-full bg-[#146b5a] px-5 py-3 text-sm font-bold text-white"
              >
                Back to DocX
              </Link>
            </div>
          ) : (
            <>
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">We listen closely</div>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em]">
                How was your DocX experience?
              </h1>
              <p className="mt-3 text-sm leading-6 text-[#78918a]">
                Tell us what felt clear, what felt hard, or what you’d like us to build next.
              </p>
              <div className="mt-7 grid gap-4">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Your feedback</label>
                  <textarea
                    rows={5}
                    className="mt-2 w-full resize-none rounded-2xl border border-[#dfe9e4] bg-[#fbfaf6] p-4 text-sm outline-none focus:border-[#86b99e]"
                    placeholder="Write a few words..."
                  />
                </div>
                <label className="text-xs font-bold text-[#50635e]">
                  Email address
                  <input
                    className="mt-2 w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-4 py-3 text-sm outline-none focus:border-[#86b99e]"
                    placeholder="you@example.com"
                  />
                </label>
                <button
                  onClick={() => setSent(true)}
                  className="mt-2 rounded-2xl bg-[#146b5a] py-4 text-sm font-bold text-white"
                >
                  Send feedback
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REUSABLE DASHBOARD UI HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function AdminLayout({
  role,
  title,
  eyebrow,
  description,
  icon,
  children,
}: {
  role: string;
  title: string;
  eyebrow: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const [sidebar, setSidebar] = useState(false);
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const initials = (user?.name ?? "DX")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f3f7f3] text-[#17342f]">
      <header className="sticky top-0 z-40 border-b border-[#dfe9e4] bg-[#fbfaf6]/95 backdrop-blur-xl">
        <div className="container flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="font-display text-xl font-semibold tracking-[-0.04em]">
            doc<span className="text-[#b8443e]">x</span>
            <span className="ml-3 hidden rounded-full bg-[#eaf3ed] px-2.5 py-1 align-middle font-sans text-[10px] font-bold uppercase tracking-[0.12em] text-[#146b5a] sm:inline">
              {role}
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              className="grid size-10 place-items-center rounded-xl bg-[#eaf3ed] text-[#146b5a] lg:hidden"
              onClick={() => setSidebar(!sidebar)}
            >
              {sidebar ? "×" : "☰"}
            </button>
            <Link
              href="/account"
              className="hidden size-10 place-items-center rounded-full bg-[#dcefe5] text-xs font-bold text-[#146b5a] sm:grid"
              title={user?.name ?? "Account"}
            >
              {initials}
            </Link>
            <button
              onClick={logout}
              className="rounded-full px-4 py-2 text-xs font-bold text-[#50635e] transition hover:bg-[#f9e3df] hover:text-[#a53f39]"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      <div className="container grid gap-8 py-8 lg:grid-cols-[220px_1fr]">
        <aside
          className={`${
            sidebar ? "block" : "hidden"
          } h-fit rounded-[22px] border border-[#dfe9e4] bg-white p-3 lg:sticky lg:top-24 lg:block`}
        >
          <div className="grid gap-1">
            {(user?.role === "admin" || role.toLowerCase().includes("central admin")
              ? [
                  ["Platform Admin", <LayoutDashboard size={16} key="overview" />, "/admin"],
                  ["Account", <Settings2 size={16} key="settings" />, "/account"],
                ]
              : user?.role === "hospital_authority" || role.toLowerCase().includes("hospital")
              ? [
                  ["Hospital Workspace", <Hospital size={16} key="hosp" />, "/hospital-admin"],
                  ["Account", <Settings2 size={16} key="settings" />, "/account"],
                ]
              : user?.role === "doctor" || role.toLowerCase().includes("doctor")
              ? [
                  ["Doctor Workspace", <Stethoscope size={16} key="doc" />, "/doctor-admin"],
                  ["Account", <Settings2 size={16} key="settings" />, "/account"],
                ]
              : [
                  ["Account", <Settings2 size={16} key="settings" />, "/account"],
                ]
            ).map(([label, iconItem, href]) => (
              <Link
                key={String(label)}
                href={String(href)}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-xs font-bold transition ${
                  location === String(href) ? "bg-[#eaf3ed] text-[#146b5a]" : "text-[#78918a] hover:bg-[#f3f7f3]"
                }`}
              >
                {iconItem as React.ReactNode}
                {label}
              </Link>
            ))}
          </div>
        </aside>
        <main className="min-w-0">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">
                {icon}
                {eyebrow}
              </div>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{title}</h1>
              <p className="mt-3 max-w-2xl text-sm text-[#78918a]">{description}</p>
            </div>
          </div>
          <div className="mt-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

function AppointmentRow({
  bookingId,
  status,
  doctorId,
  doctorName,
  hospitalId,
  hospitalName,
  doctorImage,
  date,
  time,
  reason,
  onDelete,
  onChat,
  hasUnread = false,
}: {
  bookingId?: string;
  status: string;
  doctorId: string;
  doctorName?: string;
  hospitalId: string;
  hospitalName?: string;
  doctorImage?: string;
  date: string;
  time: string;
  reason: string;
  onDelete?: () => void;
  onChat?: () => void;
  hasUnread?: boolean;
}) {
  const mockDoc = getDoctor(doctorId);
  const displayName = doctorName || mockDoc?.name || "Consultation with Specialist";
  const displayHospital = hospitalName || getHospitalName(hospitalId);
  const displayImage = doctorImage || mockDoc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85";

  return (
    <div className="flex flex-col gap-3 border-b border-[#edf2ef] p-4 last:border-b-0 sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <img src={displayImage} alt={displayName} className="size-11 rounded-xl object-cover object-top" />
        <div>
          <div className="text-sm font-bold text-[#17342f]">{displayName}</div>
          <div className="mt-1 text-xs text-[#78918a]">
            {displayHospital} · {reason}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 sm:ml-auto">
        <div className="text-right">
          <div className="text-xs font-bold text-[#17342f]">{date}</div>
          <div className="mt-1 text-[11px] text-[#78918a]">{time}</div>
        </div>
        <TrustPill tone={status === "Confirmed" ? "green" : "cream"}>{status}</TrustPill>
        {onChat && (
          <button
            type="button"
            onClick={onChat}
            className="relative inline-flex items-center gap-1.5 rounded-lg border border-[#cde4d9] bg-[#f2f8f5] px-2.5 py-1 text-xs font-bold text-[#146b5a] hover:bg-[#146b5a] hover:text-white transition cursor-pointer"
            title="Chat with Doctor"
          >
            <MessageSquare size={13} />
            <span>Chat</span>
            {hasUnread && (
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-red-500" />
              </span>
            )}
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="grid size-8 place-items-center rounded-lg text-[#78918a] hover:bg-[#fdeeed] hover:text-[#b8443e] transition"
            title="Cancel and delete appointment"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>
    </div>
  );
}

function SavedItem({ icon, title, meta }: { icon: React.ReactNode; title: string; meta: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#f3f7f3] p-3">
      <span className="grid size-9 place-items-center rounded-xl bg-white text-[#146b5a]">{icon}</span>
      <div>
        <div className="text-xs font-bold text-[#17342f]">{title}</div>
        <div className="mt-1 text-[11px] text-[#78918a]">{meta}</div>
      </div>
    </div>
  );
}

function PanelHeader({ title, action, light = false }: { title: string; action: string; light?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className={`font-display text-xl font-semibold tracking-[-0.04em] ${light ? "text-white" : "text-[#17342f]"}`}>
        {title}
      </h2>
      <button className={`text-xs font-bold ${light ? "text-[#b8efd0]" : "text-[#146b5a]"}`}>{action}</button>
    </div>
  );
}
