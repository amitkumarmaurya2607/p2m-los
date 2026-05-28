"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { submitContactAction } from "@/lib/actions/contact.action";
import { showToast } from "@/lib/toast";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    const result = await submitContactAction({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
    });

    setIsSubmitting(false);
    if (result.success) {
      setIsSubmitted(true);
    } else {
      showToast({ message: result.error || "Something went wrong", type: "error" });
    }
  };

  if (isSubmitted) {
    return (
      <div
        className="bg-surface rounded-[32px] p-8 md:p-12 border border-primary/20 shadow-xl
          text-center animate-in zoom-in-95 duration-500"
      >
        <div
          className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center
            justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-2xl font-black text-text-heading mb-4">Message Sent Successfully!</h3>
        <p className="text-text-secondary leading-relaxed mb-8">
          Thank you for reaching out. Our team has received your message and will get back to you
          within 24 hours.
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-primary font-bold hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div
      className="bg-surface rounded-[32px] p-8 md:p-12 border border-border shadow-xl relative
        overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-10" />

      <h3 className="text-2xl font-black text-text-heading mb-8">Send us a Message</h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-secondary ml-1">Full Name</label>
            <TextInput name="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-secondary ml-1">Email Address</label>
            <TextInput name="email" type="email" placeholder="john@example.com" required />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-secondary ml-1">Phone Number</label>
            <TextInput name="phone" type="tel" placeholder="+91 XXXXX XXXXX" required />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-text-secondary ml-1">Subject</label>
            <TextInput name="subject" placeholder="Loan Inquiry" required />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-bold text-text-secondary ml-1">Your Message</label>
          <textarea
            name="message"
            className="w-full min-h-[150px] bg-surface-muted border border-border rounded-2xl p-4
              text-text-heading placeholder:text-text-muted outline-none focus:border-primary/50
              focus:ring-4 focus:ring-primary/5 transition-all resize-none"
            placeholder="How can we help you?"
            required
          ></textarea>
        </div>

        <GradientButton
          type="submit"
          disabled={isSubmitting}
          className="w-full h-14 !rounded-2xl text-lg font-bold shadow-lg shadow-primary/20"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Sending...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send size={20} />
              Send Message
            </div>
          )}
        </GradientButton>
      </form>
    </div>
  );
}
