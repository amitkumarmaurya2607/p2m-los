"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "../componants/StepCard";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import RadioButtonGroup from "@/components/ui/RadioButtonGroup";
import { User, Lightbulb } from "lucide-react";
import { cleanAddress, isValidEmail, sanitizeNumeric } from "@/lib/utils";
import { submitPersonalInfoAction } from "@/lib/actions/personal-info.action";
import { callSecure } from "@/lib/secure-action";
import PulseDot from "@/components/PulseDot";
import { showToast } from "@/lib/toast";
import { getProfileDataAction } from "@/lib/actions/other.action";

function PersonalInfo() {
  const router = useRouter();

  useEffect(() => {
    getDetails();
  }, []);
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    fatherName: "",
    email: "",
    dob: "",
    state: "",
    city: "",
    pincode: "",
    address: "",
    gender: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<unknown | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.fatherName) newErrors.fatherName = "Father name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.dob) newErrors.dob = "Date of birth is required";

    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (form.pincode.length !== 6) {
      newErrors.pincode = "Invalid pincode";
    }

    if (!form.city) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.address) newErrors.address = "Address is required";
    if (!form.gender) newErrors.gender = "Gender is required";

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

      const result = await callSecure(submitPersonalInfoAction, form);

      if (result?.success) {
        setIsRedirect(true);
        router.push("/aadhar-details");
        showToast({
          message: "Personal information added successfully!",
          type: "success",
        });
        return;
      }
      showToast({
        message: result?.error || "Submission failed",
        type: "error",
      });
      setErrors((prev) => ({ ...prev, submit: result?.error || "Submission failed" }));
      return;
    } catch (err) {
      console.log("err", err);
      showToast({
        message: "Something went wrong",
        type: "error",
      });
      setErrors((prev) => ({ ...prev, submit: "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  };
  const getDetails = async () => {
    try {
      setLoading(true);

      const result = await getProfileDataAction();

      if (result?.success && result?.data) {
        const data = result.data;
        setPersonalInfo(data);
        setForm((prev) => ({
          ...prev,
          firstName: data.firstName || "",
          secondName: data.middleName || "",
          lastName: data.lastName || "",
          fatherName: data.fathersName || "",
          email: "",
          dob: data.dateOfBirth || "",
          state: data.state || "",
          city: data.city || "",
          pincode: data.pincode || "",
          address: cleanAddress(data.address, data.city, data.state, data.pincode) || "",
          gender: data.gender || "",
        }));

        return;
      }
      showToast({
        message: result?.error || "Submission failed",
        type: "error",
      });
      return;
    } catch (err) {
      console.log("err", err);
      showToast({
        message: "Something went wrong",
        type: "error",
      });
      setErrors((prev) => ({ ...prev, submit: "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="Personal Details"
      subtitle="Provide your personal information to help us verify your identity."
      className="lg:w-[800px] mx-auto"
      icon={<User className="w-6 h-6 text-primary" />}
      steper={true}
      tips={{
        title: "Personal Details",
        description:
          "Please provide your personal information accurately to help us verify your identity, communicate important updates, and complete your application process smoothly.",
        Icon: <User className="w-5 h-5 text-primary" />,
        noteTitle: "Important Tips",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Ensure your name matches your PAN and Aadhaar records.
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Enter your active email address for communication.
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Second name and last name are optional.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Personal Details</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="First Name"
              value={form.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              error={errors.firstName}
              require
            />

            <TextInput
              label="Middle Name"
              value={form.secondName}
              onChange={(e) => handleChange("secondName", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <TextInput
              label="Last Name"
              value={form.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
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

        <div className="w-full mt-4">
          <RadioButtonGroup
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
              { value: "OTHER", label: "Other" },
            ]}
            name="gender"
            value={form.gender}
            onChange={(value) => handleChange("gender", value)}
            heading={
              <span>
                Gender <span className="text-destructive">*</span>
              </span>
            }
            error={errors.gender}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CustomDatePicker
            label="Date of Birth"
            value={form.dob ? new Date(form.dob) : null}
            onChange={(date: Date | null) => handleChange("dob", date ? date.toISOString() : "")}
            error={errors.dob}
            required
          />

          <TextInput
            type="email"
            label="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={errors.email}
            require
          />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Address Details</h3>

          <div className="mb-4">
            <TextInput
              label="Address"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              error={errors.address}
              require
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TextInput
              label="City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              error={errors.city}
              require
            />

            <TextInput
              label="State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              error={errors.state}
              require
            />
          </div>

          <div className="mt-4">
            <TextInput
              label="Pincode"
              value={form.pincode}
              onChange={(e) => handleChange("pincode", sanitizeNumeric(e.target.value))}
              maxLength={6}
              error={errors.pincode}
              require
            />
          </div>
        </div>

        <GradientButton type="submit" className="w-full mt-4" disabled={loading || isRedirect}>
          {isRedirect ? "Redirecting..." : loading ? "Submitting..." : "Submit & Continue"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default PersonalInfo;
