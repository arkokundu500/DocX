import type { Express, Request, Response } from "express";
import { normalizeVapiEvent } from "./vapi";

export function registerVapiWebhook(app: Express) {
  app.post(["/api/vapi/webhook", "/vapi/webhook"], (req: Request, res: Response) => {
    const expectedSecret = process.env.VAPI_SERVER_SECRET;
    const providedSecret = req.header("x-vapi-secret") || req.header("x-vapi-webhook-secret");
    if (expectedSecret && providedSecret !== expectedSecret) {
      res.status(401).json({ error: "Unauthorized webhook" });
      return;
    }

    const event = normalizeVapiEvent(req.body);
    console.info("[VAPI] event", { type: event.type, callId: event.callId, status: event.status });
    res.status(200).json({ received: true });
  });
}
