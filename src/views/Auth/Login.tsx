"use client";

import GradientButton from "@/components/ui/GradientButton";
import { ArrowRight } from "lucide-react";
import React, { ButtonHTMLAttributes, useState } from "react";
import OTPVerify from "./OTPVerify";
import TextInput from "@/components/ui/TextInput";
import { isValidEmail, isValidMobile } from "@/lib/utils";
import { showToast } from "@/lib/toast";
import Logo from "@/assets/icon/Logo";

const Login = () => {
  const [method, setMethod] = useState<"mobile" | "email">("mobile");
  const [sendOtp, setSendOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState<string>(""); // ✅ no +91 initially
  const [error, setError] = useState<string>("");

  const validate = () => {
    if (method === "mobile") return isValidMobile(userName);
    return isValidEmail(userName);
  };

  const submitHandler = (e?: React.FormEvent | null, type?: "resend") => {
    e?.preventDefault();

    const isValid = validate();

    if (!isValid) {
      const msg = method === "mobile" ? "Enter valid mobile number" : "Enter valid email";

      setError(msg);
      showToast({ message: msg, type: "error" });
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSendOtp(true);

      showToast({
        message: type === "resend" ? "OTP resent successfully!" : "OTP sent successfully!",
        type: "success",
      });
    }, 1500);
  };

  const switchMethod = (e: React.MouseEvent<HTMLElement>, type: "mobile" | "email") => {
    e.stopPropagation();
    setMethod(type);
    setUserName("");
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (method === "email") {
      value = value.replace(/[^a-zA-Z0-9@._-]/g, "");
      setUserName(value);
      return;
    }

    // MOBILE LOGIC
    let raw = value.replace("+91", "");
    let digits = raw.replace(/\D/g, "").slice(0, 10);

    if (digits.length > 0) {
      setUserName("+91" + digits);
    } else {
      setUserName("");
    }
  };

  return (
    <>
      {!sendOtp ? (
        <div
          className="w-full lg:w-1/2 bg-surface-muted flex items-center justify-center flex-col
            lg:flex-row p-6 bg-[url('/images/boginBanner.webp')] lg:bg-none"
        >
          <div className="lg:hidden text-primary-foreground max-w-[400px] mx-auto mb-8">
            <div>
              <Logo />
            </div>
            <h1 className="text-[32px] font-extrabold leading-[40.8px]">
              Access your <br />
              financial dashboard
            </h1>
            <p className="text-[15.6px] font-normal leading-[19.04px] tracking-[0px]">
              Instant loans, seamless process, and secure digital journeys. Empowering your
              financial future.
            </p>
          </div>
          <form
            onSubmit={submitHandler}
            className="w-full max-w-[448px] flex flex-col gap-2 p-8 lg:p-12 bg-card-bg border
              border-card-border bg-background text-foreground lg:rounded-[32px] rounded-[16px]
              shadow-[var(--shadow-md)] [&>*]:w-full"
          >
            <header className="mb-8">
              <h2 className="text-2xl font-bold text-text-heading">Welcome back</h2>
              <p className="text-text-muted text-sm mt-3">Please enter your details to sign in.</p>
            </header>

            <div className="space-y-4">
              <TextInput
                type={method === "mobile" ? "tel" : "email"}
                label={method === "mobile" ? "Mobile Number" : "Email Address"}
                onChange={handleChange}
                value={userName}
                error={error}
              />

              <GradientButton type="submit" loading={loading} className="mt-6">
                <span className="flex items-center gap-2">
                  Get OTP
                  <ArrowRight className="w-5 h-5" />
                </span>
              </GradientButton>
            </div>
          </form>
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
