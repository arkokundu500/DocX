import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { registerVapiWebhook } from "./integrations/vapi-webhook";
import { registerTwilioWebhooks } from "./integrations/twilio-webhook";

const app = express();

// Security headers
app.use((_req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ limit: "2mb", extended: true }));

// Webhooks
registerVapiWebhook(app);
registerTwilioWebhooks(app);

// Root / Health check endpoints
app.get(["/api/health", "/health"], (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get(["/api", "/"], (_req, res) => {
  res.json({ name: "DocX API", status: "ok", timestamp: new Date().toISOString() });
});

// tRPC entrypoint
app.use(
  ["/api/trpc", "/trpc"],
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

export default app;
