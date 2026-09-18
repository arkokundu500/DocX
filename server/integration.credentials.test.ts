import { describe, expect, it } from "vitest";

const shouldRun = Boolean(process.env.OPENROUTER_API_KEY && process.env.VAPI_PRIVATE_API_KEY);

describe("stored integration credentials", () => {
  it.skipIf(!shouldRun)("authenticate with OpenRouter and VAPI lightweight endpoints", async () => {
    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/models", {
      headers: { Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}` },
    });
    expect(openRouterResponse.ok).toBe(true);

    const vapiResponse = await fetch(`https://api.vapi.ai/assistant/${process.env.VAPI_ASSISTANT_ID}`, {
      headers: { Authorization: `Bearer ${process.env.VAPI_PRIVATE_API_KEY}` },
    });
    expect(vapiResponse.ok).toBe(true);
  }, 30_000);
});
