"use client";

import React, { useState } from "react";

import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "../componants/StepCard";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { useRouter } from "next/navigation";
import OTPInput from "@/components/OTPInput/OTPInput";
import { CheckCircle, Fingerprint, Lightbulb } from "lucide-react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { isValidEmail, sanitizeNumeric } from "@/lib/utils";
import RadioButtonGroup from "@/components/ui/RadioButtonGroup";
import { sendEmailOTPAction, submitPersonalInfoAction } from "@/lib/actions/personal-info.action";

const genders = ["Male", "Female", "Other"];
const employmentTypes = ["Salaried", "Self-Employed"];

function PersonalInfo() {
  const { application, setPersonalInfo } = useApplicationContext();
  const saved = application.personalInfo;

  const [form, setForm] = useState({
    fullName: saved?.fullName || "",
    fatherName: saved?.fatherName || "",
    email: saved?.email || "",
    dob: saved?.dob || "",
    gender: saved?.gender || "Male",
    salary: saved?.salary || "",
    employmentType: saved?.employmentType || "Salaried",
    address1: saved?.address1 || "",
    address2: saved?.address2 || "",
    pincode: saved?.pincode || "",
    city: saved?.city || "",
    state: saved?.state || "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [serverOtp, setServerOtp] = useState("");
  const [sendingOtp, setSendingOtp] = useState(false);
  const router = useRouter();

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    if (key === "email") {
      setEmailVerified(false);
      setOtpSent(false);
      setOtp("");
      setServerOtp("");
    }

    if (errors[key]) {
      setErrors((prev: any) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSendOtp = async () => {
    if (!form.email) {
      setErrors((prev: any) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrors((prev: any) => ({ ...prev, email: "Invalid email" }));
      return;
    }

    setSendingOtp(true);

    try {
      const result = await sendEmailOTPAction(form.email);

      if (!result.success) {
        setErrors((prev: any) => ({ ...prev, email: result.error || "Failed to send OTP" }));
        return;
      }

      setServerOtp(result.data?.otp || "");
      setOtpSent(true);
      setOtp("");
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp) {
      setErrors((prev: any) => ({ ...prev, otp: "OTP is required" }));
      return;
    }

    if (otp !== serverOtp) {
      setErrors((prev: any) => ({ ...prev, otp: "Invalid OTP" }));
      return;
    }

    setEmailVerified(true);
    setOtpSent(false);
    setErrors((prev: any) => ({ ...prev, otp: "" }));
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.fatherName) newErrors.fatherName = "Father name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email";
    } else if (!emailVerified) {
      newErrors.email = "Please verify your email";
    }

    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.salary) newErrors.salary = "Salary is required";
    if (!form.address1) newErrors.address1 = "Address is required";

    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (form.pincode.length !== 6) {
      newErrors.pincode = "Invalid pincode";
    }

    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const result = await submitPersonalInfoAction(form);

      if (!result.success) {
        setErrors((prev: any) => ({ ...prev, submit: result.error || "Submission failed" }));
        return;
      }

      setPersonalInfo(form);
      router.push("/aadhar-details");
    } catch (err) {
      setErrors((prev: any) => ({ ...prev, submit: "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="Basic Info"
      subtitle="To continue, please share some basic personal information. It helps us confirm your identity and ensure everything is ready for a seamless experience."
      className="lg:w-[800px] mx-auto"
      tips={{
        title: "Personal Details",
        description: "Please provide your personal information accurately to help us verify your identity, communicate important updates, and complete your application process smoothly.",
        Icon: <Fingerprint className="w-5 h-5 text-primary" />,
        noteTitle: "Important Tips",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
              Enter your active email address and verify it before continuing.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
              Ensure your name matches your PAN and Aadhaar records.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
              Double-check your mobile number for important application updates.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="Full Name (as per PAN)"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              error={errors.fullName}
              require
            />

            <TextInput
              label="Father Name"
              value={form.fatherName}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              error={errors.fatherName}
              require
            />
          </div>
        </div>

        {/* DOB + Salary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDatePicker
            label="Date of Birth"
            value={form.dob ? new Date(form.dob) : (null as any)}
            onChange={(date: Date | null) => handleChange("dob", date ? date.toISOString() : "")}
            error={errors.dob}
            required
          />

          <TextInput
            label="Monthly Salary"
            value={form.salary}
            onChange={(e) => handleChange("salary", sanitizeNumeric(e.target.value))}
            error={errors.salary}
            require
          />
        </div>

        {/* Gender + Employment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <RadioButtonGroup
            heading="Gender"
            name="gender"
            options={genders.map(g => ({ value: g, label: g }))}
            value={form.gender}
            onChange={(v) => handleChange("gender", v)}
          />
          <RadioButtonGroup
            heading="Employment Type"
            name="employmentType"
            options={employmentTypes.map(t => ({ value: t, label: t }))}
            value={form.employmentType}
            onChange={(v) => handleChange("employmentType", v)}
          />
        </div>

        {/* Email Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Email Details</h3>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <TextInput
                  type="email"
                  label="Email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  error={errors.email}
                  require
                  rightIcon={
                    !emailVerified ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={sendingOtp}
                        className="h-[36px] px-4 rounded-xl border border-primary text-primary
                          text-sm font-medium hover:bg-primary-muted whitespace-nowrap disabled:opacity-50"
                      >
                        Verify Email
                      </button>
                    ) : (
                      <CheckCircle className="w-6 h-6 text-success text-sm" />
                    )
                  }
                />
              </div>
            </div>

            {otpSent && !emailVerified && (
              <div className="space-y-2">
                <div className="flex gap-3">
                  <OTPInput
                    length={6}
                    onComplete={(code) => {
                      setOtp(code);
                    }}
                  />

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="h-[48px] px-5 rounded-xl bg-primary text-white text-sm font-medium
                      whitespace-nowrap"
                  >
                    Verify
                  </button>
                </div>

                {errors.otp && <p className="text-sm text-error">{errors.otp}</p>}
              </div>
            )}

            {emailVerified && (
              <p className="text-sm font-medium text-success">Email verified successfully</p>
            )}
          </div>
        </div>

        {/* Address */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Address Details</h3>

          <div className="space-y-4">
            <TextInput
              label="Address Line 1"
              value={form.address1}
              onChange={(e) => handleChange("address1", e.target.value)}
              error={errors.address1}
              require
            />

            <TextInput
              label="Address Line 2 (Optional)"
              value={form.address2}
              onChange={(e) => handleChange("address2", e.target.value)}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TextInput
                label="Pincode"
                value={form.pincode}
                onChange={(e) => handleChange("pincode", sanitizeNumeric(e.target.value))}
                maxLength={6}
                error={errors.pincode}
                require
              />

              <TextInput
                label="City"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={errors.city}
                require
              />
            </div>

            <TextInput
              label="State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              error={errors.state}
              require
            />
          </div>
        </div>

        <GradientButton type="submit" className="w-full mt-4" disabled={loading || !emailVerified}>
          {loading ? "Submitting..." : "Submit"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default PersonalInfo;
