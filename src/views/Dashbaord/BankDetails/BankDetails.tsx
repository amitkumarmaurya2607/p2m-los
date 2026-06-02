"use client";
import React, { useState } from "react";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { CreditCard, Check, Landmark } from "lucide-react";
import { isValidIFSCCode, sanitizeNumeric, sanitizeIFSC } from "@/lib/utils";
import { verifyBankAction } from "@/lib/actions/verification.action";
import { callSecure } from "@/lib/secure-action";
import { showToast } from "@/lib/toast";
import BankDetailsVerify from "./BankDetailsVerify";

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

      const result = await callSecure(verifyBankAction, {
        accountType: "SAVINGS",
        accountNumber: form.accountNumber,
        ifscCode: form.ifscCode,
        bankName: form.benName,
        // bankAddress: ""
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

  const bankDetails = {
    id: "064bed49-317a-444c-8fed-274d7c3b4c4f",
    userId: "25d1260c-180d-4377-8732-fc4c71d75c7d",
    accountHolderName: "Ajitha Goparaju",
    accountNumber: "59191182222",
    ifscCode: "IDIB000D578",
    bankName: "indian bank",
    accountType: "SAVINGS",
    isVerified: false,
    verificationStatus: "VERIFIED",
    userDataStatus: "NOT_VERIFIED",
    isPrimary: true,
  };


  if (verified) {
    return (
      <BankDetailsVerify bankDetails={bankDetails} />
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
            label="Bank Name"
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
