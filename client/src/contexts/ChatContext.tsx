import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";
import ChatModal, { ChatTarget } from "@/components/ChatModal";

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

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on("chat_notification", (notif: any) => {
      // Don't toast or mark unread for self messages
      if (user && (notif.senderId === user.id || (user.name && notif.senderName === user.name))) {
        return;
      }

      // Play notification audio effect
      playNotificationChime();

      const apptId = notif.appointmentId || notif.bookingId;
      // Increment unread count for this conversation if not currently actively open
      if (apptId && (!isOpen || activeTarget?.appointmentId !== apptId)) {
        setUnreadCounts((prev) => ({
          ...prev,
          [apptId]: (prev[apptId] || 0) + 1,
        }));
      }

      // If this modal is already open with the same appointment, let the modal stream handle it
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

    return () => {
      socket.disconnect();
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
