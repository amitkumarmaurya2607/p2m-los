"use client";
import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import OTPVerify from "./OTPVerify";
import TextInput from "@/components/ui/TextInput";
import { isValidMobile, sanitizeNumeric } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import StepCard from "../Dashbaord/componants/StepCard";
import { sendOTPAction } from "@/lib/actions/auth.action";
import { callSecure } from "@/lib/secure-action";
import Link from "next/link";
import { decrypt, encrypt } from "@/lib/crypto";

const Login = ({ type }: { type?: string }) => {
  const [sendOtp, setSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");
  const [userId, setUserId] = useState<string>("");

  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    if (type === "exp") {
      showToast({ message: "Your session has expired. Please sign in again.", type: "error" });
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, [type]);

  const validate = () => {
    return isValidMobile(userName);
  };

  const submitHandler = (e?: React.FormEvent | null, type?: "resend") => {
    e?.preventDefault();

    if (!accepted) {
      showToast({ message: "Please accept Terms & Conditions", type: "error" });
      return;
    }

    const isValid = validate();

    if (!isValid) {
      const msg = "Enter valid mobile number";

      setError(msg);
      showToast({ message: msg, type: "error" });
      return;
    }

    setError("");
    setLoading(true);

    callSecure(sendOTPAction, userName).then((result) => {
      setLoading(false);
      console.log("sendOTPAction result in component:", result); // Debugging line
      if ("success" in result && result.success) {
        setUserId(result.data?.id);
        setSendOtp(true);
        showToast({
          message: type === "resend" ? "OTP resent successfully!" : "OTP sent successfully!",
          type: "success",
        });
      } else {
        const errorMsg = "error" in result ? result.error : "Failed to send OTP";
        setError(errorMsg);
        showToast({ message: errorMsg, type: "error" });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const raw = value.replace("+91", "");
    const digits = sanitizeNumeric(raw).slice(0, 10);

    setUserName(digits ? "+91" + digits : "");
  };

  return (
    <>
      {!sendOtp ? (
        <div
          className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center flex-col
            lg:flex-row p-6 bg-[url('/images/loginBg.jpg')] lg:bg-none"
        >
          {/* Mobile Header */}
          <div className="lg:hidden text-primary-foreground max-w-[400px] mx-auto mb-8">
            <Link href="/" className="flex items-center gap-2">
              <span
                className="h-8 w-8 rotate-12 rounded-[10px] bg-gradient-to-br from-secondary
                  to-primary shadow-lg shadow-primary/20 text-[18px] font-bold leading-none
                  text-white items-center flex justify-center"
              >
                R
              </span>
              <span className="text-[24px] font-black leading-8 tracking-[-1.2px] text-white">
                RinSetu<span className="text-secondary">.</span>
              </span>
            </Link>
            <h1 className="text-[32px] font-extrabold leading-[40.8px]">
              Access your <br /> financial dashboard
            </h1>
            <p className="text-[15.6px]">
              Instant loans, seamless process, and secure digital journeys.
            </p>
          </div>

          <StepCard
            title="Welcome back"
            subtitle="Please enter your details to sign in."
            className="w-full max-w-[448px] items-start lg:items-center"
          >
            {type === "exp" && (
              <div
                className="mb-4 rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm
                  text-yellow-800"
              >
                Your session has expired. Please sign in again.
              </div>
            )}
            <form onSubmit={submitHandler}>
              <div className="space-y-4">
                <TextInput
                  label={"Mobile Number"}
                  onChange={handleChange}
                  value={userName}
                  error={error}
                />

                {/* ✅ Checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="mt-1 w-4 h-4 accent-secondary cursor-pointer"
                  />

                  <p className="text-sm text-text-secondary">
                    I agree to the{" "}
                    <Link
                      href="/terms-and-conditions"
                      className="text-primary font-medium underline"
                    >
                      Terms & Conditions
                    </Link>
                  </p>
                </div>

                {/* Button */}
                <GradientButton
                  type="submit"
                  loading={loading}
                  disabled={!accepted}
                  className="mt-6"
                >
                  <span className="flex items-center gap-2">
                    Get OTP
                    <ArrowRight className="w-5 h-5" />
                  </span>
                </GradientButton>
              </div>
            </form>
          </StepCard>
        </div>
      ) : (
        <OTPVerify
          back={() => setSendOtp(false)}
          resend={() => submitHandler(null, "resend")}
          method={"mobile"}
          userName={userName}
          userId={userId}
        />
      )}
    </>
  );
};

export default Login;
