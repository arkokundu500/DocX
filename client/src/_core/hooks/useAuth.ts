import { useAuth as useClerkAuth, useClerk, useUser } from "@clerk/react";
import { trpc } from "@/lib/trpc";
import { useEffect, useState } from "react";

/**
 * DocX auth hook, backed by Clerk sign-in + the DocX server session.
 *
 * The server session (`app_session_id` cookie, or the Clerk bearer token on
 * first exchange) is the source of truth: `auth.me` returns the Neon user row
 * or null. Clerk drives the sign-in UI and supplies the bearer token that the
 * server verifies and exchanges for the long-lived cookie.
 *
 * Key detail: `auth.me` is only enabled AFTER a Clerk token has been published
 * to `window.__docxClerkToken` (or the user is signed out), so the very first
 * authenticated fetch already carries the bearer token and the server can
 * mint the cookie in that same response.
 */

declare global {
  interface Window {
    __docxClerkToken?: string | null;
  }
}

/** Signed-in DocX user shape returned by `auth.me` (Neon `users` row). */
export type DocxUser = {
  id: number;
  openId: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  loginMethod: string | null;
  role: "user" | "admin" | "hospital_authority" | "doctor";
  onboardingCompleted: number;
  specialty: string | null;
  licenseNumber: string | null;
  experienceYears: number | null;
  consultationFee: number | null;
  hospitalId: string | null;
  hospitalName: string | null;
  designation: string | null;
  age: number | null;
  gender: string | null;
  bloodGroup: string | null;
  emergencyContact: string | null;
  medicalNotes: string | null;
  city: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastSignedIn: Date;
};

export function useAuth() {
  const { isLoaded, isSignedIn, sessionId, getToken } = useClerkAuth();
  const clerk = useClerk();
  const { user: clerkUser } = useUser();
  const utils = trpc.useUtils();
  const [tokenReady, setTokenReady] = useState(false);

  // Publish the Clerk session token for the tRPC link in main.tsx.
  useEffect(() => {
    let cancelled = false;
    const refresh = async () => {
      if (!isSignedIn) {
        window.__docxClerkToken = null;
        if (!cancelled) setTokenReady(true);
        return;
      }
      try {
        const token = await getToken();
        if (!cancelled) {
          window.__docxClerkToken = token;
          setTokenReady(true);
        }
      } catch {
        if (!cancelled) setTokenReady(true);
      }
    };
    refresh();
    return () => {
      cancelled = true;
    };
  }, [isSignedIn, sessionId, getToken]);

  // The DocX session decides authentication; ask the server once the token is
  // published (or immediately for signed-out visitors).
  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 30_000,
    enabled: tokenReady,
  });

  // Keep the published token fresh (Clerk session tokens rotate every minute).
  useEffect(() => {
    if (!isSignedIn) return;
    const interval = setInterval(async () => {
      const token = await getToken();
      window.__docxClerkToken = token;
    }, 45_000);
    return () => clearInterval(interval);
  }, [isSignedIn, getToken]);

  // When a Clerk sign-in completes, refresh the server session immediately.
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      void utils.auth.me.invalidate();
    }
  }, [isLoaded, isSignedIn, utils]);

  const user: DocxUser | null = (meQuery.data as DocxUser | null) ?? null;

  const loading = !isLoaded || !tokenReady || meQuery.isLoading;

  const logout = async () => {
    try {
      await utils.client.auth.logout.mutate();
    } catch {
      // Cookie may already be gone; signing out of Clerk is what matters.
    }
    window.__docxClerkToken = null;
    await utils.auth.me.invalidate();
    if (isSignedIn) {
      await clerk.signOut();
    }
  };

  return {
    user,
    clerkUser,
    isAuthenticated: Boolean(user),
    loading,
    logout,
    isClerkLoaded: isLoaded,
  };
}
