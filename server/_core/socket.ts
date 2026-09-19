import { Server as SocketIOServer } from "socket.io";
import type { Server as HttpServer } from "http";
import { neon } from "@neondatabase/serverless";

let io: SocketIOServer | null = null;

export function initSocket(server: HttpServer) {
  if (io) return io;

  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    path: "/socket.io",
    transports: ["websocket", "polling"],
  });

  io.on("connection", (socket) => {
    console.info("[Socket.io] Client connected:", socket.id);

    // Join a specific appointment chat room
    socket.on("join_chat", (data: { appointmentId: string; userId?: number; userName?: string; role?: string }) => {
      if (!data.appointmentId) return;
      const room = `appointment_${data.appointmentId}`;
      socket.join(room);
      console.info(`[Socket.io] Socket ${socket.id} (${data.userName || "User"} - ${data.role || "unknown"}) joined ${room}`);

      // Broadcast user presence in room
      socket.to(room).emit("user_joined", {
        userId: data.userId,
        userName: data.userName,
        role: data.role,
        timestamp: new Date().toISOString(),
      });
    });

    // Handle sending a message
    socket.on("send_message", async (data: {
      appointmentId: string;
      bookingId?: string;
      senderId: number;
      senderName: string;
      senderRole: string; // "user" | "doctor"
      message: string;
    }) => {
      try {
        const { appointmentId, bookingId, senderId, senderName, senderRole, message } = data;
        if (!appointmentId || !message || !message.trim()) return;

        const cleanMessage = message.trim();
        const createdAt = new Date().toISOString();

        // Save to database
        const dbUrl = process.env.DOCX_DATABASE_URL || process.env.DATABASE_URL;
        let savedId = Date.now();
        if (dbUrl) {
          try {
            const sql = neon(dbUrl);
            const [inserted] = await sql`
              INSERT INTO chat_messages ("appointmentId", "bookingId", "senderId", "senderName", "senderRole", message, "createdAt")
              VALUES (${appointmentId}, ${bookingId || null}, ${senderId}, ${senderName}, ${senderRole}, ${cleanMessage}, ${createdAt})
              RETURNING id;
            `;
            if (inserted) savedId = inserted.id;
          } catch (err) {
            console.warn("[Socket.io] Failed to persist message to DB, broadcasting live:", err);
          }
        }

        const messagePayload = {
          id: savedId,
          appointmentId,
          bookingId,
          senderId,
          senderName,
          senderRole,
          message: cleanMessage,
          createdAt,
        };

        const room = `appointment_${appointmentId}`;
        // Broadcast to everyone in the room including sender
        io?.to(room).emit("receive_message", messagePayload);

        // Also emit notification event for cross-website alerts (e.g. if doctor or patient is in another page)
        io?.emit("chat_notification", {
          appointmentId,
          bookingId,
          senderId,
          senderName,
          senderRole,
          preview: cleanMessage.slice(0, 80),
          createdAt,
        });

        console.info(`[Socket.io] Message broadcast to ${room} by ${senderName}`);
      } catch (e) {
        console.error("[Socket.io] Error in send_message:", e);
      }
    });

    // Handle typing status
    socket.on("typing", (data: { appointmentId: string; userName: string; isTyping: boolean }) => {
      if (!data.appointmentId) return;
      const room = `appointment_${data.appointmentId}`;
      socket.to(room).emit("user_typing", {
        userName: data.userName,
        isTyping: data.isTyping,
      });
    });

    socket.on("disconnect", () => {
      console.info("[Socket.io] Client disconnected:", socket.id);
    });
  });

  return io;
}

export function getIO(): SocketIOServer | null {
  return io;
}
