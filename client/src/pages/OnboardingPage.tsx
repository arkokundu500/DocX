import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { roleHome } from "@/lib/roles";
import { hospitals } from "@/lib/mock-data";
import { Logo } from "@/components/DocxShell";
import { 
  Building2, 
  Stethoscope, 
  UserRound, 
  Shield, 
  Check, 
  ArrowRight, 
  Sparkles, 
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  HeartPulse,
  Award,
  DollarSign,
  Briefcase
} from "lucide-react";

type RoleType = "user" | "hospital_authority" | "doctor" | "admin";

export default function OnboardingPage() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const utils = trpc.useUtils();

  // Pre-fill from Google / Clerk session
  const defaultName = user?.name || "";
  const defaultEmail = user?.email || "";
  const isSpecialAdmin = Boolean(defaultEmail.toLowerCase() === "arkokundu500@gmail.com");

  const [selectedRole, setSelectedRole] = useState<RoleType>(isSpecialAdmin ? "admin" : "user");
  const [showAdminKey, setShowAdminKey] = useState(isSpecialAdmin);

  // Common fields
  const [name, setName] = useState(defaultName);
  const [phone, setPhone] = useState(user?.phone || "");
  const [city, setCity] = useState(user?.city || "Bengaluru");

  // Patient fields
  const [age, setAge] = useState<number | undefined>(user?.age || 28);
  const [gender, setGender] = useState(user?.gender || "Male");
  const [bloodGroup, setBloodGroup] = useState(user?.bloodGroup || "O+");
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || "");
  const [medicalNotes, setMedicalNotes] = useState(user?.medicalNotes || "");

  // Hospital Authority fields
  const [designation, setDesignation] = useState(user?.designation || "Medical Administrator");
  const [hospitalId, setHospitalId] = useState(user?.hospitalId || hospitals[0]?.id || "apollo-green");
  const [hospitalName, setHospitalName] = useState(user?.hospitalName || hospitals[0]?.name || "Apollo Green Hospital");
  const [isNewHospital, setIsNewHospital] = useState(false);
  const [newHospitalAddress, setNewHospitalAddress] = useState("");
  const [newHospitalCity, setNewHospitalCity] = useState("Bengaluru");

  // Doctor fields
  const [specialty, setSpecialty] = useState(user?.specialty || "General Medicine");
  const [licenseNumber, setLicenseNumber] = useState(user?.licenseNumber || "");
  const [experienceYears, setExperienceYears] = useState<number>(user?.experienceYears || 8);
  const [consultationFee, setConsultationFee] = useState<number>(user?.consultationFee || 700);
  const [department, setDepartment] = useState("Outpatient Department (OPD)");

  // Admin key
  const [adminSecretKey, setAdminSecretKey] = useState("");

  // Feedback states
  const [errorMsg, setErrorMsg] = useState("");
  const completeOnboarding = trpc.auth.completeOnboarding.useMutation();

  // Twilio Phone OTP Verification states
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [otpMsg, setOtpMsg] = useState("");
  const [otpErr, setOtpErr] = useState("");

  const sendOtpMutation = trpc.twilio.sendOtp.useMutation();
  const verifyOtpMutation = trpc.twilio.verifyOtp.useMutation();

  const handleSendOtp = async () => {
    setOtpErr("");
    setOtpMsg("");
    if (!phone || phone.trim().length < 7) {
      setOtpErr("Please enter a valid phone number before requesting OTP.");
      return;
    }
    try {
      const res = await sendOtpMutation.mutateAsync({ phone: phone.trim() });
      setOtpSent(true);
      if (res.isTrialNotice) {
        setOtpMsg(res.trialNotice || "Twilio Trial Mode: Recipient number unverified in console. Use test OTP: 424242");
        setOtpCode("424242");
      } else {
        setOtpMsg("OTP code sent to your phone via Twilio SMS!");
      }
    } catch (err: any) {
      setOtpErr(err.message || "Failed to send OTP via Twilio SMS.");
    }
  };

  const handleVerifyOtp = async () => {
    setOtpErr("");
    setOtpMsg("");
    if (!otpCode || otpCode.trim().length !== 6) {
      setOtpErr("Please enter the 6-digit OTP code received.");
      return;
    }
    try {
      const res = await verifyOtpMutation.mutateAsync({ phone: phone.trim(), code: otpCode.trim() });
      if (res.approved) {
        setPhoneVerified(true);
        setOtpMsg("Phone number verified successfully via Twilio!");
      } else {
        setOtpErr("Invalid OTP code. Please check and try again.");
      }
    } catch (err: any) {
      setOtpErr(err.message || "Failed to verify OTP.");
    }
  };

  const handleHospitalSelect = (id: string) => {
    setHospitalId(id);
    const found = hospitals.find((h) => h.id === id);
    if (found) setHospitalName(found.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!phone.trim()) {
      setErrorMsg("Please enter a valid phone number for notifications and reminders.");
      return;
    }

    try {
      const res = await completeOnboarding.mutateAsync({
        role: selectedRole,
        name: name.trim(),
        phone: phone.trim(),
        city: city.trim(),
        // Patient details
        age: selectedRole === "user" ? Number(age) || undefined : undefined,
        gender: selectedRole === "user" ? gender : undefined,
        bloodGroup: selectedRole === "user" ? bloodGroup : undefined,
        emergencyContact: selectedRole === "user" ? emergencyContact.trim() : undefined,
        medicalNotes: selectedRole === "user" ? medicalNotes.trim() : undefined,
        // Hospital details
        designation: selectedRole === "hospital_authority" ? designation.trim() : undefined,
        hospitalId: selectedRole === "hospital_authority" || selectedRole === "doctor" ? hospitalId : undefined,
        hospitalName: selectedRole === "hospital_authority" ? hospitalName.trim() : undefined,
        newHospitalAddress: selectedRole === "hospital_authority" && isNewHospital ? newHospitalAddress.trim() : undefined,
        newHospitalCity: selectedRole === "hospital_authority" && isNewHospital ? newHospitalCity.trim() : undefined,
        // Doctor details
        specialty: selectedRole === "doctor" ? specialty.trim() : undefined,
        licenseNumber: selectedRole === "doctor" ? licenseNumber.trim() : undefined,
        experienceYears: selectedRole === "doctor" ? Number(experienceYears) || 0 : undefined,
        consultationFee: selectedRole === "doctor" ? Number(consultationFee) || 500 : undefined,
        department: selectedRole === "doctor" ? department.trim() : undefined,
        // Admin
        adminSecretKey: selectedRole === "admin" ? adminSecretKey.trim() : undefined,
      });

      // Invalidate session cache to refresh user role and profile in React
      await utils.auth.me.invalidate();

      // Navigate to the newly assigned role dashboard
      navigate(roleHome(res.role), { replace: true });
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save profile. Please check your details and try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbfaf6] text-[#17342f]">
      {/* Header */}
      <header className="border-b border-[#dfe9e4] bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-3 text-xs font-semibold text-[#78918a]">
            <span>Signed in as <strong className="text-[#17342f]">{defaultEmail || defaultName}</strong></span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dcefe5] text-[#146b5a] text-xs font-bold tracking-wide uppercase">
            <Sparkles size={13} /> Complete Your DocX Profile
          </span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#17342f]">
            Welcome to DocX. Tell us who you are.
          </h1>
          <p className="mt-2 text-sm text-[#78918a] max-w-lg mx-auto">
            DocX personalizes your workspace based on your role. Select your account type and fill in your details to get started.
          </p>
        </div>

        {errorMsg && (
          <div className="mt-6 flex items-center gap-2.5 p-4 rounded-2xl bg-[#fdf0ed] border border-[#f5c6cb] text-[#b8443e] text-xs font-semibold">
            <AlertCircle size={17} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* STEP 1: Select Role */}
          <section className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#dfe9e4] shadow-[0_10px_30px_rgba(26,61,52,0.04)]">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#b8443e]">Step 1: Choose Your Role</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {/* Patient Card */}
              <button
                type="button"
                onClick={() => setSelectedRole("user")}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  selectedRole === "user"
                    ? "border-[#146b5a] bg-[#f1f7f1] ring-2 ring-[#146b5a]/20"
                    : "border-[#dfe9e4] bg-[#fbfaf6] hover:border-[#a9d9bd]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-xl ${selectedRole === "user" ? "bg-[#146b5a] text-white" : "bg-white text-[#146b5a]"}`}>
                    <UserRound size={19} />
                  </span>
                  {selectedRole === "user" && <Check size={18} className="text-[#146b5a]" />}
                </div>
                <div className="mt-3 font-display font-semibold text-base text-[#17342f]">Patient</div>
                <p className="mt-1 text-xs text-[#78918a] leading-relaxed">
                  Search hospitals, discover top doctors, and book OPD appointments.
                </p>
              </button>

              {/* Hospital Authority Card */}
              <button
                type="button"
                onClick={() => setSelectedRole("hospital_authority")}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  selectedRole === "hospital_authority"
                    ? "border-[#146b5a] bg-[#f1f7f1] ring-2 ring-[#146b5a]/20"
                    : "border-[#dfe9e4] bg-[#fbfaf6] hover:border-[#a9d9bd]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-xl ${selectedRole === "hospital_authority" ? "bg-[#146b5a] text-white" : "bg-white text-[#146b5a]"}`}>
                    <Building2 size={19} />
                  </span>
                  {selectedRole === "hospital_authority" && <Check size={18} className="text-[#146b5a]" />}
                </div>
                <div className="mt-3 font-display font-semibold text-base text-[#17342f]">Hospital Authority</div>
                <p className="mt-1 text-xs text-[#78918a] leading-relaxed">
                  Manage hospital capacity, OPD visits, and doctor schedules.
                </p>
              </button>

              {/* Doctor Card */}
              <button
                type="button"
                onClick={() => setSelectedRole("doctor")}
                className={`p-5 rounded-2xl text-left border transition-all ${
                  selectedRole === "doctor"
                    ? "border-[#146b5a] bg-[#f1f7f1] ring-2 ring-[#146b5a]/20"
                    : "border-[#dfe9e4] bg-[#fbfaf6] hover:border-[#a9d9bd]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid size-10 place-items-center rounded-xl ${selectedRole === "doctor" ? "bg-[#146b5a] text-white" : "bg-white text-[#146b5a]"}`}>
                    <Stethoscope size={19} />
                  </span>
                  {selectedRole === "doctor" && <Check size={18} className="text-[#146b5a]" />}
                </div>
                <div className="mt-3 font-display font-semibold text-base text-[#17342f]">Doctor / Specialist</div>
                <p className="mt-1 text-xs text-[#78918a] leading-relaxed">
                  View scheduled patient visits, consultation slots, and hospital OPDs.
                </p>
              </button>
            </div>

            {/* Admin option toggle */}
            <div className="mt-4 pt-3 border-t border-[#edf2ef] flex items-center justify-between text-xs">
              <span className="text-[#78918a]">Are you a platform central administrator?</span>
              <button
                type="button"
                onClick={() => {
                  setShowAdminKey(!showAdminKey);
                  if (!showAdminKey) setSelectedRole("admin");
                  else setSelectedRole("user");
                }}
                className="font-bold text-[#146b5a] hover:underline"
              >
                {showAdminKey ? "Cancel Admin Setup" : "DocX Central Admin Setup"}
              </button>
            </div>

            {showAdminKey && (
              <div className="mt-3 p-4 rounded-2xl bg-[#fdf7ee] border border-[#f3e3ca] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#8b6a32]">
                  <Shield size={16} /> Admin Verification Required
                </div>
                <p className="text-[#96743c] leading-relaxed">
                  The admin role is restricted to <strong>arkokundu500@gmail.com</strong> or requires the administrator security passkey.
                </p>
                <input
                  type="password"
                  value={adminSecretKey}
                  onChange={(e) => setAdminSecretKey(e.target.value)}
                  placeholder="Enter Admin Passkey (e.g. Arko@#12345)"
                  className="w-full mt-2 px-3.5 py-2.5 rounded-xl border border-[#e8d2b3] bg-white text-xs text-[#17342f] outline-none"
                />
              </div>
            )}
          </section>

          {/* STEP 2: Basic & Profile Details */}
          <section className="bg-white p-6 sm:p-8 rounded-[28px] border border-[#dfe9e4] shadow-[0_10px_30px_rgba(26,61,52,0.04)] space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.14em] text-[#b8443e]">
              Step 2: {selectedRole === "user" ? "Patient Information" : selectedRole === "hospital_authority" ? "Hospital Authority Information" : selectedRole === "doctor" ? "Doctor Credentials" : "Admin Profile"}
            </h2>

            {/* Common Details */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs font-bold text-[#50635e]">Full Name</label>
                <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                  <UserRound size={16} className="text-[#78918a]" />
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Jane Doe or Jane Doe"
                    className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#50635e]">
                    Phone Number <span className="text-[#b8443e]">*</span>
                  </label>
                  {phoneVerified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#146b5a] bg-[#eaf3ed] px-2 py-0.5 rounded-full">
                      <Check size={12} /> Twilio Verified
                    </span>
                  ) : (
                    <button
                      type="button"
                      disabled={sendOtpMutation.isPending}
                      onClick={handleSendOtp}
                      className="text-[11px] font-bold text-[#146b5a] hover:underline"
                    >
                      {sendOtpMutation.isPending ? "Sending OTP..." : "Verify with Twilio SMS"}
                    </button>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                  <Phone size={16} className="text-[#78918a]" />
                  <input
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (phoneVerified) setPhoneVerified(false);
                    }}
                    placeholder="e.g. 7439817750 or +917439817750"
                    className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                  />
                </div>
                {otpMsg && <p className="mt-1 text-[11px] font-semibold text-[#146b5a]">{otpMsg}</p>}
                {otpErr && <p className="mt-1 text-[11px] font-semibold text-[#b8443e]">{otpErr}</p>}

                {/* Inline OTP input when OTP is sent */}
                {otpSent && !phoneVerified && (
                  <div className="mt-2.5 flex items-center gap-2 p-2.5 rounded-xl bg-[#f4faf7] border border-[#d2e5db]">
                    <input
                      type="text"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ""))}
                      placeholder="6-digit OTP"
                      className="w-28 text-center font-mono text-xs font-bold px-2 py-1.5 rounded-lg border border-[#c1ded1] bg-white outline-none"
                    />
                    <button
                      type="button"
                      disabled={verifyOtpMutation.isPending}
                      onClick={handleVerifyOtp}
                      className="rounded-lg bg-[#146b5a] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#0e4c42]"
                    >
                      {verifyOtpMutation.isPending ? "Checking..." : "Confirm Code"}
                    </button>
                  </div>
                )}
                <span className="text-[10px] text-[#78918a] mt-1 block">Used for appointment confirmations & Twilio voice reminders.</span>
              </div>

              <div>
                <label className="text-xs font-bold text-[#50635e]">City / Region</label>
                <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                  <MapPin size={16} className="text-[#78918a]" />
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bengaluru or Kolkata"
                    className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#50635e]">Email (Verified)</label>
                <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#f4f7f5] text-[#78918a]">
                  <Mail size={16} />
                  <input
                    disabled
                    value={defaultEmail}
                    className="w-full bg-transparent text-xs font-semibold text-[#78918a] outline-none cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* ROLE-SPECIFIC FIELDS */}
            {/* 1. Patient Fields */}
            {selectedRole === "user" && (
              <div className="border-t border-[#edf2ef] pt-5 space-y-4">
                <div className="text-xs font-bold text-[#17342f]">Medical & Health Profile</div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Age</label>
                    <input
                      type="number"
                      value={age || ""}
                      onChange={(e) => setAge(Number(e.target.value) || undefined)}
                      placeholder="e.g. 34"
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Blood Group</label>
                    <select
                      value={bloodGroup}
                      onChange={(e) => setBloodGroup(e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    >
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#50635e]">Emergency Contact (Name & Number)</label>
                  <input
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                    placeholder="e.g. Priya Kundu (+919876543210)"
                    className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#50635e]">Pre-existing Medical Conditions / Notes</label>
                  <textarea
                    rows={3}
                    value={medicalNotes}
                    onChange={(e) => setMedicalNotes(e.target.value)}
                    placeholder="e.g. Hypertension, penicillin allergy, asthma, previous orthopedic surgery..."
                    className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none resize-none"
                  />
                </div>
              </div>
            )}

            {/* 2. Hospital Authority Fields */}
            {selectedRole === "hospital_authority" && (
              <div className="border-t border-[#edf2ef] pt-5 space-y-4">
                <div className="text-xs font-bold text-[#17342f]">Hospital & Designation Details</div>
                
                <div>
                  <label className="text-xs font-bold text-[#50635e]">Official Designation</label>
                  <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                    <Briefcase size={16} className="text-[#78918a]" />
                    <input
                      value={designation}
                      onChange={(e) => setDesignation(e.target.value)}
                      placeholder="e.g. Medical Superintendent, OPD Director, Chief Administrator"
                      className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#50635e]">Hospital Affiliation</label>
                    <button
                      type="button"
                      onClick={() => setIsNewHospital(!isNewHospital)}
                      className="text-xs font-bold text-[#146b5a] hover:underline"
                    >
                      {isNewHospital ? "← Choose existing hospital" : "+ Register new hospital"}
                    </button>
                  </div>

                  {!isNewHospital ? (
                    <select
                      value={hospitalId}
                      onChange={(e) => handleHospitalSelect(e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    >
                      {hospitals.map((h) => (
                        <option key={h.id} value={h.id}>
                          {h.name} — {h.address} ({h.city})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className="mt-2 space-y-3 p-4 rounded-2xl bg-[#f4faf7] border border-[#dcefe5]">
                      <div>
                        <label className="text-[11px] font-bold text-[#17342f]">New Hospital Name</label>
                        <input
                          required={isNewHospital}
                          value={hospitalName}
                          onChange={(e) => setHospitalName(e.target.value)}
                          placeholder="e.g. City Life Multispecialty Hospital"
                          className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#dfe9e4] bg-white text-xs font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#17342f]">Full Hospital Address</label>
                        <input
                          required={isNewHospital}
                          value={newHospitalAddress}
                          onChange={(e) => setNewHospitalAddress(e.target.value)}
                          placeholder="Street, Landmark, Area"
                          className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#dfe9e4] bg-white text-xs font-semibold outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-[#17342f]">City</label>
                        <input
                          value={newHospitalCity}
                          onChange={(e) => setNewHospitalCity(e.target.value)}
                          placeholder="e.g. Kolkata or Bengaluru"
                          className="mt-1 w-full px-3.5 py-2.5 rounded-xl border border-[#dfe9e4] bg-white text-xs font-semibold outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. Doctor Fields */}
            {selectedRole === "doctor" && (
              <div className="border-t border-[#edf2ef] pt-5 space-y-4">
                <div className="text-xs font-bold text-[#17342f]">Medical Practice & Credentials</div>
                
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Primary Specialty</label>
                    <select
                      value={specialty}
                      onChange={(e) => setSpecialty(e.target.value)}
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    >
                      <option value="Cardiology">Cardiology</option>
                      <option value="Orthopedic Surgery">Orthopedic Surgery</option>
                      <option value="Neurology">Neurology</option>
                      <option value="General Medicine">General Medicine</option>
                      <option value="Pediatrics">Pediatrics</option>
                      <option value="Dermatology">Dermatology</option>
                      <option value="Oncology">Oncology</option>
                      <option value="Gastroenterology">Gastroenterology</option>
                      <option value="ENT / Otorhinolaryngology">ENT</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Medical Registration / License Number</label>
                    <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                      <Award size={16} className="text-[#78918a]" />
                      <input
                        required
                        value={licenseNumber}
                        onChange={(e) => setLicenseNumber(e.target.value)}
                        placeholder="e.g. NMC/MCI-2018-9842"
                        className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Years of Clinical Experience</label>
                    <input
                      type="number"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value) || 0)}
                      placeholder="e.g. 10"
                      className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#50635e]">Consultation Fee (₹ INR)</label>
                    <div className="mt-1.5 flex items-center gap-2 px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6]">
                      <span className="text-xs font-bold text-[#78918a]">₹</span>
                      <input
                        type="number"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(Number(e.target.value) || 500)}
                        placeholder="e.g. 800"
                        className="w-full bg-transparent text-xs font-semibold text-[#17342f] outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#50635e]">Primary Hospital Affiliation</label>
                  <select
                    value={hospitalId}
                    onChange={(e) => handleHospitalSelect(e.target.value)}
                    className="mt-1.5 w-full px-3.5 py-3 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] text-xs font-semibold outline-none"
                  >
                    {hospitals.map((h) => (
                      <option key={h.id} value={h.id}>{h.name} — {h.city}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </section>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              disabled={completeOnboarding.isPending}
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#146b5a] py-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(20,107,90,0.18)] transition hover:bg-[#0e4c42] disabled:opacity-60 disabled:cursor-wait"
            >
              {completeOnboarding.isPending ? "Saving profile & entering workspace…" : "Complete Setup & Enter Workspace"}
              <ArrowRight size={17} />
            </button>
            <p className="mt-3 text-center text-xs text-[#78918a]">
              Your details will be securely saved to DocX and Neon Postgres.
            </p>
          </div>
        </form>
      </main>
    </div>
  );
}
