"use client";
import React, { useState } from "react";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { CreditCard, Check, Landmark } from "lucide-react";
import { isValidIFSCCode, sanitizeNumeric, sanitizeIFSC } from "@/lib/utils";
import { verifyBankAction } from "@/lib/actions/verification.action";
import { showToast } from "@/lib/toast";

function BankDetails() {
  const [form, setForm] = useState({
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: "",
    benName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const userId =
    typeof window !== "undefined"
      ? document.cookie
        .split("; ")
        .find((r) => r.startsWith("p2m-user-id="))
        ?.split("=")[1] || ""
      : "";

  const handleChange = (key: string, value: string) => {
    let v = value;

    if (key.includes("accountNumber")) {
      v = sanitizeNumeric(value);
    }

    if (key === "ifscCode") {
      v = sanitizeIFSC(value);
    }

    setForm((prev) => ({ ...prev, [key]: v }));

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const err: Record<string, string> = {};

    if (!form.accountNumber) err.accountNumber = "Required";
    if (!form.confirmAccountNumber) err.confirmAccountNumber = "Required";
    if (form.accountNumber !== form.confirmAccountNumber) {
      err.confirmAccountNumber = "Account numbers do not match";
    }

    if (!form.ifscCode) err.ifscCode = "Required";
    else if (!isValidIFSCCode(form.ifscCode)) {
      err.ifscCode = "Invalid IFSC";
    }

    if (!form.benName) err.benName = "Required";

    return err;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    try {
      setLoading(true);

      const result = await verifyBankAction({
        userId,
        accountNumber: form.accountNumber,
        ifscCode: form.ifscCode,
        benName: form.benName,
      });
      if (result?.success) {
        setVerified(true);

        showToast({
          message: "Personal information added successfully!",
          type: "success",
        });
        return;
      }

      const errorMsg = result?.error || "Something went wrong";
      setErrors((prev) => ({ ...prev, bank: errorMsg }));
      showToast({ message: errorMsg, type: "error" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      showToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const maskedAccount = form.accountNumber
    ? `XXXX XXXX ${form.accountNumber.slice(-4)}`
    : "XXXX XXXX XXXX";

  if (verified) {
    return (
      <div
        className="w-full max-w-[576px] bg-surface-overlay-90 border border-border-light p-8 lg:p-12
          rounded-[16px] lg:rounded-[32px] shadow-[var(--shadow-lg)]"
      >
        <div
          className="mx-auto flex h-16 w-16 lg:h-28 lg:w-28 items-center justify-center rounded-full
            bg-gradient-to-r from-home-green to-home-green-dark shadow-[var(--shadow-green-glow)]"
        >
          <Check className="h-8 w-8 lg:h-14 lg:w-14 text-white" strokeWidth={4} />
        </div>

        <h2
          className="mt-6 lg:mt-8 text-center text-[28px] lg:text-[36px] font-extrabold leading-10
            tracking-[-0.9px] text-text-heading"
        >
          Bank Account Verified!
        </h2>

        <p
          className="mt-4 text-center text-[14px] lg:text-[18px] font-medium leading-[29px]
            text-text-muted-dark"
        >
          Your bank account has been successfully verified. Proceed to the next step.
        </p>

        <div className="mt-10 rounded-[24px] border border-border-medium bg-surface-muted px-6 py-6">
          <div className="space-y-4">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-muted-light">
                Account Number
              </p>
              <p className="mt-1 font-mono text-[20px] font-bold text-[#1D293D]">{maskedAccount}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-muted-light"
                >
                  IFSC Code
                </p>
                <p className="mt-1 font-mono text-[16px] font-bold text-[#1D293D]">
                  {form.ifscCode}
                </p>
              </div>

              <div>
                <p
                  className="text-[12px] font-bold uppercase tracking-[0.6px] text-text-muted-light"
                >
                  Beneficiary
                </p>
                <p className="mt-1 text-[16px] font-bold text-[#1D293D]">{form.benName}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <GradientButton
            onClick={() => (window.location.href = "/selfie-capture")}
            type="button"
            className="w-full mt-4 sm:mt-6 bg-gradient-to-r from-home-purple to-home-purple-dark"
          >
            Next Step
          </GradientButton>
        </div>
      </div>
    );
  }

  return (
    <StepCard
      title=" Bank Verification"
      subtitle="Your loan amount will be disbursed to this verified account."
      steper={true}
      icon={<Landmark className="w-5 h-5 text-primary" />}
      className="lg:w-[800px] mx-auto"
      tips={{
        title: "Bank Account Verification",
        description:
          "Please provide your bank account details accurately to enable secure loan disbursement, EMI processing, and seamless transaction verification.",
        Icon: <Landmark className="w-5 h-5 text-primary" />,
        noteTitle: "Safe Banking Information",
        noteDescription:
          "Your banking details are securely encrypted and used only for verification, disbursement, and repayment-related processes.",
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Bank Account Number"
            value={form.accountNumber}
            onChange={(e) => handleChange("accountNumber", e.target.value)}
            error={errors.accountNumber}
            require
          />

          <TextInput
            label="Re-enter Account Number"
            value={form.confirmAccountNumber}
            onChange={(e) => handleChange("confirmAccountNumber", e.target.value)}
            error={errors.confirmAccountNumber}
            require
          />

          <TextInput
            label="IFSC CODE"
            value={form.ifscCode}
            onChange={(e) => handleChange("ifscCode", e.target.value)}
            error={errors.ifscCode}
            maxLength={11}
            require
          />

          <TextInput
            label="Beneficiary Name"
            value={form.benName}
            onChange={(e) => handleChange("benName", e.target.value)}
            error={errors.benName}
            require
          />
        </div>

        {/* Info Box */}
        <div
          className="flex items-start gap-3 p-4 sm:p-5 rounded-xl border border-info/30 bg-info/10
            text-info"
        >
          <CreditCard className="w-5 h-5 mt-1 shrink-0" />
          <p className="text-xs sm:text-sm leading-relaxed">
            We will deposit <b>₹1.00</b> to verify this account securely. Your data is encrypted and
            completely safe.
          </p>
        </div>

        {errors.bank && <p className="text-sm text-destructive text-center">{errors.bank}</p>}

        {/* Button */}
        <GradientButton type="submit" className="w-full mt-4 sm:mt-6" disabled={loading}>
          {loading ? "Verifying..." : "Verify Bank Account"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default BankDetails;
