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
}

const ChatContext = createContext<ChatContextValue | null>(null);

function playNotificationChime() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.35);
  } catch {
    // Ignore audio context autoplay limitations
  }
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTarget, setActiveTarget] = useState<ChatTarget | null>(null);
  const socketRef = useRef<Socket | null>(null);

  const openChat = (target: ChatTarget) => {
    setActiveTarget(target);
    setIsOpen(true);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on("chat_notification", (notif: any) => {
      // Don't toast self messages
      if (user && (notif.senderId === user.id || (user.name && notif.senderName === user.name))) {
        return;
      }

      // If this modal is already open with the same appointment, let the modal stream handle it
      if (isOpen && activeTarget?.appointmentId === notif.appointmentId) {
        return;
      }

      playNotificationChime();

      toast(`Message from ${notif.senderName}`, {
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
    <ChatContext.Provider value={{ openChat, closeChat, isOpen, activeTarget }}>
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
