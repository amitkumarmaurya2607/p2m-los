"use client";
import React, { useState } from "react";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { ChevronRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useApplicationContext } from "@/context/ApplicationContext";
import { isValidPAN, sanitizePAN } from "@/lib/utils";
import StepNotes from "../componants/StepNotes";
function PanDetails() {
  const { application, setPanData } = useApplicationContext();
  const [pan, setPan] = useState(application.pan?.number || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizePAN(e.target.value);

    setPan(value);

    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!pan) {
      setError("PAN is required");
      return;
    }

    if (!isValidPAN(pan)) {
      setError("Invalid PAN format");
      return;
    }

    try {
      setLoading(true);

      // 👉 simulate API call
      await new Promise((res) => setTimeout(res, 1200));

      console.log("PAN Submitted:", pan);

      setPanData({ number: pan });

      // ✅ redirect to next step
      router.push("/personal-info");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
     <div className="flex gap-12">


<StepNotes
  icon={<ShieldCheck className="w-5 h-5 text-primary" />}
  title="Verify Your PAN"
  description="To continue your application, please enter your valid PAN number. Your information is protected with advanced encryption and used only for secure identity verification and regulatory compliance."
  noteTitle="Protected Information"
  noteDescription="Your PAN information is securely encrypted and processed in compliance with financial security standards."
/>
      <StepCard title="PAN Verification" subtitle="Please enter your 10-digit PAN number.">
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          type="text"
          label="PAN Number"
          value={pan}
          onChange={handleChange}
          error={error}
          maxLength={10}
          require
        />

        <GradientButton type="submit" className="mt-8 w-full" disabled={loading}>
          <span className="flex items-center justify-center gap-2">
            {loading ? "Verifying..." : "Verify PAN"}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </span>
        </GradientButton>
      </form>
    </StepCard>
     </div>
  );
}

export default PanDetails;
