import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
import { authenticateClerkRequest } from "./clerkAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    user = await authenticateClerkRequest(opts.req, opts.res);
  } catch (error) {
    // Authentication is optional for public procedures.
    console.warn("[Auth] Request authentication failed:", error instanceof Error ? error.message : error);
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
