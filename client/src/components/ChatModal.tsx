import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { MessageSquare, Send, X, Minimize2, Maximize2, ShieldCheck, Stethoscope, User as UserIcon } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { playNotificationChime, playSentMessageSound } from "@/contexts/ChatContext";

export interface ChatTarget {
  appointmentId: string;
  bookingId?: string;
  doctorName?: string;
  patientName?: string;
  doctorSpecialty?: string;
  doctorImage?: string;
  hospitalName?: string;
  appointmentTime?: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
  target: ChatTarget | null;
}

export default function ChatModal({ open, onClose, target }: ChatModalProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOtherTyping, setIsOtherTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);

  const socketRef = useRef<Socket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<any>(null);

  const isDoctor = user?.role === "doctor";
  const recipientName = isDoctor
    ? target?.patientName || "Patient"
    : target?.doctorName || "Doctor";

  // tRPC message history query
  const historyQuery = trpc.chat.getHistory.useQuery(
    { appointmentId: target?.appointmentId || "" },
    {
      enabled: open && !!target?.appointmentId,
      refetchInterval: 6000, // Poll fallback for serverless/Vercel
    }
  );

  // Sync historical messages
  useEffect(() => {
    if (historyQuery.data) {
      setMessages(historyQuery.data);
    }
  }, [historyQuery.data]);

  // Socket.io connection
  useEffect(() => {
    if (!open || !target?.appointmentId) return;

    // Connect to current host's socket endpoint
    const socket = io({
      path: "/socket.io",
      transports: ["websocket", "polling"],
      reconnectionAttempts: 5,
    });
    socketRef.current = socket;

    socket.on("connect", () => {
      setSocketConnected(true);
      socket.emit("join_chat", {
        appointmentId: target.appointmentId,
        userId: user?.id,
        userName: user?.name || (isDoctor ? "Doctor" : "Patient"),
        role: user?.role || "user",
      });
    });

    socket.on("receive_message", (newMsg: any) => {
      setMessages((prev) => {
        // Prevent duplicate messages
        if (prev.some((m) => m.id === newMsg.id || (m.createdAt === newMsg.createdAt && m.senderId === newMsg.senderId))) {
          return prev;
        }
        return [...prev, newMsg];
      });

      // Play chime if message from other party
      if (newMsg.senderId !== user?.id) {
        playNotificationChime();
      }
    });

    socket.on("user_typing", (data: { userName: string; isTyping: boolean }) => {
      setIsOtherTyping(data.isTyping);
    });

    socket.on("disconnect", () => {
      setSocketConnected(false);
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [open, target?.appointmentId, user?.id, user?.name, user?.role, isDoctor]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOtherTyping]);

  // tRPC send mutation fallback
  const sendMutation = trpc.chat.sendMessage.useMutation();

  const handleSend = async () => {
    const text = inputMessage.trim();
    if (!text || !target?.appointmentId) return;

    setInputMessage("");
    // Play sent message sound immediately
    playSentMessageSound();

    const payload = {
      appointmentId: target.appointmentId,
      bookingId: target.bookingId,
      senderId: user?.id || 1,
      senderName: user?.name || (isDoctor ? "Doctor" : "Patient"),
      senderRole: isDoctor ? "doctor" : "user",
      message: text,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setMessages((prev) => [...prev, { ...payload, id: Date.now() }]);

    // Emit via Socket.io
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("send_message", payload);
    }

    // Also call tRPC mutation to guarantee database persistence
    try {
      await sendMutation.mutateAsync({
        appointmentId: target.appointmentId,
        bookingId: target.bookingId,
        senderId: user?.id,
        senderName: user?.name || (isDoctor ? "Doctor" : "Patient"),
        senderRole: isDoctor ? "doctor" : "user",
        message: text,
      });
    } catch (err) {
      console.warn("[Chat] Fallback persistence:", err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    if (socketRef.current && target?.appointmentId) {
      socketRef.current.emit("typing", {
        appointmentId: target.appointmentId,
        userName: user?.name || (isDoctor ? "Doctor" : "Patient"),
        isTyping: true,
      });
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      typingTimerRef.current = setTimeout(() => {
        socketRef.current?.emit("typing", {
          appointmentId: target.appointmentId,
          userName: user?.name || (isDoctor ? "Doctor" : "Patient"),
          isTyping: false,
        });
      }, 1500);
    }
  };

  if (!open || !target) return null;

  // Minimized floating bubble
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full border border-[#146b5a]/30 bg-[#103e38] p-3 text-white shadow-[0_16px_40px_rgba(16,62,56,0.35)] cursor-pointer hover:scale-105 transition">
        <button
          onClick={() => setIsMinimized(false)}
          className="flex items-center gap-2.5 text-xs font-bold"
        >
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex size-3 rounded-full bg-red-500" />
          </span>
          <MessageSquare size={16} className="text-[#a9d9bd]" />
          <span>Chat with {recipientName}</span>
        </button>
        <button
          onClick={onClose}
          className="grid size-6 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20"
        >
          <X size={13} />
        </button>
      </div>
    );
  }

  // Full Pop-up Window
  return (
    <div className="fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] sm:bottom-6 sm:right-6 sm:left-auto sm:w-[420px] z-50 flex flex-col rounded-[26px] border border-[#dfe9e4] bg-white shadow-[0_20px_50px_rgba(20,50,42,0.22)] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Pop-up Window Header */}
      <div className="flex items-center justify-between bg-[#103e38] px-4 py-3.5 text-white">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative size-10 shrink-0 overflow-hidden rounded-full border-2 border-white/20 bg-[#dcefe5]">
            {target.doctorImage ? (
              <img
                src={target.doctorImage}
                alt={recipientName}
                className="h-full w-full object-cover object-top"
              />
            ) : (
              <span className="grid h-full w-full place-items-center text-[#146b5a]">
                {isDoctor ? <UserIcon size={18} /> : <Stethoscope size={18} />}
              </span>
            )}
            <span className="absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-[#103e38] bg-[#3b9a6d]" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="truncate text-sm font-bold leading-none text-white">
                {recipientName}
              </h3>
              <span className="rounded-full bg-white/15 px-1.5 py-0.5 text-[9px] font-semibold text-[#a9d9bd]">
                {isDoctor ? "Patient" : target.doctorSpecialty || "Specialist"}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1 text-[11px] text-white/60 truncate">
              <span>{target.hospitalName || "DocX Partner Care"}</span>
              {target.bookingId && (
                <>
                  <span>·</span>
                  <span className="font-mono text-white/80">#{target.bookingId}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Window controls */}
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="grid size-7 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
            title="Minimize"
          >
            <Minimize2 size={13} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid size-7 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition cursor-pointer"
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Booking verification banner */}
      <div className="flex items-center justify-between border-b border-[#edf2ef] bg-[#fbfaf6] px-4 py-1.5 text-[11px] font-semibold text-[#6b8179]">
        <span className="inline-flex items-center gap-1 text-[#146b5a]">
          <ShieldCheck size={13} /> Verified appointment chat
        </span>
        <span className="text-[10px] text-[#9aa9a4]">
          {socketConnected ? "Realtime connected" : "Encrypted channel"}
        </span>
      </div>

      {/* Messages Stream */}
      <div
        ref={scrollRef}
        className="flex-1 max-h-[360px] min-h-[260px] overflow-y-auto p-4 space-y-3 bg-[#fdfcf9]"
      >
        {messages.length === 0 ? (
          <div className="py-8 text-center">
            <div className="mx-auto grid size-10 place-items-center rounded-full bg-[#eaf3ed] text-[#146b5a]">
              <MessageSquare size={18} />
            </div>
            <p className="mt-3 text-xs font-bold text-[#17342f]">
              Direct conversation with {recipientName}
            </p>
            <p className="mt-1 text-[11px] text-[#78918a] max-w-xs mx-auto">
              You can discuss appointment details, arrival instructions, or queries regarding your upcoming consultation.
            </p>
          </div>
        ) : (
          messages.map((m, idx) => {
            const isMe = m.senderId === user?.id || (m.senderRole === "user" && !isDoctor) || (m.senderRole === "doctor" && isDoctor);
            return (
              <div
                key={m.id || idx}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div className="flex items-baseline gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold text-[#8fa19b]">
                    {isMe ? "You" : m.senderName}
                  </span>
                  <span className="text-[9px] text-[#b4c3bd]">
                    {new Date(m.createdAt).toLocaleTimeString("en-IN", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-xs font-medium leading-relaxed shadow-xs ${
                    isMe
                      ? "bg-[#146b5a] text-white rounded-br-xs"
                      : "bg-white border border-[#dfe9e4] text-[#17342f] rounded-bl-xs"
                  }`}
                >
                  {m.message}
                </div>
              </div>
            );
          })
        )}

        {/* Typing indicator */}
        {isOtherTyping && (
          <div className="flex items-center gap-1.5 text-[11px] text-[#8fa19b] italic">
            <span className="size-1.5 animate-bounce rounded-full bg-[#146b5a]" />
            <span className="size-1.5 animate-bounce rounded-full bg-[#146b5a] [animation-delay:0.2s]" />
            <span className="size-1.5 animate-bounce rounded-full bg-[#146b5a] [animation-delay:0.4s]" />
            <span>{recipientName} is typing…</span>
          </div>
        )}
      </div>

      {/* Quick chips */}
      <div className="flex gap-1.5 overflow-x-auto border-t border-[#edf2ef] bg-[#fbfaf6] px-3 py-2 text-[11px] no-scrollbar">
        {[
          "I will be on time",
          "Sharing past medical reports",
          "Where is the OPD desk?",
        ].map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => setInputMessage(chip)}
            className="whitespace-nowrap rounded-full border border-[#dfe9e4] bg-white px-2.5 py-1 text-[10px] font-bold text-[#50635e] hover:border-[#146b5a] hover:text-[#146b5a] transition cursor-pointer shrink-0"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Message Input Box */}
      <div className="flex items-center gap-2 border-t border-[#dfe9e4] bg-white p-3">
        <input
          value={inputMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${recipientName}…`}
          className="min-w-0 flex-1 rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-2.5 text-xs font-medium text-[#17342f] outline-none placeholder:text-[#9aa9a4] focus:border-[#146b5a]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!inputMessage.trim()}
          className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#146b5a] text-white shadow-xs hover:bg-[#0e4c42] disabled:opacity-40 transition cursor-pointer"
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
