import { describe, expect, it, vi } from "vitest";
import { appRouter } from "./routers";
import { createOutboundReminder, normalizeVapiEvent } from "./integrations/vapi";

const publicContext = { req: {} as any, res: {} as any, user: null };

describe("DocX integrations", () => {
  it("exposes the imported workbook counts through the directory procedure", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.directory.stats()).resolves.toMatchObject({
      hospitals: 100,
      doctors: 100,
      visits: 100,
      city: "Kolkata",
    });
  });

  it("normalizes VAPI end-of-call events without retaining raw payloads", () => {
    expect(normalizeVapiEvent({
      message: {
        type: "end-of-call-report",
        call: { id: "call_demo_123" },
        analysis: { summary: "Patient confirmed" },
        endedReason: "customer-ended-call",
      },
      transcript: "private transcript omitted",
    })).toEqual({
      type: "end-of-call-report",
      callId: "call_demo_123",
      status: null,
      endedReason: "customer-ended-call",
      summary: "Patient confirmed",
    });
  });

  it("protects outbound VAPI reminders behind authentication", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.vapi.createReminder({ customerNumber: "+15555550123" })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("protects appointment creation and listing behind authentication", async () => {
    const caller = appRouter.createCaller(publicContext);
    await expect(caller.appointments.mine()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
    await expect(caller.appointments.create({
      visitId: "v1",
      doctorId: "ananya-rao",
      hospitalId: "apollo-green",
      patientName: "Test Patient",
      patientPhone: "+919000000000",
      patientEmail: "patient@example.com",
      reason: "Testing protected booking",
      reminders: false,
    })).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });

  it("creates a VAPI outbound call with the configured assistant and phone number", async () => {
    vi.stubEnv("VAPI_PRIVATE_API_KEY", "test-vapi-key");
    vi.stubEnv("VAPI_ASSISTANT_ID", "assistant_demo");
    vi.stubEnv("VAPI_PHONE_NUMBER_ID", "phone_demo");
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ id: "call_demo" }), { status: 201, headers: { "Content-Type": "application/json" } }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(createOutboundReminder({
      customerNumber: "+15555550123",
      customerName: "Demo Patient",
      assistantOverrides: { variableValues: { appointment_time: "4:30 PM" } },
    })).resolves.toEqual({ id: "call_demo" });

    const request = fetchMock.mock.calls[0];
    expect(request?.[0]).toBe("https://api.vapi.ai/call/phone");
    expect(JSON.parse(String((request?.[1] as RequestInit).body))).toMatchObject({
      assistantId: "assistant_demo",
      phoneNumberId: "phone_demo",
      customer: { number: "+15555550123", name: "Demo Patient" },
    });
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
  });
});
