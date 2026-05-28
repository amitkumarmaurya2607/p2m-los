"use client";
import OTPInput from "@/components/OTPInput/OTPInput";
import ResendTimer from "@/components/ResendTimer/ResendTimer";
import GradientButton from "@/components/ui/GradientButton";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { maskEmail, maskMobile } from "@/lib/utils";
import StepCard from "../Dashbaord/componants/StepCard";
import { verifyOTPAction } from "@/lib/actions/auth.action";
import { loginVerifyPayload } from "./type";

type OTPVerifyProps = {
  resend?: () => void;
  method?: string;
  userName: string;
  back: () => void;
  userId: string;
};

function OTPVerify({ resend = () => {}, method, userName, back, userId }: OTPVerifyProps) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const maskedValue = method === "email" ? maskEmail(userName) : maskMobile(userName);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.length !== 6) {
      setError("Enter valid 6-digit OTP");
      showToast({ message: "Please enter a valid 6-digit OTP", type: "error" });
      return;
    }

    try {
      setLoading(true);
      const payload: loginVerifyPayload = {
        mobileNumber: userName,
        userId: userId,
        otp: otp,
      };
      const result = await verifyOTPAction(payload);
      // Debugging line
      if (result?.error) {
        setError(result.error);
        showToast({ message: result.error, type: "error" });
        return;
      }
      setIsRedirect(true);
      showToast({ message: "OTP verified successfully!", type: "success" });

      router.push("/geo-location");
    } catch (err) {
      showToast({ message: "Invalid OTP. Please try again.", type: "error" });
      setError("Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center p-6
        bg-[url('/images/loginBg.jpg')] lg:bg-none"
    >
      <StepCard
        title="Verify OTP"
        subtitle={`We've sent a 6-digit code to your ${
          method === "email" ? "email" : "mobile number"
        } (${maskedValue})`}
        className="w-full max-w-[448px]"
        back={back}
      >
        <form className="space-y-4" onSubmit={handleSubmit}>
          <OTPInput
            length={6}
            onComplete={(code) => {
              setOtp(code);
              if (error) setError("");
            }}
          />

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <GradientButton type="submit" disabled={loading} className="mt-6">
            {isRedirect ? "Redirecting..." : loading ? "Verifying..." : "Verify & Continue"}
          </GradientButton>

          <p className="mt-6 text-center text-sm text-text-muted flex justify-center gap-1">
            <span>Didn't receive code?</span>
            <ResendTimer disabled={loading || isRedirect} onResend={resend} />
          </p>
        </form>
      </StepCard>
    </div>
  );
}

export default OTPVerify;
