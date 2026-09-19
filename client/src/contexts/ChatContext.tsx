import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import ChatModal, { ChatTarget } from "@/components/ChatModal";

/**
 * Returns the socket server URL if configured, or window.location.origin in local dev.
 * In production/serverless without a dedicated WebSocket server (e.g. Vercel),
 * returns null so socket.io-client does not attempt to connect and trigger console errors.
 */
export function getSocketUrl(): string | null {
  const envUrl = (import.meta as any).env?.VITE_SOCKET_URL;
  if (envUrl && typeof envUrl === "string" && envUrl.trim() !== "") {
    return envUrl.trim();
  }
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    if (hostname === "localhost" || hostname === "127.0.0.1" || hostname.endsWith(".local")) {
      return window.location.origin;
    }
  }
  return null;
}

interface ChatContextValue {
  openChat: (target: ChatTarget) => void;
  closeChat: () => void;
  isOpen: boolean;
  activeTarget: ChatTarget | null;
  unreadCounts: Record<string, number>;
  hasUnread: (appointmentId?: string) => boolean;
  getUnreadCount: (appointmentId?: string) => number;
  markAsRead: (appointmentId: string) => void;
  playNotificationSound: () => void;
  playSentSound: () => void;
}

const ChatContext = createContext<ChatContextValue | null>(null);

/**
 * Synthesizes a pleasant two-tone incoming message chime using the Web Audio API.
 * Frequency: 587Hz (D5) -> 880Hz (A5)
 */
export function playNotificationChime() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.18, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.22);

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
    gain2.gain.setValueAtTime(0.22, ctx.currentTime + 0.08);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.08);
    osc2.stop(ctx.currentTime + 0.38);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

/**
 * Synthesizes a crisp, satisfying "sent message" rising whoosh/click sound using Web Audio API.
 * Frequency glide: 420Hz -> 840Hz (pleasant iMessage/WhatsApp style tap)
 */
export function playSentMessageSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(420, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(860, ctx.currentTime + 0.09);
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.12);
  } catch {
    // Ignore audio autoplay restrictions
  }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<ChatTarget | null>(null);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const socketRef = useRef<Socket | null>(null);
  const seenMessageIds = useRef<Set<number>>(new Set());
  const isInitialLoadRef = useRef(true);

  const markAsRead = (appointmentId: string) => {
    if (!appointmentId) return;
    setUnreadCounts((prev) => {
      if (!prev[appointmentId]) return prev;
      const next = { ...prev };
      delete next[appointmentId];
      return next;
    });
  };

  const openChat = (target: ChatTarget) => {
    const apptId = target.appointmentId || target.bookingId;
    if (apptId) {
      markAsRead(apptId);
    }
    setActiveTarget(target);
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const hasUnread = (appointmentId?: string): boolean => {
    if (!appointmentId) return false;
    return Boolean(unreadCounts[appointmentId] && unreadCounts[appointmentId] > 0);
  };

  const getUnreadCount = (appointmentId?: string): number => {
    if (!appointmentId) return 0;
    return unreadCounts[appointmentId] || 0;
  };

  // Poll for incoming message notifications when user is authenticated
  const notifsQuery = trpc.chat.getRecentNotifications.useQuery(undefined, {
    enabled: Boolean(user?.id),
    refetchInterval: 5000,
    retry: false,
  });

  useEffect(() => {
    if (!notifsQuery.data || !user) return;

    if (isInitialLoadRef.current) {
      notifsQuery.data.forEach((m) => seenMessageIds.current.add(m.id));
      isInitialLoadRef.current = false;
      return;
    }

    for (const notif of notifsQuery.data) {
      if (!seenMessageIds.current.has(notif.id)) {
        seenMessageIds.current.add(notif.id);

        const apptId = notif.appointmentId || notif.bookingId;
        if (isOpen && activeTarget?.appointmentId === apptId) {
          continue;
        }

        if (apptId) {
          setUnreadCounts((prev) => ({
            ...prev,
            [apptId]: (prev[apptId] || 0) + 1,
          }));
        }

        playNotificationChime();

        toast(`New message from ${notif.senderName}`, {
          description: notif.message.slice(0, 80),
          action: {
            label: "Open Chat",
            onClick: () => {
              openChat({
                appointmentId: notif.appointmentId,
                bookingId: notif.bookingId,
                doctorName: notif.senderRole === "doctor" ? notif.senderName : "Doctor",
                patientName: notif.senderRole === "user" ? notif.senderName : "Patient",
              });
            },
          },
          duration: 8000,
        });
      }
    }
  }, [notifsQuery.data, user, isOpen, activeTarget?.appointmentId]);

  // Socket.io connection (only when a socket server is available)
  useEffect(() => {
    const socketUrl = getSocketUrl();
    if (!socketUrl) return;

    let socket: Socket | null = null;
    try {
      socket = io(socketUrl, {
        path: "/socket.io",
        transports: ["polling", "websocket"],
        reconnectionAttempts: 2,
        timeout: 3000,
      });
      socketRef.current = socket;

      socket.on("connect_error", () => {
        socket?.disconnect();
      });

      socket.on("chat_notification", (notif: any) => {
        // Don't toast or mark unread for self messages
        if (user && (notif.senderId === user.id || (user.name && notif.senderName === user.name))) {
          return;
        }

        // Play notification audio effect
        playNotificationChime();

        const apptId = notif.appointmentId || notif.bookingId;
        if (apptId && (!isOpen || activeTarget?.appointmentId !== apptId)) {
          setUnreadCounts((prev) => ({
            ...prev,
            [apptId]: (prev[apptId] || 0) + 1,
          }));
        }

        if (isOpen && activeTarget?.appointmentId === apptId) {
          return;
        }

        toast(`New message from ${notif.senderName}`, {
          description: notif.preview || notif.message,
          action: {
            label: "Open Chat",
            onClick: () => {
              openChat({
                appointmentId: notif.appointmentId,
                bookingId: notif.bookingId,
                doctorName: notif.senderRole === "doctor" ? notif.senderName : "Doctor",
                patientName: notif.senderRole === "user" ? notif.senderName : "Patient",
              });
            },
          },
          duration: 8000,
        });
      });
    } catch {
      // Ignore socket errors
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
      socketRef.current = null;
    };
  }, [user, isOpen, activeTarget?.appointmentId]);

  return (
    <ChatContext.Provider
      value={{
        openChat,
        closeChat,
        isOpen,
        activeTarget,
        unreadCounts,
        hasUnread,
        getUnreadCount,
        markAsRead,
        playNotificationSound: playNotificationChime,
        playSentSound: playSentMessageSound,
      }}
    >
      {children}
      <ChatModal open={isOpen} onClose={closeChat} target={activeTarget} />
    </ChatContext.Provider>
  );
}

export function useChat() {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return ctx;
}
