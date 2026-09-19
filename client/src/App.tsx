import { useEffect } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Link, Route, Switch, useLocation } from "wouter";
import { ShieldAlert } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { roleHome } from "./lib/roles";
import Home from "./pages/Home";
import { HospitalsPage, HospitalDetailPage, DoctorDetailPage } from "./pages/DirectoryPages";
import DoctorsPage from "./pages/DoctorsPage";
import { BookingPage, ConfirmationPage } from "./pages/BookingPages";
import { AccountPage, CentralAdminPage, DoctorAdminPage, FeedbackPage, HospitalAdminPage, LoginPage, PatientDashboardPage } from "./pages/DashboardPages";
import NotFound from "./pages/NotFound";
import AdminUsersPage from "./pages/AdminUsersPage";
import AuthRedirectPage from "./pages/AuthRedirectPage";
import OnboardingPage from "./pages/OnboardingPage";
import { ChatProvider } from "./contexts/ChatContext";
import { hasCookie } from "cookies-next";
import { CLIENT_SESSION_COOKIE, ONE_HOUR_MS } from "@shared/const";

function InactivityWatcher() {
  const { isAuthenticated, logout } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) return;

    let timeoutId: any;

    const performSignout = async (reasonText: string, queryParam: string) => {
      toast.info(reasonText);
      await logout();
      navigate(`/login?reason=${queryParam}`);
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        void performSignout("You have been signed out due to 1 hour of inactivity.", "inactivity");
      }, ONE_HOUR_MS);
    };

    let lastActivityTime = Date.now();
    const onUserActivity = () => {
      const now = Date.now();
      if (now - lastActivityTime > 2000) {
        lastActivityTime = now;
        resetTimer();
      }
    };

    resetTimer();

    // 1-hour cookie expiration watcher via cookies-next (checks every 5s)
    const cookieInterval = setInterval(() => {
      if (!hasCookie(CLIENT_SESSION_COOKIE)) {
        clearInterval(cookieInterval);
        void performSignout("Your 1-hour session has expired. You have been signed out automatically.", "session_expired");
      }
    }, 5000);

    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart", "click"];
    for (const eventName of activityEvents) {
      window.addEventListener(eventName, onUserActivity, { passive: true });
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearInterval(cookieInterval);
      for (const eventName of activityEvents) {
        window.removeEventListener(eventName, onUserActivity);
      }
    };
  }, [isAuthenticated, logout, navigate]);

  return null;
}

function PatientDashboardRoute() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        navigate("/login", { replace: true });
      } else if (user && user.role !== "user") {
        navigate(roleHome(user.role), { replace: true });
      }
    }
  }, [user, isAuthenticated, loading, navigate]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-[#fbfaf6] text-sm font-semibold text-[#63736e]">Checking your secure session…</div>;
  }
  if (!isAuthenticated) return <LoginPage />;
  if (user && !user.onboardingCompleted) {
    return <OnboardingPage />;
  }
  if (user && user.role !== "user") {
    return null;
  }
  return <PatientDashboardPage />;
}

function AccessDenied({ requiredRole }: { requiredRole: string }) {
  const { user } = useAuth();
  const home = roleHome(user?.role);
  return <div className="grid min-h-screen place-items-center bg-[#fbfaf6] px-5"><div className="w-full max-w-lg rounded-[28px] border border-[#ead8d0] bg-white p-8 text-center shadow-[0_14px_40px_rgba(26,61,52,0.06)]"><ShieldAlert className="mx-auto text-[#b8443e]" size={34} /><h1 className="mt-5 font-display text-3xl font-semibold tracking-[-0.05em]">Access restricted</h1><p className="mt-3 text-sm leading-6 text-[#78918a]">This workspace is for the <strong className="text-[#17342f]">{requiredRole}</strong> role. You are signed in as <strong className="text-[#17342f]">{user?.name || "a patient"}</strong>.</p><Link href={home} className="mt-7 inline-flex rounded-full bg-[#146b5a] px-5 py-3 text-sm font-bold text-white">Go to your workspace</Link></div></div>;
}

function Protected({ children, roles, allowUnonboarded = false }: { children: React.ReactNode; roles?: string[]; allowUnonboarded?: boolean }) {
  const { loading, isAuthenticated, user } = useAuth();
  if (loading) return <div className="grid min-h-screen place-items-center bg-[#fbfaf6] text-sm font-semibold text-[#63736e]">Checking your secure session…</div>;
  if (!isAuthenticated) return <LoginPage />;
  // If user has not completed onboarding, force them to complete onboarding first
  if (!allowUnonboarded && user && !user.onboardingCompleted) {
    return <OnboardingPage />;
  }
  if (roles && user && !roles.includes(user.role)) return <AccessDenied requiredRole={roles.map(r => r.replace("_", " ")).join(" / ")} />;
  return <>{children}</>;
}

function Router() {
  const guard = (element: React.ReactNode, roles?: string[]) => <Protected roles={roles}>{element}</Protected>;
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/login" component={LoginPage} />
    <Route path="/sign-up" component={LoginPage} />
    <Route path="/auth/redirect" component={AuthRedirectPage} />
    <Route path="/onboarding">{() => <Protected allowUnonboarded={true}><OnboardingPage /></Protected>}</Route>
    <Route path="/hospitals">{() => guard(<HospitalsPage />)}</Route>
    <Route path="/hospitals/:id">{(params) => guard(<HospitalDetailPage id={params.id} />)}</Route>
    <Route path="/doctors">{() => guard(<DoctorsPage />)}</Route>
    <Route path="/doctors/:id">{(params) => guard(<DoctorDetailPage id={params.id} />)}</Route>
    <Route path="/appointment/book">{() => guard(<BookingPage />)}</Route>
    <Route path="/appointment/confirmation">{() => guard(<ConfirmationPage />)}</Route>
    {/* Patient workspace: doctors and hospital authorities are redirected immediately to their own workspace */}
    <Route path="/dashboard">{() => <PatientDashboardRoute />}</Route>
    <Route path="/account">{() => guard(<AccountPage />)}</Route>
    <Route path="/feedback">{() => guard(<FeedbackPage />)}</Route>
    {/* Role workspaces */}
    <Route path="/admin">{() => guard(<CentralAdminPage />, ["admin"])}</Route>
    <Route path="/admin/users">{() => guard(<AdminUsersPage />, ["admin"])}</Route>
    <Route path="/hospital-admin">{() => guard(<HospitalAdminPage />, ["admin", "hospital_authority"])}</Route>
    <Route path="/doctor-admin">{() => guard(<DoctorAdminPage />, ["admin", "doctor"])}</Route>
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ChatProvider>
            <Toaster />
            <InactivityWatcher />
            <Router />
          </ChatProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

