import { useMemo, useState } from "react";
import { Link, useSearch } from "wouter";
import { ArrowRight, Check, Filter, HeartPulse, Search, ShieldCheck, Star, Stethoscope, UsersRound } from "lucide-react";
import { AppLayout, AssistantCard, Breadcrumbs, DoctorCard, Rating, TrustPill } from "@/components/DocxShell";
import { FilterSelect } from "./DirectoryPages";
import { doctors, hospitals, priceBands, specialties } from "@/lib/mock-data";

const experienceBands = [
  { label: "Any experience", min: 0 },
  { label: "5+ years", min: 5 },
  { label: "10+ years", min: 10 },
  { label: "15+ years", min: 15 },
  { label: "20+ years", min: 20 },
];

export default function DoctorsPage() {
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
  const [minExp, setMinExp] = useState("Any experience");
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(() => {
    return doctors.filter((doc) => {
      const hospitalNames = doc.hospitalIds
        .map((hId) => hospitals.find((h) => h.id === hId)?.name || "")
        .join(" ");
      const text = `${doc.name} ${doc.specialty} ${doc.department} ${hospitalNames} ${doc.bio}`.toLowerCase();
      const matchesSearch = !search || text.includes(search.toLowerCase());
      const matchesSpecialty =
        specialty === "All specialties" || doc.specialty.toLowerCase() === specialty.toLowerCase();
      const matchesRating = minRating === "Any rating" || doc.rating >= Number(minRating);

      const band = priceBands.find((item) => item.label === priceBand);
      const matchesPrice = !band || (doc.fee >= band.min && doc.fee <= band.max);

      const expBand = experienceBands.find((item) => item.label === minExp);
      const matchesExp = !expBand || doc.experienceYears >= expBand.min;

      return matchesSearch && matchesSpecialty && matchesRating && matchesPrice && matchesExp;
    });
  }, [doctors, hospitals, minExp, minRating, priceBand, search, specialty]);

  const resetFilters = () => {
    setSearch("");
    setSpecialty("All specialties");
    setMinRating("Any rating");
    setPriceBand("Any fee");
    setMinExp("Any experience");
  };

  return (
    <AppLayout>
      <div className="container py-9 sm:py-12">
        <Breadcrumbs items={[{ label: "Find Doc" }]} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar Filters */}
          <aside
            className={`h-fit rounded-[26px] border border-[#dfe9e4] bg-white p-6 shadow-[0_10px_30px_rgba(26,61,52,0.04)] ${
              mobileFilters ? "block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-4">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-lg bg-[#eaf3ed] text-[#146b5a]">
                  <Filter size={15} />
                </span>
                <h2 className="font-display text-lg font-semibold tracking-[-0.03em] text-[#17342f]">
                  Filter Doctors
                </h2>
              </div>
              <button
                type="button"
                onClick={resetFilters}
                className="text-xs font-bold text-[#b8443e] hover:underline cursor-pointer"
              >
                Reset
              </button>
            </div>

            <div className="mt-5 grid gap-5">
              <FilterSelect
                label="Medical Specialty"
                value={specialty}
                onChange={setSpecialty}
                options={specialties}
              />
              <FilterSelect
                label="Minimum Rating"
                value={minRating}
                onChange={setMinRating}
                options={["Any rating", "4.8+", "4.5+", "4.0+"]}
              />
              <FilterSelect
                label="Consultation Fee"
                value={priceBand}
                onChange={setPriceBand}
                options={["Any fee", ...priceBands.map((item) => item.label)]}
              />
              <FilterSelect
                label="Experience"
                value={minExp}
                onChange={setMinExp}
                options={experienceBands.map((b) => b.label)}
              />
            </div>
          </aside>

          {/* Main Content */}
          <main>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#146b5a]">
                  <span className="size-1.5 rounded-full bg-[#146b5a]" />
                  Verified Specialists Directory
                </div>
                <h1 className="mt-2 font-display text-4xl font-semibold tracking-[-0.06em] text-[#17342f] sm:text-5xl">
                  Find the doctor that fits.
                </h1>
                <p className="mt-2.5 max-w-xl text-sm leading-6 text-[#78918a]">
                  Consult trusted doctors with verified hospital privileges across Bengaluru. View real-time visit slots, consultation fees, and patient reviews.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setMobileFilters(!mobileFilters)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#dfe9e4] bg-white px-5 text-xs font-bold text-[#50635e] shadow-xs lg:hidden cursor-pointer"
              >
                <Filter size={15} />
                {mobileFilters ? "Hide Filters" : "Filter Doctors"}
              </button>
            </div>

            {/* Search and Counts */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <div className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-[#dfe9e4] bg-white px-4 py-3.5 shadow-[0_8px_24px_rgba(26,61,52,0.03)] focus-within:border-[#146b5a]">
                <Search size={17} className="text-[#78918a] shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-[#9aa9a4]"
                  placeholder="Search by doctor name, specialty, department, or hospital..."
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="text-xs font-bold text-[#8fa19b] hover:text-[#17342f]"
                  >
                    Clear
                  </button>
                )}
              </div>

              <div className="inline-flex items-center gap-2 rounded-2xl border border-[#dfe9e4] bg-[#eaf3ed] px-4 py-3.5 text-xs font-bold text-[#146b5a] shrink-0">
                <span className="size-2 rounded-full bg-[#3b9a6d]" />
                {filtered.length} doctors available
              </div>
            </div>

            {/* Doctor Grid */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            {/* Empty State */}
            {filtered.length === 0 && (
              <div className="mt-8 rounded-[26px] border border-dashed border-[#bdd4c6] bg-[#f3f7f3] p-12 text-center">
                <HeartPulse className="mx-auto text-[#146b5a]" size={36} />
                <h2 className="mt-4 font-display text-2xl font-semibold text-[#17342f]">
                  No matching doctors found
                </h2>
                <p className="mt-2 text-sm text-[#78918a] max-w-md mx-auto">
                  Try adjusting your search terms, choosing a broader specialty, or resetting the fee filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#146b5a] px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0e4c42] cursor-pointer"
                >
                  Reset all filters
                </button>
              </div>
            )}

            <div className="mt-12">
              <AssistantCard compact />
            </div>
          </main>
        </div>
      </div>
    </AppLayout>
  );
}
