"use client";

import React, { useState } from "react";

import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "../componants/StepCard";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { useRouter } from "next/navigation";
import OTPInput from "@/components/OTPInput/OTPInput";
import { CheckCircle } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPersonalInfo, selectApplication } from "@/features/application/applicationSlice";

const genders = ["Male", "Female", "Other"];
const employmentTypes = ["Salaried", "Self-Employed"];

function PersonalInfo() {
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectApplication);
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

  const isValidEmail = (email: string) => /^\S+@\S+\.\S+$/.test(email);

  const handleSendOtp = () => {
    if (!form.email) {
      setErrors((prev: any) => ({ ...prev, email: "Email is required" }));
      return;
    }

    if (!isValidEmail(form.email)) {
      setErrors((prev: any) => ({ ...prev, email: "Invalid email" }));
      return;
    }

    const generatedOtp = "123456";
    setServerOtp(generatedOtp);
    setOtpSent(true);
    setOtp("");

    alert(`OTP Sent: ${generatedOtp}`);
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

      await new Promise((res) => setTimeout(res, 1500));

      console.log("Submitted:", form);

      dispatch(setPersonalInfo(form));

      router.push("/aadhar-details");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard title="Basic Info" subtitle="" className="w-full max-w-3xl mx-auto">
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
            />

            <TextInput
              label="Father Name"
              value={form.fatherName}
              onChange={(e) => handleChange("fatherName", e.target.value)}
              error={errors.fatherName}
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
          />

          <TextInput
            label="Monthly Salary"
            value={form.salary}
            onChange={(e) => handleChange("salary", e.target.value.replace(/\D/g, ""))}
            error={errors.salary}
          />
        </div>

        {/* Gender + Employment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-sm mb-2 text-text-secondary">Gender</p>
            <div className="flex gap-2 flex-wrap">
              {genders.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleChange("gender", g)}
                  className={`px-4 py-2 rounded-xl border ${
                    form.gender === g
                      ? "border-primary text-primary bg-primary-muted"
                      : "border-border text-text-secondary"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm mb-2 text-text-secondary">Employment Type</p>
            <div className="flex gap-2 flex-wrap">
              {employmentTypes.map((type) => (
                <button
                  type="button"
                  key={type}
                  disabled
                  onClick={() => handleChange("employmentType", type)}
                  className={`px-4 py-2 rounded-xl border ${
                    form.employmentType === type
                      ? "border-primary text-primary bg-primary-muted"
                      : "border-border text-text-secondary"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
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
                  rightIcon={
                    !emailVerified ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="h-[36px] px-4 rounded-xl border border-primary text-primary text-sm font-medium hover:bg-primary-muted whitespace-nowrap"
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
                    className="h-[48px] px-5 rounded-xl bg-primary text-white text-sm font-medium whitespace-nowrap"
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
                onChange={(e) => handleChange("pincode", e.target.value.replace(/\D/g, ""))}
                maxLength={6}
                error={errors.pincode}
              />

              <TextInput
                label="City"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                error={errors.city}
              />
            </div>

            <TextInput
              label="State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              error={errors.state}
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
