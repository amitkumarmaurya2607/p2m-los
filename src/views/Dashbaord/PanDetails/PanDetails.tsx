"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { ChevronRight, CreditCard, ShieldCheck } from "lucide-react";
import { isValidPAN, sanitizePAN } from "@/lib/utils";
import { verifyPANAction } from "@/lib/actions/verification.action";
import { showToast } from "@/lib/toast";
function PanDetails() {
  const router = useRouter();
  const [pan, setPan] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

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
      setError("");

      const result = await verifyPANAction(pan);

      if (result?.success) {
        showToast({
          message: "PAN verified successfully!",
          type: "success",
        });
        setIsRedirect(true);
        router.push("/personal-info");
      } else if (result?.error) {
        setError(result?.error || "PAN verification failed");
        return;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="PAN Verification"
      subtitle="Please enter your 10-digit PAN number."
      steper={true}
      className="lg:w-[600px] mx-auto"
      icon={<CreditCard className="w-6 h-6 text-primary" />}
      tips={{
        title: "Why PAN?",
        description:
          "PAN is essential for identity verification, credit checks, and regulatory compliance in the loan application process.",
        Icon: <ShieldCheck className="w-5 h-5 text-primary" />,
        noteTitle: "Protected Information",
        noteDescription:
          "Your PAN information is securely encrypted and processed in compliance with financial security standards.",
      }}
    >
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

        <GradientButton
          type="submit"
          className="mt-8 w-full"
          disabled={isRedirect || loading}
          rightIcon={!loading && !isRedirect && <ChevronRight className="w-5 h-5" />}
        >
          {isRedirect ? "Redirecting..." : loading ? "Verifying..." : "Verify PAN"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default PanDetails;
