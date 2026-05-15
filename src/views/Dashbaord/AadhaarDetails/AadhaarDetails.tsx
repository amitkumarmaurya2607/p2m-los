"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import OTPInput from "@/components/OTPInput/OTPInput";
import ResendTimer from "@/components/ResendTimer/ResendTimer";
import { useApplicationContext } from "@/context/ApplicationContext";
import { isValidAadhaar, sanitizeNumeric } from "@/lib/utils";
import { Fingerprint } from "lucide-react";
import { sendAadhaarOTPAction, verifyAadhaarOTPAction } from "@/lib/actions/verification.action";

type AadhaarDetailsProps = {
  resend?: () => void;
};

function AadhaarDetails({ resend = () => { } }: AadhaarDetailsProps) {
  const router = useRouter();
  const { application, setAadhaarData } = useApplicationContext();

  const [aadhaar, setAadhaar] = useState(application.aadhaar?.number || "");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"aadhaar" | "otp">("aadhaar");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = sanitizeNumeric(e.target.value);
    setAadhaar(value);
    if (error) setError("");
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aadhaar) {
      setError("Aadhaar is required");
      return;
    }

    if (!isValidAadhaar(aadhaar)) {
      setError("Enter valid 12-digit Aadhaar");
      return;
    }

    try {
      setLoading(true);

      const result = await sendAadhaarOTPAction(aadhaar);

      if (!result.success) {
        setError(result.error || "Failed to send OTP");
        return;
      }

      setStep("otp");
    } finally {
      setLoading(false);
    }
  };

  // 👉 Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const result = await verifyAadhaarOTPAction(aadhaar, otp);

      if (result?.error) {
        setError(result.error);
        return;
      }

      setAadhaarData({ number: aadhaar, verified: true });
      router.push("/bank-details");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="Aadhaar Verification"
      subtitle={
        step === "aadhaar"
          ? "Enter your Aadhaar number to receive OTP"
          : " OTP sent to Aadhaar linked mobile"
      }
      back={step === "aadhaar" ? undefined : () => setStep("aadhaar")}
      steper={true}
      tips={{
        title: "Aadhaar Verification",
        description: "To continue your application, please verify your Aadhaar details securely. This helps us confirm your identity, prevent fraud, and ensure compliance with financial regulations.",
        Icon: <Fingerprint className="w-5 h-5 text-primary" />,
        noteTitle: "Secure & Confidential",
        noteDescription: "Your Aadhaar information is encrypted with bank-grade security standards and is used only for identity verification and compliance purposes."
      }}
    >
      {step === "aadhaar" ? (
        <form onSubmit={handleSendOtp} className="space-y-4">
          <TextInput
            label="Aadhaar Number"
            value={aadhaar}
            onChange={handleAadhaarChange}
            error={error}
            maxLength={12}
            require
          />

          <GradientButton type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Sending OTP..." : "Send OTP"}
          </GradientButton>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          {/* <p className="text-sm text-gray-500">
            OTP sent to Aadhaar linked mobile
          </p> */}

          <OTPInput
            length={6}
            onComplete={(code) => {
              setOtp(code);
              if (error) setError("");
            }}
          />

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <GradientButton type="submit" className="w-full mt-6" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
          </GradientButton>

          {/* Resend */}
          <p className="mt-6 text-center text-sm text-text-muted flex justify-center gap-1">
            <span>Didn't receive code?</span>
            <ResendTimer onResend={resend} />
          </p>
        </form>
      )}
    </StepCard>
  );
}

export default AadhaarDetails;
