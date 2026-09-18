import { useMemo, useState } from "react";
import { Link } from "wouter";
import { Building2, ChevronLeft, Loader2, ShieldCheck, Stethoscope, UserRound, UsersRound } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { AppLayout } from "@/components/DocxShell";

const roleOptions = [
  { value: "user", label: "Patient", icon: UserRound, tone: "bg-[#f3f7f3] text-[#59736b]" },
  { value: "admin", label: "Admin", icon: ShieldCheck, tone: "bg-[#f7f0df] text-[#8b6a32]" },
  { value: "hospital_authority", label: "Hospital authority", icon: Building2, tone: "bg-[#e3f2e8] text-[#17644f]" },
  { value: "doctor", label: "Doctor", icon: Stethoscope, tone: "bg-[#e6f0f8] text-[#326486]" },
] as const;

type Role = (typeof roleOptions)[number]["value"];

export default function AdminUsersPage() {
  const { user, loading: authLoading } = useAuth();
  const isAdmin = user?.role === "admin";
  const [filter, setFilter] = useState<"all" | Role>("all");
  const usersQuery = trpc.admin.demoUsers.useQuery(undefined, { enabled: isAdmin, retry: false });
  const utils = trpc.useUtils();
  const roleMutation = trpc.admin.updateDemoUserRole.useMutation({
    onSuccess: async () => {
      await utils.admin.demoUsers.invalidate();
      toast.success("Demo user role updated");
    },
    onError: (error) => toast.error(error.message || "Could not update role"),
  });

  const users = useMemo(() => {
    const rows = usersQuery.data ?? [];
    return filter === "all" ? rows : rows.filter((row) => row.role === filter);
  }, [filter, usersQuery.data]);

  if (authLoading) return <div className="grid min-h-screen place-items-center bg-[#fbfaf6] text-sm font-semibold text-[#63736e]">Checking your secure session…</div>;
  if (!isAdmin) return <AppLayout><div className="container py-20"><div className="mx-auto max-w-lg rounded-[28px] border border-[#ead8d0] bg-white p-8 text-center"><ShieldCheck className="mx-auto text-[#b8443e]" size={32} /><h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em]">Admin access required</h1><p className="mt-3 text-sm leading-6 text-[#78918a]">Only DocX administrators can manage demo users and assign roles.</p><Link href="/dashboard" className="mt-7 inline-flex rounded-full bg-[#146b5a] px-5 py-3 text-sm font-bold text-white">Return to dashboard</Link></div></div></AppLayout>;

  return <AppLayout>
    <div className="container py-9 sm:py-12">
      <Link href="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-[#78918a] hover:text-[#146b5a]"><ChevronLeft size={15} /> Admin overview</Link>
      <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b8443e]"><UsersRound size={15} /> Access management</div><h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em] sm:text-5xl">Demo users</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-[#78918a]">Review the current hospital authorities and doctors, then assign the role each demo profile should use in the workspace.</p></div><div className="rounded-2xl bg-[#eaf3ed] px-4 py-3 text-xs font-bold text-[#17644f]">{usersQuery.data?.length ?? 0} seeded profiles</div>
      </div>
      <div className="mt-8 flex flex-wrap gap-2">{([{ value: "all", label: "All profiles" }, ...roleOptions.map(({ value, label }) => ({ value, label }))] as const).map((option) => <button key={option.value} type="button" onClick={() => setFilter(option.value)} className={`rounded-full px-4 py-2.5 text-xs font-bold transition ${filter === option.value ? "bg-[#146b5a] text-white" : "bg-white text-[#78918a] ring-1 ring-[#dfe9e4] hover:bg-[#eaf3ed]"}`}>{option.label}</button>)}</div>
      <div className="mt-6 overflow-hidden rounded-[26px] border border-[#dfe9e4] bg-white shadow-[0_12px_35px_rgba(26,61,52,0.05)]">
        <div className="hidden grid-cols-[1.5fr_1fr_1.1fr_190px] gap-4 border-b border-[#edf2ef] bg-[#f7faf7] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9aa9a4] md:grid"><span>Profile</span><span>Current role</span><span>Identity</span><span>Assign role</span></div>
        {usersQuery.isLoading ? <div className="flex items-center justify-center gap-2 p-12 text-sm font-semibold text-[#78918a]"><Loader2 className="animate-spin" size={18} /> Loading demo users…</div> : users.length === 0 ? <div className="p-12 text-center text-sm text-[#78918a]">No demo users match this filter.</div> : <div>{users.map((demoUser) => { const current = roleOptions.find((option) => option.value === demoUser.role) ?? roleOptions[0]; const Icon = current.icon; return <div key={demoUser.openId} className="grid gap-4 border-b border-[#edf2ef] px-5 py-5 last:border-0 md:grid-cols-[1.5fr_1fr_1.1fr_190px] md:items-center md:px-6"><div className="flex min-w-0 items-center gap-3"><span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${current.tone}`}><Icon size={18} /></span><div className="min-w-0"><div className="truncate text-sm font-bold text-[#17342f]">{demoUser.name ?? "Unnamed demo user"}</div><div className="truncate text-xs text-[#8a9994]">{demoUser.openId}</div></div></div><div><span className={`inline-flex rounded-full px-3 py-1.5 text-[11px] font-bold ${current.tone}`}>{current.label}</span></div><div className="min-w-0 text-xs text-[#78918a]"><div className="truncate">{demoUser.email ?? "No email"}</div><div className="mt-1">{demoUser.loginMethod ?? "demo"} identity</div></div><label className="text-xs font-bold text-[#50635e]"><span className="sr-only">Assign role for {demoUser.name}</span><select value={demoUser.role} disabled={roleMutation.isPending} onChange={(event) => roleMutation.mutate({ openId: demoUser.openId, role: event.target.value as Role })} className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2.5 text-xs font-bold text-[#17342f] outline-none focus:border-[#146b5a] focus:ring-2 focus:ring-[#dcefe5]"><option value="user">Patient</option><option value="admin">Admin</option><option value="hospital_authority">Hospital authority</option><option value="doctor">Doctor</option></select></label></div>})}</div>}
      </div>
      <p className="mt-5 text-xs leading-5 text-[#8a9994]">Demo identities are seeded records for previews. They do not create passwords or bypass OAuth; map a real authenticated identity to a role before production use.</p>
    </div>
  </AppLayout>;
}
