type VapiCustomer = { number: string; name?: string };

type VapiCallInput = {
  customerNumber: string;
  customerName?: string;
  assistantId?: string;
  phoneNumberId?: string;
  assistantOverrides?: Record<string, unknown>;
  scheduleEarliestAt?: string;
};

function requireVapiConfig() {
  const apiKey = process.env.VAPI_PRIVATE_API_KEY || process.env.VAPI_API_KEY;
  const assistantId = process.env.VAPI_ASSISTANT_ID;
  const phoneNumberId = process.env.VAPI_PHONE_NUMBER_ID;
  if (!apiKey || !assistantId || !phoneNumberId) {
    throw new Error("VAPI_PRIVATE_API_KEY, VAPI_ASSISTANT_ID, and VAPI_PHONE_NUMBER_ID are required");
  }
  return { apiKey, assistantId, phoneNumberId };
}

export function formatE164(phone: string): string {
  const cleaned = phone.trim().replace(/[^\d+]/g, "");
  if (cleaned.startsWith("+")) return cleaned;
  if (cleaned.length === 10) return `+91${cleaned}`;
  if (cleaned.length === 12 && cleaned.startsWith("91")) return `+${cleaned}`;
  return `+${cleaned}`;
}

export async function createOutboundReminder(input: VapiCallInput) {
  const config = requireVapiConfig();
  const formattedNumber = formatE164(input.customerNumber);
  const body: Record<string, unknown> = {
    assistantId: input.assistantId || config.assistantId,
    phoneNumberId: input.phoneNumberId || config.phoneNumberId,
    customer: {
      number: formattedNumber,
      ...(input.customerName ? { name: input.customerName } : {}),
    } satisfies VapiCustomer,
    ...(input.assistantOverrides ? { assistantOverrides: input.assistantOverrides } : {}),
    ...(input.scheduleEarliestAt ? { schedulePlan: { earliestAt: input.scheduleEarliestAt } } : {}),
  };

  const response = await fetch("https://api.vapi.ai/call/phone", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`VAPI call creation failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  return response.json() as Promise<Record<string, unknown>>;
}

export function normalizeVapiEvent(body: unknown) {
  if (!body || typeof body !== "object") return { type: "unknown", callId: null };
  const event = body as Record<string, any>;
  return {
    type: typeof event.message?.type === "string" ? event.message.type : typeof event.type === "string" ? event.type : "unknown",
    callId: event.message?.call?.id ?? event.call?.id ?? event.callId ?? null,
    status: event.message?.status ?? event.status ?? null,
    endedReason: event.message?.endedReason ?? event.endedReason ?? null,
    summary: event.message?.analysis?.summary ?? event.analysis?.summary ?? null,
  };
}
