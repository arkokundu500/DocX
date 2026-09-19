import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";
import { registerVapiWebhook } from "../integrations/vapi-webhook";
import { registerTwilioWebhooks } from "../integrations/twilio-webhook";
import { initSocket } from "./socket";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    // Bind to loopback explicitly; on Windows an implicit host can resolve to
    // 0.0.0.0 and make `server.address()` report port 0.
    server.listen(port, "127.0.0.1", () => {
      const address = server.address();
      const boundPort = typeof address === "object" && address ? address.port : port;
      server.close(() => resolve(boundPort === port));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  initSocket(server);

  // Security headers to prevent MIME-sniffing, clickjacking, and XSS leaks
  app.use((_req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    next();
  });

  // Configure body parser with safe size limit to prevent memory exhaustion DoS
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ limit: "2mb", extended: true }));
  app.use(cookieParser());
  registerVapiWebhook(app);
  registerTwilioWebhooks(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const rawPort = parseInt(process.env.PORT || "3000", 10);
  const preferredPort = Number.isInteger(rawPort) && rawPort > 0 && rawPort < 65536 ? rawPort : 3000;
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "127.0.0.1";
  server.listen(port, host, () => {
    console.log(`Server running on http://${host}:${port}/`);
  });
}

startServer().catch(console.error);
