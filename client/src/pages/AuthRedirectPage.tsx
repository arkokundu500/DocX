import { useEffect, useRef } from "react";
import { useClerk } from "@clerk/react";
import { useLocation } from "wouter";
import { Logo } from "@/components/DocxShell";
import { roleHome } from "@/lib/roles";
import { trpc } from "@/lib/trpc";

/**
 * Post-sign-in handoff page.
 *
 * After Clerk completes a sign-in the browser lands here. We must publish the
 * fresh Clerk session token BEFORE asking the server for the session — the
 * server exchanges the bearer token for the long-lived DocX cookie in that
 * same call. Skipping or racing this step is what caused the old
 * "sign in → bounced back to Clerk" loop.
 *
 * This page deliberately does NOT use useQuery caching (a cached `null`
 * `auth.me` from the pre-sign-in visit would immediately fire the failure
 * path). It awaits the token, then fetch()es fresh, then navigates once.
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AuthRedirectPage() {
  const [, navigate] = useLocation();
  const clerk = useClerk();
  const utils = trpc.useUtils();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return; // StrictMode double-mount guard
    started.current = true;

    void (async () => {
      // 1. Wait for the Clerk session token (clerk-js may still be booting).
      let token: string | null = null;
      for (let attempt = 0; attempt < 50 && !token; attempt++) {
        try {
          token = (await clerk.session?.getToken()) ?? null;
        } catch {
          token = null;
        }
        if (!token) await sleep(100);
      }

      if (!token) {
        navigate("/login?error=session", { replace: true });
        return;
      }
      window.__docxClerkToken = token;

      // 2. Exchange it for the DocX session (fetch bypasses any stale cache).
      let user: { role?: string; onboardingCompleted?: number } | null = null;
      try {
        user = (await utils.auth.me.fetch()) as { role?: string; onboardingCompleted?: number } | null;
      } catch {
        // One retry — the first request may race cookie issuance.
        await sleep(600);
        try {
          user = (await utils.auth.me.fetch()) as { role?: string; onboardingCompleted?: number } | null;
        } catch {
          user = null;
        }
      }

      if (user) {
        // If user hasn't completed onboarding yet (new user or Google auth), send to onboarding
        if (!user.onboardingCompleted) {
          navigate("/onboarding", { replace: true });
        } else {
          // Send completed users to their role home (patients land on /dashboard)
          navigate(roleHome(user.role), { replace: true });
        }
      } else {
        navigate("/login?error=session", { replace: true });
      }
    })();
  }, [clerk, utils, navigate]);

  return (
    <div className="grid min-h-screen place-items-center bg-[#fbfaf6]">
      <div className="flex flex-col items-center gap-4">
        <Logo />
        <div className="size-8 animate-spin rounded-full border-2 border-[#146b5a] border-t-transparent" />
        <p className="text-sm font-semibold text-[#63736e]">Signing you in securely…</p>
      </div>
    </div>
  );
}
