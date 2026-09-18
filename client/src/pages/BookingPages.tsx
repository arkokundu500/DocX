import { useMemo, useState } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { ArrowRight, CalendarDays, Check, Clock3, FileText, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, UserRound } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { AppLayout, Breadcrumbs, Rating, TrustPill } from "@/components/DocxShell";
import { trpc } from "@/lib/trpc";
import { roleHome } from "@/lib/roles";
import { getDoctor, getDoctorName, getHospital, getHospitalName, getVisitsForDoctor, visits } from "@/lib/mock-data";

export function BookingPage() {
  const [, navigate] = useLocation();
  const search = useSearch();
  const { user } = useAuth();

  const params = useMemo(() => {
    const queryStr = search || (typeof window !== "undefined" ? window.location.search : "");
    const clean = queryStr.startsWith("?") ? queryStr.slice(1) : queryStr;
    return new URLSearchParams(clean);
  }, [search]);

  const targetDoctorId = params.get("doctor") || undefined;
  const targetHospitalId = params.get("hospital") || undefined;
  const targetVisitId = params.get("visit") || undefined;

  // 1. Fetch visit details if visit ID is specified
  const visitDetailQuery = trpc.directory.visit.useQuery(
    { id: targetVisitId! },
    { enabled: !!targetVisitId }
  );

  const effectiveDoctorId = targetDoctorId || visitDetailQuery.data?.doctorId || undefined;
  const effectiveHospitalId = targetHospitalId || visitDetailQuery.data?.hospitalId || undefined;

  // 2. Fetch doctor details from DB
  const doctorDetailQuery = trpc.directory.doctor.useQuery(
    { id: effectiveDoctorId! },
    { enabled: !!effectiveDoctorId }
  );

  // 3. Fetch hospital details from DB
  const hospitalDetailQuery = trpc.directory.hospital.useQuery(
    { id: effectiveHospitalId! },
    { enabled: !!effectiveHospitalId }
  );

  const doctor = useMemo(() => {
    if (doctorDetailQuery.data) {
      return {
        id: doctorDetailQuery.data.id,
        name: doctorDetailQuery.data.name,
        specialty: doctorDetailQuery.data.specialty,
        department: doctorDetailQuery.data.department,
        fee: Number(doctorDetailQuery.data.fee) || 1200,
        image: getDoctor(doctorDetailQuery.data.id)?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
        bio: `Specialist at ${effectiveHospitalId ? getHospital(effectiveHospitalId).name : "DocX partner hospital"}.`,
        rating: Number(doctorDetailQuery.data.rating) || 4.8,
        reviewCount: doctorDetailQuery.data.reviewCount || 100,
        experienceYears: doctorDetailQuery.data.experienceYears || 10,
        hospitalIds: [effectiveHospitalId || ""],
        nextAvailable: "Today",
        verified: true,
      };
    }
    if (visitDetailQuery.data?.doctorName) {
      const mock = getDoctor(effectiveDoctorId);
      return {
        id: visitDetailQuery.data.doctorId,
        name: visitDetailQuery.data.doctorName,
        specialty: visitDetailQuery.data.doctorSpecialty || mock?.specialty || "Specialist",
        department: visitDetailQuery.data.doctorDepartment || mock?.department || "General Medicine",
        fee: Number(visitDetailQuery.data.doctorFee) || mock?.fee || 700,
        image: mock?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
        bio: `Specialist at ${effectiveHospitalId ? getHospitalName(effectiveHospitalId) : "DocX partner hospital"}.`,
        rating: mock?.rating || 4.8,
        reviewCount: mock?.reviewCount || 100,
        experienceYears: mock?.experienceYears || 10,
        hospitalIds: [effectiveHospitalId || ""],
        nextAvailable: "Today",
        verified: true,
      };
    }
    const mock = getDoctor(effectiveDoctorId);
    return mock ?? {
      id: effectiveDoctorId || "doc-default",
      name: "Specialist Doctor",
      specialty: "General Medicine",
      department: "Outpatient Department",
      fee: 700,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
      bio: `Specialist at ${effectiveHospitalId ? getHospitalName(effectiveHospitalId) : "DocX partner hospital"}.`,
      rating: 4.8,
      reviewCount: 100,
      experienceYears: 10,
      hospitalIds: [effectiveHospitalId || ""],
      nextAvailable: "Today",
      verified: true,
    };
  }, [doctorDetailQuery.data, effectiveDoctorId, visitDetailQuery.data, effectiveHospitalId]);

  const hospital = useMemo(() => {
    if (hospitalDetailQuery.data) {
      return {
        id: hospitalDetailQuery.data.id,
        name: hospitalDetailQuery.data.name,
        type: hospitalDetailQuery.data.type,
        address: hospitalDetailQuery.data.address,
        city: hospitalDetailQuery.data.city,
        rating: Number(hospitalDetailQuery.data.rating) || 4.5,
        reviewCount: hospitalDetailQuery.data.reviewCount || 150,
        ambulanceAvailable: Boolean(hospitalDetailQuery.data.ambulanceAvailable),
        bedCapacity: hospitalDetailQuery.data.bedCapacity || 100,
        specialties: [],
        tests: [],
        image: getHospital(hospitalDetailQuery.data.id)?.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
        accent: "#146b5a",
        description: "Verified care partner facility.",
        phone: hospitalDetailQuery.data.phone || "+91-90000-00000",
        openHours: "Daily OPD hours",
      };
    }
    if (visitDetailQuery.data?.hospitalName) {
      const mock = getHospital(effectiveHospitalId);
      return {
        id: visitDetailQuery.data.hospitalId,
        name: visitDetailQuery.data.hospitalName,
        type: mock?.type || "General",
        address: visitDetailQuery.data.hospitalAddress || mock?.address || "Bengaluru",
        city: visitDetailQuery.data.hospitalCity || mock?.city || "Bengaluru",
        rating: mock?.rating || 4.5,
        reviewCount: mock?.reviewCount || 150,
        ambulanceAvailable: mock?.ambulanceAvailable ?? true,
        bedCapacity: mock?.bedCapacity || 100,
        specialties: [],
        tests: [],
        image: mock?.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
        accent: "#146b5a",
        description: "Verified care partner facility.",
        phone: mock?.phone || "+91-90000-00000",
        openHours: mock?.openHours || "Daily OPD hours",
      };
    }
    const mock = getHospital(effectiveHospitalId);
    return mock ?? {
      id: effectiveHospitalId || "hosp-default",
      name: "DocX Partner Hospital",
      type: "Multispecialty",
      address: "Bengaluru",
      city: "Bengaluru",
      rating: 4.5,
      reviewCount: 150,
      ambulanceAvailable: true,
      bedCapacity: 100,
      specialties: [],
      tests: [],
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
      accent: "#146b5a",
      description: "Verified care partner facility.",
      phone: "+91-90000-00000",
      openHours: "Daily OPD hours",
    };
  }, [hospitalDetailQuery.data, effectiveHospitalId, visitDetailQuery.data]);

  const liveVisitsQuery = trpc.visits.list.useQuery(
    { doctorId: doctor.id },
    { enabled: !!doctor.id }
  );

  const availableVisits = useMemo(() => {
    const list: any[] = [];
    const seenIds = new Set<string>();

    if (visitDetailQuery.data) {
      const v = visitDetailQuery.data;
      const d = new Date(v.startsAt);
      seenIds.add(v.id);
      list.push({
        id: v.id,
        doctorId: v.doctorId,
        hospitalId: v.hospitalId,
        day: isNaN(d.getTime()) ? "Today" : d.toLocaleDateString("en-IN", { weekday: "long" }),
        date: isNaN(d.getTime()) ? "Upcoming" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        time: isNaN(d.getTime()) ? "10:00 AM - 1:00 PM" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
        capacity: Number(v.capacity) || 15,
        booked: Number((v as any).bookedCount ?? v.booked) || 0,
        room: v.room || "Room 102",
        status: v.status || "Approved",
      });
    }

    if (liveVisitsQuery.data) {
      for (const v of liveVisitsQuery.data) {
        if (!seenIds.has(v.id)) {
          seenIds.add(v.id);
          const d = new Date(v.startsAt);
          list.push({
            id: v.id,
            doctorId: v.doctorId,
            hospitalId: v.hospitalId,
            day: isNaN(d.getTime()) ? "Upcoming" : d.toLocaleDateString("en-IN", { weekday: "long" }),
            date: isNaN(d.getTime()) ? "Date TBD" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
            time: isNaN(d.getTime()) ? "10:00 AM - 1:00 PM" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
            capacity: Number(v.capacity) || 15,
            booked: Number((v as any).bookedCount ?? v.booked) || 0,
            room: v.room || "Room 102",
            status: v.status || "Approved",
          });
        }
      }
    }

    if (list.length === 0) {
      const seedVisits = getVisitsForDoctor(doctor.id);
      list.push(...seedVisits);
    }

    return list;
  }, [visitDetailQuery.data, liveVisitsQuery.data, doctor.id]);

  const [chosenVisitId, setChosenVisitId] = useState<string | undefined>(undefined);

  const selectedVisit = useMemo(() => {
    const idToFind = chosenVisitId || targetVisitId;
    if (idToFind) {
      const found = availableVisits.find((v) => v.id === idToFind);
      if (found) return found;
    }
    return availableVisits[0];
  }, [availableVisits, chosenVisitId, targetVisitId]);

  const [reason, setReason] = useState("");
  const [patientName, setPatientName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [reminders, setReminders] = useState(true);
  const [error, setError] = useState("");
  const createAppointment = trpc.appointments.create.useMutation();

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedVisit) return setError("Please choose an available visit.");
    if (!reason.trim()) return setError("Please tell us briefly what you’d like help with.");
    setError("");
    try {
      const actualHospitalId = selectedVisit.hospitalId || hospital.id;
      const result = await createAppointment.mutateAsync({
        visitId: selectedVisit.id,
        doctorId: doctor.id,
        hospitalId: actualHospitalId,
        patientName,
        patientPhone: phone,
        patientEmail: email,
        reason,
        reminders,
      });
      navigate(
        `/appointment/confirmation?doctor=${encodeURIComponent(doctor.id)}&hospital=${encodeURIComponent(
          actualHospitalId
        )}&visit=${encodeURIComponent(selectedVisit.id)}&reason=${encodeURIComponent(reason)}&booking=${encodeURIComponent(
          result.bookingId
        )}`
      );
    } catch (bookingError) {
      setError(bookingError instanceof Error ? bookingError.message : "That slot was just taken. Please choose another visit.");
    }
  };

  return (
    <AppLayout>
      <div className="container py-9 sm:py-12">
        <Breadcrumbs items={[{ label: "Find care", href: "/hospitals" }, { label: "Book appointment" }]} />
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <main>
            <div className="flex items-center gap-3 text-xs font-bold text-[#78918a]">
              <span className="inline-flex items-center gap-2 text-[#146b5a]">
                <span className="grid size-6 place-items-center rounded-full bg-[#146b5a] text-[10px] text-white">1</span>
                Visit details
              </span>
              <span className="h-px w-8 bg-[#dfe9e4]" />
              <span className="inline-flex items-center gap-2">
                <span className="grid size-6 place-items-center rounded-full bg-[#eaf3ed] text-[10px] text-[#78918a]">2</span>
                Confirmation
              </span>
            </div>
            <div className="mt-6 rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_12px_35px_rgba(26,61,52,0.05)] sm:p-8">
              <div className="flex items-start gap-4 border-b border-[#edf2ef] pb-6">
                <img src={doctor.image} alt={doctor.name} className="size-16 rounded-2xl object-cover object-top" />
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#b8443e]">Appointment with</div>
                  <h1 className="mt-1 font-display text-2xl font-semibold tracking-[-0.04em]">{doctor.name}</h1>
                  <p className="mt-1 text-sm text-[#78918a]">
                    {doctor.specialty} · ₹{doctor.fee.toLocaleString("en-IN")}
                  </p>
                </div>
                <TrustPill>
                  <ShieldCheck size={12} /> Verified
                </TrustPill>
              </div>
              <form onSubmit={submit} className="mt-7 grid gap-7">
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Choose your visit</label>
                  <div className="mt-3 grid gap-3">
                    {availableVisits.map((visit) => {
                      const visitHospital = getHospital(visit.hospitalId);
                      const open = Math.max(0, visit.capacity - visit.booked);
                      const isSelected = selectedVisit?.id === visit.id;
                      return (
                        <button
                          key={visit.id}
                          type="button"
                          onClick={() => setChosenVisitId(visit.id)}
                          className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left transition ${
                            isSelected ? "border-[#146b5a] bg-[#f1f7f1]" : "border-[#dfe9e4] hover:border-[#a9d9bd]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`grid size-10 place-items-center rounded-xl ${
                                isSelected ? "bg-[#146b5a] text-white" : "bg-[#eaf3ed] text-[#146b5a]"
                              }`}
                            >
                              <CalendarDays size={16} />
                            </span>
                            <div>
                              <div className="text-sm font-bold text-[#17342f]">
                                {visit.day}, {visit.date} · {visit.time}
                              </div>
                              <div className="mt-1 text-xs text-[#78918a]">
                                {visitHospital.name} · {open} slots shown available
                              </div>
                            </div>
                          </div>
                          {isSelected && <Check size={17} className="text-[#146b5a]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label htmlFor="reason" className="text-xs font-bold text-[#50635e]">
                    What would you like help with?
                  </label>
                  <textarea
                    id="reason"
                    value={reason}
                    onChange={(event) => setReason(event.target.value)}
                    placeholder="For example: regular checkup, cardiac consult, chest heaviness for two weeks..."
                    rows={4}
                    className="mt-3 w-full resize-none rounded-2xl border border-[#dfe9e4] bg-[#fbfaf6] px-4 py-3.5 text-sm font-medium text-[#17342f] outline-none transition placeholder:text-[#9aa9a4] focus:border-[#7eb092]"
                  />
                  {error && <p className="mt-2 rounded-xl bg-[#fff0ed] p-3 text-xs font-bold text-[#b8443e]">{error}</p>}
                </div>
                <div>
                  <div className="text-xs font-bold text-[#50635e]">Your details</div>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field label="Full name" icon={<UserRound size={15} />} value={patientName} onChange={setPatientName} />
                    <Field label="Phone number" icon={<Phone size={15} />} value={phone} onChange={setPhone} />
                    <Field label="Email address" icon={<Mail size={15} />} value={email} onChange={setEmail} />
                    <label className="flex items-center gap-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3 text-xs font-semibold text-[#50635e]">
                      <input
                        type="checkbox"
                        checked={reminders}
                        onChange={(event) => setReminders(event.target.checked)}
                        className="size-4 accent-[#146b5a]"
                      />
                      Voice reminder opt-in
                    </label>
                  </div>
                </div>
                <button
                  disabled={createAppointment.isPending}
                  type="submit"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#146b5a] text-sm font-bold text-white shadow-[0_12px_24px_rgba(20,107,90,0.18)] transition hover:bg-[#0e4c42] disabled:cursor-wait disabled:opacity-60"
                >
                  {createAppointment.isPending ? "Securing your slot…" : "Confirm appointment"}{" "}
                  <ArrowRight size={16} />
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-[#9aa9a4]">
                  <LockKeyhole size={13} /> Your slot is reserved atomically on submit.
                </div>
              </form>
            </div>
          </main>
          <aside className="h-fit rounded-[28px] border border-[#dfe9e4] bg-[#f1f7f1] p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b8443e]">Your visit</div>
            <h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">A clear plan, before you go.</h2>
            <div className="mt-6 rounded-2xl bg-white p-4">
              <div className="flex items-center gap-3">
                <img src={doctor.image} alt={doctor.name} className="size-12 rounded-xl object-cover object-top" />
                <div>
                  <div className="text-sm font-bold text-[#17342f]">{doctor.name}</div>
                  <div className="mt-1 text-xs text-[#78918a]">{doctor.specialty}</div>
                </div>
              </div>
              <div className="mt-5 grid gap-3 border-t border-[#edf2ef] pt-4">
                <SummaryLine
                  icon={<CalendarDays size={14} />}
                  label="Date & time"
                  value={`${selectedVisit?.day ? `${selectedVisit.day}, ` : ""}${selectedVisit?.date || "Upcoming"} · ${
                    selectedVisit?.time || "10:00 AM"
                  }`}
                />
                <SummaryLine
                  icon={<MapPin size={14} />}
                  label="Location"
                  value={getHospital(selectedVisit?.hospitalId || hospital.id).name}
                />
                <SummaryLine
                  icon={<Phone size={14} />}
                  label="Consultation"
                  value={`₹${doctor.fee.toLocaleString("en-IN")}`}
                />
              </div>
            </div>
            <div className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-[#78918a]">
              <ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#146b5a]" /> Double bookings are rejected by the database
              before confirmation.
            </div>
          </aside>
        </div>
      </div>
    </AppLayout>
  );
}

export function ConfirmationPage() {
  const search = useSearch();
  const { user } = useAuth();
  const homeHref = roleHome(user?.role);

  const params = useMemo(() => {
    const queryStr = search || (typeof window !== "undefined" ? window.location.search : "");
    const clean = queryStr.startsWith("?") ? queryStr.slice(1) : queryStr;
    return new URLSearchParams(clean);
  }, [search]);

  const targetDoctorId = params.get("doctor") || undefined;
  const targetHospitalId = params.get("hospital") || undefined;
  const targetVisitId = params.get("visit") || undefined;
  const reason = params.get("reason") ?? "Regular consultation";
  const bookingId = params.get("booking") ?? "Pending";

  const visitDetailQuery = trpc.directory.visit.useQuery(
    { id: targetVisitId! },
    { enabled: !!targetVisitId }
  );

  const effectiveDoctorId = targetDoctorId || visitDetailQuery.data?.doctorId;
  const effectiveHospitalId = targetHospitalId || visitDetailQuery.data?.hospitalId;

  const doctorDetailQuery = trpc.directory.doctor.useQuery(
    { id: effectiveDoctorId! },
    { enabled: !!effectiveDoctorId }
  );

  const hospitalDetailQuery = trpc.directory.hospital.useQuery(
    { id: effectiveHospitalId! },
    { enabled: !!effectiveHospitalId }
  );

  const doctor = useMemo(() => {
    if (doctorDetailQuery.data) {
      return {
        id: doctorDetailQuery.data.id,
        name: doctorDetailQuery.data.name,
        specialty: doctorDetailQuery.data.specialty,
      };
    }
    if (visitDetailQuery.data?.doctorName) {
      return {
        id: visitDetailQuery.data.doctorId,
        name: visitDetailQuery.data.doctorName,
        specialty: visitDetailQuery.data.doctorSpecialty || "Specialist",
      };
    }
    const mock = getDoctor(effectiveDoctorId);
    return mock ?? {
      id: effectiveDoctorId || "doc-default",
      name: "Specialist Doctor",
      specialty: "General Medicine",
    };
  }, [doctorDetailQuery.data, visitDetailQuery.data, effectiveDoctorId]);

  const hospital = useMemo(() => {
    if (hospitalDetailQuery.data) {
      return {
        id: hospitalDetailQuery.data.id,
        name: hospitalDetailQuery.data.name,
      };
    }
    if (visitDetailQuery.data?.hospitalName) {
      return {
        id: visitDetailQuery.data.hospitalId,
        name: visitDetailQuery.data.hospitalName,
      };
    }
    const mock = getHospital(effectiveHospitalId);
    return mock ?? {
      id: effectiveHospitalId || "hosp-default",
      name: "DocX Partner Hospital",
    };
  }, [hospitalDetailQuery.data, visitDetailQuery.data, effectiveHospitalId]);

  const visitTimeFormatted = useMemo(() => {
    if (visitDetailQuery.data?.startsAt) {
      const d = new Date(visitDetailQuery.data.startsAt);
      return {
        day: isNaN(d.getTime()) ? "Today" : d.toLocaleDateString("en-IN", { weekday: "long" }),
        date: isNaN(d.getTime()) ? "Upcoming" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
        time: isNaN(d.getTime()) ? "10:00 AM" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
      };
    }
    const foundMock = visits.find((item) => item.id === targetVisitId) ?? getVisitsForDoctor(doctor.id)[0];
    return {
      day: foundMock?.day ?? "Upcoming",
      date: foundMock?.date ?? "Upcoming",
      time: foundMock?.time ?? "10:00 AM",
    };
  }, [visitDetailQuery.data, targetVisitId, doctor.id]);

  return (
    <AppLayout>
      <div className="container flex min-h-[720px] items-center justify-center py-12">
        <div className="w-full max-w-2xl">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-[#dcefe5] text-[#146b5a]">
            <Check size={30} strokeWidth={2.5} />
          </div>
          <div className="mt-6 text-center">
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">Appointment confirmed</div>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">You’re all set.</h1>
            <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-[#78918a]">
              Your slot is reserved in Neon and the booking details are ready in your dashboard.
            </p>
          </div>
          <div className="mt-9 rounded-[28px] border border-[#dfe9e4] bg-white p-6 shadow-[0_14px_40px_rgba(26,61,52,0.06)] sm:p-8">
            <div className="flex flex-col gap-4 border-b border-[#edf2ef] pb-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa9a4]">Booking ID</div>
                <div className="mt-1 font-mono text-sm font-bold text-[#17342f]">{bookingId}</div>
              </div>
              <TrustPill>
                <Check size={12} /> Confirmed
              </TrustPill>
            </div>
            <div className="grid gap-6 py-6 sm:grid-cols-2">
              <SummaryLine
                icon={<CalendarDays size={16} />}
                label="Date & time"
                value={`${visitTimeFormatted.day}, ${visitTimeFormatted.date} · ${visitTimeFormatted.time}`}
              />
              <SummaryLine icon={<MapPin size={16} />} label="Hospital" value={hospital.name} />
              <SummaryLine icon={<UserRound size={16} />} label="Doctor" value={`${doctor.name} · ${doctor.specialty}`} />
              <SummaryLine icon={<FileText size={16} />} label="Reason for visit" value={reason} />
            </div>
            <div className="rounded-2xl bg-[#f1f7f1] p-4">
              <div className="flex items-start gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-[#dcefe5] text-[#146b5a]">
                  <Clock3 size={16} />
                </span>
                <div>
                  <div className="text-sm font-bold text-[#17342f]">Reminder preference saved</div>
                  <p className="mt-1 text-xs leading-5 text-[#78918a]">
                    If opted in, the DocX automated reminder can call before your visit.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href={homeHref}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#146b5a] py-4 text-sm font-bold text-white"
              >
                Go to {user?.role === "user" ? "dashboard" : "workspace"} <ArrowRight size={15} />
              </Link>
              <Link
                href="/hospitals"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#dfe9e4] py-4 text-sm font-bold text-[#50635e]"
              >
                Find another visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

function Field({
  label,
  icon,
  value,
  onChange,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="flex items-center gap-2.5 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-3">
      <span className="text-[#78918a]">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.08em] text-[#9aa9a4]">{label}</span>
        <input
          required
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="mt-1 w-full bg-transparent text-xs font-bold text-[#17342f] outline-none"
        />
      </span>
    </label>
  );
}

function SummaryLine({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#eaf3ed] text-[#146b5a]">{icon}</span>
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#9aa9a4]">{label}</div>
        <div className="mt-1 text-xs font-bold leading-5 text-[#17342f]">{value}</div>
      </div>
    </div>
  );
}
