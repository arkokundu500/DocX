import { importedDoctors, importedHospitals, importedVisits } from "./demo-data";

export type Hospital = {
  id: string;
  name: string;
  type: "Private" | "Public";
  address: string;
  city: string;
  rating: number;
  reviewCount: number;
  ambulanceAvailable: boolean;
  bedCapacity: number;
  specialties: string[];
  tests: string[];
  image: string;
  accent: string;
  description: string;
  phone: string;
  openHours: string;
};

export type Doctor = {
  id: string;
  name: string;
  specialty: string;
  department: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  fee: number;
  image: string;
  hospitalIds: string[];
  bio: string;
  nextAvailable: string;
  verified: boolean;
};

export type Visit = {
  id: string;
  doctorId: string;
  hospitalId: string;
  date: string;
  day: string;
  time: string;
  capacity: number;
  booked: number;
  status: "Approved" | "Pending";
};

const featuredHospitals: Hospital[] = [
  {
    id: "apollo-green",
    name: "Apollo Green Hospital",
    type: "Private",
    address: "14 Residency Road, Ashok Nagar",
    city: "Bengaluru",
    rating: 4.8,
    reviewCount: 1284,
    ambulanceAvailable: true,
    bedCapacity: 420,
    specialties: ["Cardiology", "Orthopedics", "Neurology", "General Care"],
    tests: ["Blood test", "Urine test", "Sugar test", "MRI", "CT scan"],
    image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=85",
    accent: "#146b5a",
    description: "A multi-specialty centre known for coordinated care, quiet wards, and senior consultants across 18 departments.",
    phone: "+91 80 4567 8900",
    openHours: "Open 24 hours",
  },
  {
    id: "manipal-heritage",
    name: "Manipal Heritage Centre",
    type: "Private",
    address: "98 HAL Airport Road, Kodihalli",
    city: "Bengaluru",
    rating: 4.7,
    reviewCount: 943,
    ambulanceAvailable: true,
    bedCapacity: 310,
    specialties: ["Oncology", "Cardiology", "Gastroenterology", "Pediatrics"],
    tests: ["Blood test", "Sugar test", "Ultrasound", "Mammography"],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=85",
    accent: "#b8443e",
    description: "A modern care campus bringing advanced diagnostics and human-first treatment together under one roof.",
    phone: "+91 80 4747 1212",
    openHours: "Open 24 hours",
  },
  {
    id: "st-marthas",
    name: "St. Martha's Medical Centre",
    type: "Public",
    address: "5 Nrupathunga Road, Sampangi Rama Nagar",
    city: "Bengaluru",
    rating: 4.5,
    reviewCount: 671,
    ambulanceAvailable: true,
    bedCapacity: 560,
    specialties: ["General Care", "Maternity", "Orthopedics", "ENT"],
    tests: ["Blood test", "Urine test", "Sugar test", "X-ray"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=85",
    accent: "#356a55",
    description: "A trusted public hospital with accessible OPD services, experienced nursing teams, and 24/7 emergency support.",
    phone: "+91 80 2212 1111",
    openHours: "Open 24 hours",
  },
];

export const hospitals: Hospital[] = [...featuredHospitals, ...importedHospitals.map((hospital) => ({ ...hospital, specialties: [...hospital.specialties], tests: [...hospital.tests] }))];

const featuredDoctors: Doctor[] = [
  {
    id: "ananya-rao",
    name: "Dr. Ananya Rao",
    specialty: "Orthopedic surgeon",
    department: "Orthopedics & Joint Care",
    experienceYears: 14,
    rating: 4.9,
    reviewCount: 286,
    fee: 1800,
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["apollo-green", "st-marthas"],
    bio: "Dr. Rao helps people return to confident movement with evidence-led joint care and an unhurried consultation style.",
    nextAvailable: "Today, 4:30 PM",
    verified: true,
  },
  {
    id: "vivek-menon",
    name: "Dr. Vivek Menon",
    specialty: "Cardiologist",
    department: "Heart & Vascular Care",
    experienceYears: 18,
    rating: 4.8,
    reviewCount: 421,
    fee: 2400,
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["apollo-green", "manipal-heritage"],
    bio: "A preventive cardiologist focused on making heart health simpler to understand and easier to act on.",
    nextAvailable: "Tomorrow, 10:00 AM",
    verified: true,
  },
  {
    id: "meera-iyer",
    name: "Dr. Meera Iyer",
    specialty: "Neurologist",
    department: "Brain & Spine Care",
    experienceYears: 11,
    rating: 4.7,
    reviewCount: 198,
    fee: 2200,
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["apollo-green"],
    bio: "Dr. Iyer brings a calm, structured approach to headaches, nerve conditions, and long-term neurological care.",
    nextAvailable: "Wed, 11:30 AM",
    verified: true,
  },
  {
    id: "rohan-shah",
    name: "Dr. Rohan Shah",
    specialty: "Gastroenterologist",
    department: "Digestive Health",
    experienceYears: 9,
    rating: 4.8,
    reviewCount: 153,
    fee: 1600,
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["manipal-heritage"],
    bio: "A patient-first gastroenterologist helping people build sustainable routines around digestive health.",
    nextAvailable: "Fri, 2:00 PM",
    verified: true,
  },
  {
    id: "sana-khan",
    name: "Dr. Sana Khan",
    specialty: "Pediatrician",
    department: "Child Wellness",
    experienceYears: 12,
    rating: 4.9,
    reviewCount: 319,
    fee: 1400,
    image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["manipal-heritage", "st-marthas"],
    bio: "Dr. Khan partners with families through every stage of childhood with practical advice and a warm bedside manner.",
    nextAvailable: "Today, 6:00 PM",
    verified: true,
  },
  {
    id: "arjun-bhat",
    name: "Dr. Arjun Bhat",
    specialty: "General physician",
    department: "General Care",
    experienceYears: 16,
    rating: 4.6,
    reviewCount: 244,
    fee: 900,
    image: "https://images.unsplash.com/photo-1618498082410-b4aa22193b38?auto=format&fit=crop&w=480&q=85",
    hospitalIds: ["st-marthas"],
    bio: "A trusted first point of contact for everyday health concerns, checkups, and thoughtful referrals.",
    nextAvailable: "Today, 3:00 PM",
    verified: true,
  },
];

export const doctors: Doctor[] = [...featuredDoctors, ...importedDoctors.map((doctor) => ({ ...doctor, hospitalIds: [...doctor.hospitalIds] }))];

const featuredVisits: Visit[] = [
  { id: "v1", doctorId: "ananya-rao", hospitalId: "apollo-green", date: "20 Sep", day: "Sun", time: "11:00 AM", capacity: 20, booked: 12, status: "Approved" },
  { id: "v2", doctorId: "ananya-rao", hospitalId: "st-marthas", date: "21 Sep", day: "Mon", time: "10:00 AM", capacity: 18, booked: 9, status: "Approved" },
  { id: "v3", doctorId: "ananya-rao", hospitalId: "apollo-green", date: "22 Sep", day: "Tue", time: "4:30 PM", capacity: 20, booked: 4, status: "Approved" },
  { id: "v4", doctorId: "vivek-menon", hospitalId: "manipal-heritage", date: "23 Sep", day: "Wed", time: "10:00 AM", capacity: 16, booked: 8, status: "Approved" },
  { id: "v5", doctorId: "vivek-menon", hospitalId: "apollo-green", date: "24 Sep", day: "Thu", time: "2:00 PM", capacity: 20, booked: 15, status: "Approved" },
  { id: "v6", doctorId: "meera-iyer", hospitalId: "apollo-green", date: "25 Sep", day: "Fri", time: "11:30 AM", capacity: 14, booked: 5, status: "Approved" },
  { id: "v7", doctorId: "rohan-shah", hospitalId: "manipal-heritage", date: "26 Sep", day: "Sat", time: "2:00 PM", capacity: 18, booked: 5, status: "Approved" },
  { id: "v8", doctorId: "sana-khan", hospitalId: "st-marthas", date: "27 Sep", day: "Sun", time: "6:00 PM", capacity: 20, booked: 11, status: "Approved" },
  { id: "v9", doctorId: "arjun-bhat", hospitalId: "st-marthas", date: "28 Sep", day: "Mon", time: "3:00 PM", capacity: 24, booked: 15, status: "Approved" },
];

export const visits: Visit[] = [...featuredVisits, ...importedVisits];

export const testimonials = [
  { quote: "The reminder call made such a difference. I could focus on my mother instead of remembering another date.", name: "Priya S.", meta: "Apollo Green patient", initials: "PS" },
  { quote: "Finally a hospital search that shows the details I actually need before I leave home.", name: "Rajiv K.", meta: "Bengaluru resident", initials: "RK" },
  { quote: "I booked my father’s appointment in under three minutes. The time slot and fee were both clear.", name: "Nandita M.", meta: "St. Martha's patient", initials: "NM" },
];

export const upcomingAppointment = {
  id: "DX-28419",
  doctorId: "ananya-rao",
  hospitalId: "apollo-green",
  date: "22 September 2026",
  time: "4:30 PM",
  reason: "Lower back pain for the last two weeks",
  status: "Confirmed",
};

export const priceBands = [
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,000", min: 2000, max: 3000 },
  { label: "₹3,000 – ₹4,000", min: 3000, max: 4000 },
  { label: "₹4,000 – ₹5,000", min: 4000, max: 5000 },
  { label: "₹5,000+", min: 5000, max: 20000 },
];

export function getHospital(id?: string) {
  if (!id) return undefined;
  return hospitals.find((hospital) => hospital.id === id);
}

export function getDoctor(id?: string) {
  if (!id) return undefined;
  return doctors.find((doctor) => doctor.id === id);
}

export function getVisitsForDoctor(doctorId: string) {
  return visits.filter((visit) => visit.doctorId === doctorId);
}

export function getVisitsForHospital(hospitalId: string) {
  return visits.filter((visit) => visit.hospitalId === hospitalId);
}

export function getDoctorsForHospital(hospitalId: string) {
  return doctors.filter((doctor) => doctor.hospitalIds.includes(hospitalId));
}

export function getHospitalName(id?: string) {
  if (!id) return "DocX Partner Hospital";
  return hospitals.find((h) => h.id === id)?.name || "DocX Partner Hospital";
}

export function getDoctorName(id?: string) {
  if (!id) return "Specialist Doctor";
  return doctors.find((d) => d.id === id)?.name || "Specialist Doctor";
}

export const envKeys = [
  "NEXT_PUBLIC_APP_URL",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "DATABASE_URL",
  "DIRECT_URL",
  "REDIS_URL",
  "RESEND_API_KEY",
  "RESEND_FROM_EMAIL",
  "OPENROUTER_API_KEY",
  "OPENROUTER_MODEL",
  "LANGCHAIN_API_KEY",
  "LANGCHAIN_PROJECT",
  "LANGSMITH_TRACING",
  "N8N_WEBHOOK_URL",
  "VAPI_API_KEY",
  "VAPI_ASSISTANT_ID",
  "VAPI_PHONE_NUMBER_ID",
  "GOOGLE_MAPS_API_KEY",
  "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY",
];

export const specialties = ["All specialties", "Cardiology", "Orthopedics", "Neurology", "General Care", "Oncology", "Pediatrics", "Gastroenterology"];
