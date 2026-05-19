"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import StepCard from "../componants/StepCard";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import { User, Lightbulb } from "lucide-react";
import { isValidEmail, sanitizeNumeric } from "@/lib/utils";
import { submitPersonalInfoAction } from "@/lib/actions/personal-info.action";

function PersonalInfo() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    secondName: "",
    lastName: "",
    fatherName: "",
    email: "",
    dob: "",
    salary: "",
    state: "",
    city: "",
    pincode: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev: any) => ({ ...prev, [key]: "" }));
    }
  };

  const validate = () => {
    const newErrors: any = {};

    if (!form.firstName) newErrors.firstName = "First name is required";
    if (!form.fatherName) newErrors.fatherName = "Father name is required";

    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newErrors.email = "Invalid email";
    }

    if (!form.dob) newErrors.dob = "Date of birth is required";
    if (!form.salary) newErrors.salary = "Salary is required";

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

      if (result?.error) {
        setErrors((prev: any) => ({ ...prev, submit: result.error }));
        return;
      }

      router.push("/aadhar-details");
    } catch (err) {
      setErrors((prev: any) => ({ ...prev, submit: "Something went wrong" }));
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
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
              Ensure your name matches your PAN and Aadhaar records.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
              Enter your active email address for communication.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 flex-[0_0_8px] rounded-full bg-secondary" />
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

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>

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

        <GradientButton type="submit" className="w-full mt-4" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default PersonalInfo;
