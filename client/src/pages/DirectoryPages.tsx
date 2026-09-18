import { useMemo, useState } from "react";
import { Link, useLocation, useRoute, useSearch } from "wouter";
import { ArrowLeft, ArrowRight, BedDouble, Check, ChevronDown, Clock3, FileText, Filter, HeartPulse, MapPin, PhoneCall, Search, ShieldCheck, Star, Stethoscope, UsersRound } from "lucide-react";
import { AppLayout, AssistantCard, Breadcrumbs, DoctorCard, HospitalCard, Rating, SectionHeading, TrustPill } from "@/components/DocxShell";
import { doctors, getDoctor, getDoctorName, getDoctorsForHospital, getHospital, getHospitalName, getVisitsForDoctor, getVisitsForHospital, hospitals, priceBands, specialties } from "@/lib/mock-data";
import { trpc } from "@/lib/trpc";

export function HospitalsPage() {
  const searchStr = useSearch();
  const query = useMemo(() => {
    const qStr = searchStr || (typeof window !== "undefined" ? window.location.search : "");
    const clean = qStr.startsWith("?") ? qStr.slice(1) : qStr;
    return new URLSearchParams(clean).get("q") ?? "";
  }, [searchStr]);
  const [search, setSearch] = useState(query);
  const [specialty, setSpecialty] = useState("All specialties");
  const [minRating, setMinRating] = useState("Any rating");
  const [priceBand, setPriceBand] = useState("Any fee");
  const [ambulanceOnly, setAmbulanceOnly] = useState(false);
  const [mobileFilters, setMobileFilters] = useState(false);
  const filtered = useMemo(() => hospitals.filter((hospital) => {
    const text = `${hospital.name} ${hospital.address} ${hospital.specialties.join(" ")}`.toLowerCase();
    const matchesSearch = !search || text.includes(search.toLowerCase());
    const matchesSpecialty = specialty === "All specialties" || hospital.specialties.some((item) => item.toLowerCase() === specialty.toLowerCase());
    const matchesRating = minRating === "Any rating" || hospital.rating >= Number(minRating);
    const band = priceBands.find((item) => item.label === priceBand);
    const matchesPrice = !band || doctors.some((doctor) => doctor.hospitalIds.includes(hospital.id) && doctor.fee >= band.min && doctor.fee <= band.max);
    return matchesSearch && matchesSpecialty && matchesRating && matchesPrice && (!ambulanceOnly || hospital.ambulanceAvailable);
  }), [ambulanceOnly, minRating, priceBand, search, specialty]);
  return <AppLayout><div className="container py-9 sm:py-12"><Breadcrumbs items={[{ label: "Find care" }]} /><div className="mt-8 grid gap-8 lg:grid-cols-[270px_1fr]"><aside className={`h-fit rounded-[24px] border border-[#dfe9e4] bg-white p-5 shadow-[0_10px_30px_rgba(26,61,52,0.04)] ${mobileFilters ? "block" : "hidden lg:block"}`}><div className="flex items-center justify-between"><h2 className="font-display text-xl font-semibold tracking-[-0.04em]">Filter care</h2><button className="text-xs font-bold text-[#b8443e]" onClick={() => { setSearch(""); setSpecialty("All specialties"); setMinRating("Any rating"); setPriceBand("Any fee"); setAmbulanceOnly(false); }}>Reset</button></div><div className="mt-6 grid gap-5"><FilterSelect label="Specialty" value={specialty} onChange={setSpecialty} options={specialties} /><FilterSelect label="Rating" value={minRating} onChange={setMinRating} options={["Any rating", "4.8+", "4.5+", "4.0+"]} /><FilterSelect label="Consultation fee" value={priceBand} onChange={setPriceBand} options={["Any fee", ...priceBands.map((item) => item.label)]} /><label className="flex items-center gap-3 rounded-xl bg-[#f3f7f3] p-3 text-sm font-semibold text-[#50635e]"><input type="checkbox" checked={ambulanceOnly} onChange={(e) => setAmbulanceOnly(e.target.checked)} className="size-4 accent-[#146b5a]" /> Ambulance available</label></div></aside><main><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">Bengaluru directory</div><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Find care that fits.</h1><p className="mt-3 text-sm leading-6 text-[#78918a]">Compare trusted hospitals, specialties, and open appointment paths.</p></div><button onClick={() => setMobileFilters(!mobileFilters)} className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dfe9e4] bg-white px-4 text-xs font-bold text-[#50635e] lg:hidden"><Filter size={15} /> Filters</button></div><div className="mt-7 flex flex-col gap-3 sm:flex-row"><div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#dfe9e4] bg-white px-4 py-3 shadow-[0_8px_24px_rgba(26,61,52,0.03)]"><Search size={17} className="text-[#78918a]" /><input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[#9aa9a4]" placeholder="Search by name, specialty, or location" /></div><div className="inline-flex items-center gap-2 rounded-2xl border border-[#dfe9e4] bg-[#eaf3ed] px-4 py-3 text-xs font-bold text-[#146b5a]"><span className="size-2 rounded-full bg-[#3b9a6d]" /> {filtered.length} hospitals found</div></div><div className="mt-7 grid gap-5 xl:grid-cols-2">{filtered.map((hospital) => <HospitalCard key={hospital.id} hospital={hospital} />)}</div>{filtered.length === 0 && <div className="mt-7 rounded-[24px] border border-dashed border-[#bdd4c6] bg-[#f3f7f3] p-10 text-center"><HeartPulse className="mx-auto text-[#146b5a]" /><h2 className="mt-4 font-display text-2xl font-semibold">No exact matches yet</h2><p className="mt-2 text-sm text-[#78918a]">Try a broader specialty or remove one of your filters.</p></div>}<div className="mt-10"><AssistantCard compact /></div></main></div></div></AppLayout>;
}

export function HospitalDetailPage({ id }: { id?: string }) {
  const hospitalDetailQuery = trpc.directory.hospital.useQuery({ id: id! }, { enabled: !!id });
  const mockHospital = getHospital(id);

  const hospital = useMemo(() => {
    if (hospitalDetailQuery.data) {
      const h = hospitalDetailQuery.data;
      return {
        id: h.id,
        name: h.name,
        type: h.type || "Multispecialty",
        address: h.address || "Bengaluru",
        city: h.city || "Bengaluru",
        rating: Number(h.rating) || 4.8,
        reviewCount: h.reviewCount || 120,
        bedCapacity: h.bedCapacity || 100,
        phone: h.phone || "+91-80000-00000",
        openHours: "Daily OPD 8:00 AM - 8:00 PM",
        ambulanceAvailable: Boolean(h.ambulanceAvailable),
        description: "Comprehensive multi-disciplinary care facility.",
        specialties: ["General Medicine", "Pediatrics", "Cardiology", "Orthopedics"],
        tests: ["X-Ray", "Blood Tests", "ECG", "Ultrasound"],
        image: mockHospital?.image || "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
      };
    }
    return mockHospital ?? {
      id: id || "hosp-default",
      name: "DocX Partner Hospital",
      type: "Multispecialty",
      address: "Bengaluru",
      city: "Bengaluru",
      rating: 4.8,
      reviewCount: 120,
      bedCapacity: 100,
      phone: "+91-80000-00000",
      openHours: "Daily OPD 8:00 AM - 8:00 PM",
      ambulanceAvailable: true,
      description: "Comprehensive multi-disciplinary care facility.",
      specialties: ["General Medicine", "Pediatrics", "Cardiology"],
      tests: ["X-Ray", "Blood Tests"],
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
    };
  }, [hospitalDetailQuery.data, mockHospital, id]);

  const liveVisitsQuery = trpc.visits.list.useQuery({ hospitalId: id });
  const seedVisits = id ? getVisitsForHospital(id) : [];

  const hospitalVisits = useMemo(() => {
    if (liveVisitsQuery.data && liveVisitsQuery.data.length > 0) {
      const dbFormatted = liveVisitsQuery.data.map((v) => {
        const d = new Date(v.startsAt);
        return {
          id: v.id,
          doctorId: v.doctorId,
          doctorName: (v as any).doctorName || getDoctor(v.doctorId)?.name || "Specialist",
          hospitalId: v.hospitalId,
          day: isNaN(d.getTime()) ? "Upcoming" : d.toLocaleDateString("en-IN", { weekday: "long" }),
          date: isNaN(d.getTime()) ? "Date TBD" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          time: isNaN(d.getTime()) ? "10:00 AM - 1:00 PM" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
          capacity: Number(v.capacity) || 15,
          booked: Number((v as any).bookedCount ?? v.booked) || 0,
          room: v.room || "Room 102",
          status: v.status || "Approved",
        };
      });
      const ids = new Set(dbFormatted.map((v) => v.id));
      return [...dbFormatted, ...seedVisits.filter((v) => !ids.has(v.id))];
    }
    return seedVisits;
  }, [liveVisitsQuery.data, seedVisits]);

  const hospitalDoctors = useMemo(() => {
    const fromMock = id ? getDoctorsForHospital(id) : [];
    const liveDocsMap = new Map<string, any>();
    if (liveVisitsQuery.data) {
      for (const v of liveVisitsQuery.data) {
        if (v.doctorId && (v as any).doctorName && !liveDocsMap.has(v.doctorId)) {
          const mDoc = getDoctor(v.doctorId);
          liveDocsMap.set(v.doctorId, {
            id: v.doctorId,
            name: (v as any).doctorName,
            specialty: (v as any).doctorSpecialty || mDoc?.specialty || "Specialist",
            department: mDoc?.department || "Outpatient Department",
            experienceYears: mDoc?.experienceYears || 8,
            rating: mDoc?.rating || 4.8,
            reviewCount: mDoc?.reviewCount || 100,
            fee: mDoc?.fee || 700,
            image: mDoc?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
            hospitalIds: [id || ""],
            bio: mDoc?.bio || "Verified Specialist practitioner.",
            verified: true,
          });
        }
      }
    }
    const combined = [...Array.from(liveDocsMap.values())];
    for (const d of fromMock) {
      if (!liveDocsMap.has(d.id)) {
        combined.push(d);
      }
    }
    return combined;
  }, [id, liveVisitsQuery.data]);

  return <AppLayout><div className="container py-9 sm:py-12"><Breadcrumbs items={[{ label: "Find care", href: "/hospitals" }, { label: hospital.name }]} /><section className="mt-8 overflow-hidden rounded-[30px] border border-[#dfe9e4] bg-white shadow-[0_15px_40px_rgba(26,61,52,0.06)]"><div className="relative h-64 sm:h-80"><img src={hospital.image} alt={hospital.name} className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0e302a]/75 via-[#0e302a]/15 to-transparent" /><div className="absolute bottom-6 left-6 right-6 flex flex-col gap-4 text-white sm:left-8 sm:right-8 sm:flex-row sm:items-end sm:justify-between"><div><TrustPill>{hospital.type} hospital</TrustPill><h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.05em] sm:text-5xl">{hospital.name}</h1><p className="mt-2 flex items-center gap-2 text-sm text-white/75"><MapPin size={15} /> {hospital.address}, {hospital.city}</p></div><Rating rating={hospital.rating} count={hospital.reviewCount} dark /></div></div><div className="grid gap-5 p-6 sm:grid-cols-4 sm:p-8"><InfoStat icon={<BedDouble size={18} />} label="Bed capacity" value={`${hospital.bedCapacity} beds`} /><InfoStat icon={<PhoneCall size={18} />} label="Contact" value={hospital.phone} /><InfoStat icon={<Clock3 size={18} />} label="Opening hours" value={hospital.openHours} /><InfoStat icon={<ShieldCheck size={18} />} label="Emergency" value={hospital.ambulanceAvailable ? "Ambulance available" : "Contact reception"} /></div></section><div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]"><div className="grid gap-8"><section className="rounded-[24px] border border-[#dfe9e4] bg-white p-6 sm:p-8"><SectionHeading eyebrow="About the centre" title="Care that covers the whole picture." body={hospital.description} /><div className="mt-7 grid gap-6 sm:grid-cols-2"><DetailList title="Specialties available" items={hospital.specialties} icon={<Stethoscope size={16} />} /><DetailList title="Tests & diagnostics" items={hospital.tests} icon={<FileText size={16} />} /></div></section><section><SectionHeading eyebrow="Visiting doctors" title="Meet the care team" body="Choose a doctor, see their next visit here, and book when you’re ready." /><div className="mt-6 grid gap-4 sm:grid-cols-2">{hospitalDoctors.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}</div></section></div><aside className="h-fit rounded-[24px] border border-[#dfe9e4] bg-[#f1f7f1] p-6 sm:p-7"><div className="flex items-center justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#9aa9a4]">At a glance</div><h2 className="mt-2 font-display text-2xl font-semibold tracking-[-0.04em]">Plan your visit</h2></div><span className="grid size-10 place-items-center rounded-2xl bg-white text-[#146b5a]"><MapPin size={18} /></span></div><div className="mt-6 rounded-2xl bg-white p-4"><div className="text-xs font-bold text-[#17342f]">Today's OPD availability</div><div className="mt-3 grid gap-3">{hospitalVisits.slice(0, 4).map((visit) => { const doctor = getDoctor(visit.doctorId); const doctorName = (visit as any).doctorName || doctor?.name || "Consultation with Specialist"; return <Link key={visit.id} href={`/appointment/book?doctor=${visit.doctorId}&hospital=${hospital.id}&visit=${visit.id}`} className="flex items-center justify-between gap-3 rounded-xl border border-[#edf2ef] p-3 transition hover:border-[#a9d9bd]"><div className="min-w-0"><div className="truncate text-xs font-bold text-[#17342f]">{doctorName}</div><div className="mt-1 text-[11px] text-[#78918a]">{visit.day}, {visit.date} · {visit.time}</div></div><ArrowRight size={15} className="shrink-0 text-[#146b5a]" /></Link>; })}</div></div><a href={`tel:${hospital.phone}`} className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-[#cbe2d2] py-3 text-xs font-bold text-[#146b5a]"><PhoneCall size={14} /> Call hospital</a><Link href={`/hospitals/${hospital.id}#doctors`} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#146b5a] py-3 text-xs font-bold text-white">Browse doctors <ArrowRight size={14} /></Link><div className="mt-5 flex items-start gap-2 text-[11px] leading-5 text-[#78918a]"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-[#146b5a]" /> Hospital information is provided by the care partner and may change.</div></aside></div></div></AppLayout>;
}

export function DoctorDetailPage({ id }: { id?: string }) {
  const doctorDetailQuery = trpc.directory.doctor.useQuery({ id: id! }, { enabled: !!id });
  const mockDoctor = getDoctor(id);

  const doctor = useMemo(() => {
    if (doctorDetailQuery.data) {
      const d = doctorDetailQuery.data;
      let parsedHospitalIds: string[] = [];
      try {
        parsedHospitalIds = Array.isArray(d.hospitalIds)
          ? d.hospitalIds
          : typeof d.hospitalIds === "string"
          ? JSON.parse(d.hospitalIds || "[]")
          : [];
      } catch {
        parsedHospitalIds = [];
      }
      return {
        id: d.id,
        name: d.name,
        specialty: d.specialty,
        department: d.department || "Outpatient Department (OPD)",
        experienceYears: d.experienceYears || 8,
        rating: Number(d.rating) || 4.8,
        reviewCount: d.reviewCount || 95,
        fee: Number(d.fee) || 700,
        image: mockDoctor?.image || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
        hospitalIds: parsedHospitalIds,
        bio: `Specialist at ${d.department || "DocX Partner Hospitals"}. Verified clinical practitioner.`,
        verified: Boolean(d.verified),
      };
    }
    return mockDoctor ?? {
      id: id || "doc-default",
      name: "Specialist Doctor",
      specialty: "General Medicine",
      department: "Outpatient Department",
      experienceYears: 8,
      rating: 4.8,
      reviewCount: 95,
      fee: 700,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
      hospitalIds: [],
      bio: "Verified DocX Specialist.",
      verified: true,
    };
  }, [doctorDetailQuery.data, mockDoctor, id]);

  const liveVisitsQuery = trpc.visits.list.useQuery({ doctorId: doctor.id });
  const seedVisits = id ? getVisitsForDoctor(id) : [];
  const doctorVisits = useMemo(() => {
    if (liveVisitsQuery.data && liveVisitsQuery.data.length > 0) {
      const dbFormatted = liveVisitsQuery.data.map((v) => {
        const d = new Date(v.startsAt);
        return {
          id: v.id,
          doctorId: v.doctorId,
          hospitalId: v.hospitalId,
          hospitalName: (v as any).hospitalName,
          day: isNaN(d.getTime()) ? "Upcoming" : d.toLocaleDateString("en-IN", { weekday: "long" }),
          date: isNaN(d.getTime()) ? "Date TBD" : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }),
          time: isNaN(d.getTime()) ? "10:00 AM - 1:00 PM" : d.toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }),
          capacity: Number(v.capacity) || 15,
          booked: Number((v as any).bookedCount ?? v.booked) || 0,
          room: v.room || "Room 102",
          status: v.status || "Approved",
        };
      });
      const ids = new Set(dbFormatted.map((v) => v.id));
      return [...dbFormatted, ...seedVisits.filter((v) => !ids.has(v.id))];
    }
    return seedVisits;
  }, [liveVisitsQuery.data, seedVisits]);

  const [selectedVisit, setSelectedVisit] = useState<string | undefined>(undefined);
  const activeVisitId = selectedVisit || doctorVisits[0]?.id;
  const activeVisit = doctorVisits.find((v) => v.id === activeVisitId);

  return <AppLayout><div className="container py-9 sm:py-12"><Breadcrumbs items={[{ label: "Find care", href: "/hospitals" }, { label: doctor.name }]} /><section className="mt-8 grid gap-6 lg:grid-cols-[0.76fr_1.24fr]"><div className="relative overflow-hidden rounded-[30px] bg-[#103e38] p-7 text-white sm:p-9"><div className="absolute -right-20 -top-16 size-64 rounded-full border-[32px] border-white/5" /><div className="relative"><div className="flex items-start justify-between gap-4"><div className="overflow-hidden rounded-[24px] border-4 border-white/15 bg-[#dcefe5]"><img src={doctor.image} alt={doctor.name} className="size-32 object-cover object-top sm:size-40" /></div><TrustPill><ShieldCheck size={12} /> License verified</TrustPill></div><div className="mt-8"><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#a9d9bd]">{doctor.department}</div><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">{doctor.name}</h1><p className="mt-3 max-w-md text-sm leading-6 text-white/65">{doctor.bio}</p></div><div className="mt-8 grid grid-cols-3 gap-3 border-t border-white/10 pt-6"><Metric label="Experience" value={`${doctor.experienceYears} yrs`} /><Metric label="Patient rating" value={`${doctor.rating}/5`} /><Metric label="Reviews" value={`${doctor.reviewCount}`} /></div></div></div><div className="rounded-[30px] border border-[#dfe9e4] bg-white p-6 sm:p-8"><div className="flex flex-col gap-4 border-b border-[#edf2ef] pb-6 sm:flex-row sm:items-end sm:justify-between"><div><div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]">Book a visit</div><h2 className="mt-2 font-display text-3xl font-semibold tracking-[-0.05em]">Choose where and when.</h2></div><div className="text-left sm:text-right"><div className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9aa9a4]">Consultation fee</div><div className="mt-1 text-xl font-bold text-[#17342f]">₹{doctor.fee.toLocaleString("en-IN")}</div></div></div><div className="mt-6 grid gap-3">{doctorVisits.map((visit) => { const hospitalName = (visit as any).hospitalName || getHospitalName(visit.hospitalId); const available = visit.capacity - visit.booked; return <button key={visit.id} onClick={() => setSelectedVisit(visit.id)} className={`flex w-full items-center justify-between gap-4 rounded-2xl border p-4 text-left transition ${activeVisitId === visit.id ? "border-[#146b5a] bg-[#f1f7f1] shadow-[0_0_0_3px_rgba(20,107,90,0.08)]" : "border-[#dfe9e4] hover:border-[#a9d9bd]"}`}><div className="flex items-center gap-3"><span className={`grid size-11 place-items-center rounded-xl ${activeVisitId === visit.id ? "bg-[#146b5a] text-white" : "bg-[#eaf3ed] text-[#146b5a]"}`}><Clock3 size={17} /></span><div><div className="text-sm font-bold text-[#17342f]">{visit.day}, {visit.date} · {visit.time}</div><div className="mt-1 text-xs text-[#78918a]">{hospitalName} · {available} slots left</div></div></div>{activeVisitId === visit.id && <Check size={18} className="text-[#146b5a]" />}</button>; })}</div><Link href={`/appointment/book?doctor=${encodeURIComponent(doctor.id)}&hospital=${encodeURIComponent(activeVisit?.hospitalId || doctor.hospitalIds[0] || "")}&visit=${encodeURIComponent(activeVisitId || "")}`} className="mt-6 flex items-center justify-center gap-2 rounded-2xl bg-[#146b5a] py-4 text-sm font-bold text-white transition hover:bg-[#0e4c42]">Continue to booking <ArrowRight size={15} /></Link><p className="mt-3 text-center text-[11px] font-medium text-[#9aa9a4]">Slots are based on hospital approval and per-day capacity.</p></div></section><section className="mt-10 grid gap-5 md:grid-cols-3"><DetailList title="Specialty" items={[doctor.specialty, doctor.department]} icon={<Stethoscope size={16} />} /><DetailList title="Affiliated hospitals" items={doctor.hospitalIds.map((hospitalId) => getHospitalName(hospitalId))} icon={<HeartPulse size={16} />} /><DetailList title="Good to know" items={["Cashless consultation not available in MVP", "Reminder call coming soon", "Reschedule before visit"]} icon={<ShieldCheck size={16} />} /></section></div></AppLayout>;
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) { return <label className="grid gap-2"><span className="text-xs font-bold text-[#50635e]">{label}</span><span className="relative"><select value={value} onChange={(e) => onChange(e.target.value)} className="w-full appearance-none rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-3 pr-8 text-xs font-semibold text-[#50635e] outline-none focus:border-[#86b99e]"><option value="">Select</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select><ChevronDown size={14} className="pointer-events-none absolute right-3 top-3.5 text-[#78918a]" /></span></label>; }
function InfoStat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="flex items-center gap-3"><span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#eaf3ed] text-[#146b5a]">{icon}</span><div className="min-w-0"><div className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a1afa9]">{label}</div><div className="mt-1 truncate text-xs font-bold text-[#17342f]">{value}</div></div></div>; }
function DetailList({ title, items, icon }: { title: string; items: string[]; icon: React.ReactNode }) { return <div className="rounded-[22px] border border-[#dfe9e4] bg-white p-5"><div className="flex items-center gap-2 text-sm font-bold text-[#17342f]"><span className="grid size-8 place-items-center rounded-lg bg-[#eaf3ed] text-[#146b5a]">{icon}</span>{title}</div><div className="mt-4 grid gap-2">{items.map((item) => <div key={item} className="flex items-start gap-2 text-xs font-semibold leading-5 text-[#78918a]"><Check size={13} className="mt-1 shrink-0 text-[#3b9a6d]" />{item}</div>)}</div></div>; }
function Metric({ label, value }: { label: string; value: string }) { return <div><div className="font-display text-2xl font-semibold tracking-[-0.05em]">{value}</div><div className="mt-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white/45">{label}</div></div>; }
