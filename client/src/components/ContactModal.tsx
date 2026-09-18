import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send, CheckCircle2, AlertCircle, Sparkles, Building2, MessageSquare, ShieldCheck, X } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";

interface ContactModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultSubject?: string;
}

export function ContactModal({ open, onOpenChange, defaultSubject = "General Inquiry" }: ContactModalProps) {
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (open) {
      if (user) {
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
      }
      setSubject(defaultSubject);
      setSubmitted(false);
    }
  }, [open, user, defaultSubject]);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      toast.success("Message sent successfully! Our care team will respond to you shortly.");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to deliver message. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    if (!message.trim() || message.trim().length < 5) {
      toast.error("Please write a message with at least 5 characters");
      return;
    }

    contactMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      setSubmitted(false);
      setMessage("");
    }, 300);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[520px] rounded-[28px] p-0 overflow-hidden bg-white border border-[#dfe9e4] shadow-2xl">
        {submitted ? (
          <div className="p-8 text-center sm:p-10">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-[#e3f2e8] text-[#146b5a] animate-in zoom-in-75 duration-300">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-bold tracking-tight text-[#17342f]">
              Message Received!
            </h3>
            <p className="mt-2 text-sm text-[#78918a] leading-6 max-w-sm mx-auto">
              Thank you for reaching out, <strong className="text-[#17342f]">{name}</strong>. Your inquiry has been sent directly to <strong className="text-[#146b5a]">arkokundu500@gmail.com</strong> via Resend.
            </p>
            <div className="mt-6 rounded-2xl bg-[#f4faf7] p-4 text-xs font-semibold text-[#50635e] border border-[#d2e5db]">
              <div className="flex items-center justify-center gap-1.5 text-[#146b5a] font-bold">
                <Sparkles size={14} /> DocX Priority Dispatch
              </div>
              <p className="mt-1 text-[11px] text-[#78918a]">
                A confirmation has been logged. Our operations team will respond to <strong>{email}</strong> within 24 hours.
              </p>
            </div>
            <div className="mt-7">
              <Button
                type="button"
                onClick={handleClose}
                className="w-full rounded-xl bg-[#146b5a] hover:bg-[#0e4c42] text-sm font-bold text-white py-3 shadow-md"
              >
                Close & Return
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="bg-[#103e38] p-6 sm:p-7 text-white">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold text-[#a9d9bd]">
                  <Mail size={13} /> Support & Inquiries
                </span>
                <span className="text-[11px] font-semibold text-white/60">
                  Resend Connected
                </span>
              </div>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">
                Contact DocX
              </h2>
              <p className="mt-1.5 text-xs text-white/70 leading-5">
                Have questions about booking appointments, hospital partnerships, or feedback? Send us a message and our team will get in touch.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#50635e] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Riya Kapoor"
                    className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-2.5 text-sm font-medium text-[#17342f] outline-none transition focus:border-[#146b5a] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#50635e] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-2.5 text-sm font-medium text-[#17342f] outline-none transition focus:border-[#146b5a] focus:bg-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#50635e] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3.5 py-2.5 text-sm font-medium text-[#17342f] outline-none transition focus:border-[#146b5a] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#50635e] mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] px-3 py-2.5 text-sm font-medium text-[#17342f] outline-none transition focus:border-[#146b5a] focus:bg-white"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Appointment Assistance">Appointment Assistance</option>
                    <option value="Partner with DocX">Hospital / Doctor Partnership</option>
                    <option value="Feedback">Feedback & Suggestions</option>
                    <option value="Technical Support">Technical Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#50635e] mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you? Tell us about your concern or enquiry..."
                  className="w-full rounded-xl border border-[#dfe9e4] bg-[#fbfaf6] p-3.5 text-sm font-medium text-[#17342f] outline-none transition focus:border-[#146b5a] focus:bg-white resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#edf2ef]">
                <span className="text-[11px] text-[#8da19a] flex items-center gap-1">
                  <ShieldCheck size={13} className="text-[#146b5a]" /> Direct delivery to arkokundu500@gmail.com
                </span>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    disabled={contactMutation.isPending}
                    className="rounded-xl border-[#dfe9e4] text-xs font-bold text-[#50635e]"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={contactMutation.isPending}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#146b5a] hover:bg-[#0e4c42] text-xs font-bold text-white px-5 shadow-sm"
                  >
                    {contactMutation.isPending ? (
                      "Sending…"
                    ) : (
                      <>
                        <Send size={13} /> Send Message
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function InfoModal({
  open,
  onOpenChange,
  title,
  subtitle,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px] rounded-[28px] p-6 sm:p-8 bg-white border border-[#dfe9e4] shadow-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold text-[#17342f] tracking-tight">
            {title}
          </DialogTitle>
          {subtitle && (
            <DialogDescription className="text-xs text-[#78918a] leading-5">
              {subtitle}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="mt-4 text-sm text-[#475b55] leading-relaxed space-y-4">
          {children}
        </div>
        <div className="mt-6 pt-4 border-t border-[#edf2ef] flex justify-end">
          <Button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-xl bg-[#146b5a] hover:bg-[#0e4c42] text-xs font-bold text-white px-6"
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
