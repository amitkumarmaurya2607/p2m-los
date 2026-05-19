"use client";

import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import OTPVerify from "./OTPVerify";
import TextInput from "@/components/ui/TextInput";
import { isValidEmail, isValidMobile, sanitizeEmail, sanitizeNumeric } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import Logo from "@/assets/icon/Logo";
import { Popup } from "@/components/ui/Popup";
import StepCard from "../Dashbaord/componants/StepCard";
import { sendOTPAction } from "@/lib/actions/auth.action";
import Link from "next/link";

const Login = () => {
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [sendOtp, setSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>("");
  const [error, setError] = useState("");

  const [accepted, setAccepted] = useState(false);


  const validate = () => {
    if (method === "mobile") return isValidMobile(userName);
    return isValidEmail(userName);
  };

  const submitHandler = (e?: React.FormEvent | null, type?: "resend") => {
    e?.preventDefault();

    if (!accepted) {
      showToast({ message: "Please accept Terms & Conditions", type: "error" });
      return;
    }

    const isValid = validate();

    if (!isValid) {
      const msg = method === "mobile" ? "Enter valid mobile number" : "Enter valid email";

      setError(msg);
      showToast({ message: msg, type: "error" });
      return;
    }

    setError("");
    setLoading(true);

    sendOTPAction(userName).then((result) => {
      setLoading(false);
      if (result.success) {
        setSendOtp(true);
        showToast({
          message: type === "resend" ? "OTP resent successfully!" : "OTP sent successfully!",
          type: "success",
        });
      } else {
        setError(result.error || "Failed to send OTP");
        showToast({ message: result.error || "Failed to send OTP", type: "error" });
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (method === "email") {
      value = sanitizeEmail(value);
      setUserName(value);
      return;
    }

    let raw = value.replace("+91", "");
    let digits = sanitizeNumeric(raw).slice(0, 10);

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
            <Logo />
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
            <form
              onSubmit={submitHandler}

            >


              <div className="space-y-4">
                <TextInput
                  type={method === "mobile" ? "tel" : "email"}
                  label={method === "mobile" ? "Mobile Number" : "Email Address"}
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
                <GradientButton type="submit" loading={loading} disabled={!accepted} className="mt-6">
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
          method={method}
          userName={userName}
        />
      )}


    </>
  );
};

export default Login;
