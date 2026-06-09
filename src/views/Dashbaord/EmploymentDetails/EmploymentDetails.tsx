"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import CustomDatePicker from "@/components/ui/CustomDatePicker";
import GradientButton from "@/components/ui/GradientButton";
import { Briefcase, Lightbulb } from "lucide-react";
import { isValidEmail, isValidPinCode, sanitizeNumeric } from "@/lib/utils";
import { submitEmploymentAction } from "@/lib/actions/verification.action";
import { callSecure } from "@/lib/secure-action";
import PulseDot from "@/components/PulseDot";
import { showToast } from "@/lib/toast";

function EmploymentDetails() {
  const router = useRouter();
  const [form, setForm] = useState({
    companyName: "",
    designation: "",
    officialEmail: "",
    modeOfSalary: "",
    joiningDate: "",
    uanNumber: "",
    state: "",
    city: "",
    pinCode: "",
    salary: "",
    expectedDateOfSalary: "",
  });

  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  // 🔹 Handle Change
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error[field]) {
      setError((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // 🔹 Validation
  const validate = () => {
    const newError: Record<string, string> = {};

    if (!form.companyName) newError.companyName = "Company name is required";
    if (!form.designation) newError.designation = "Designation is required";

    if (!form.officialEmail) {
      newError.officialEmail = "Email is required";
    } else if (!isValidEmail(form.officialEmail)) {
      newError.officialEmail = "Invalid email";
    }

    if (!form.joiningDate) newError.joiningDate = "Joining date required";

    if (!form.state) newError.state = "State is required";
    if (!form.city) newError.city = "City is required";

    if (!form.pinCode) {
      newError.pinCode = "Pincode required";
    } else if (!isValidPinCode(form.pinCode)) {
      newError.pinCode = "Invalid pincode";
    }

    if (!form.salary) newError.salary = "Salary is required";
    if (!form.modeOfSalary) newError.salary = "Mode of salary is required";

    if (!form.expectedDateOfSalary) {
      newError.expectedDateOfSalary = "Expected date of salary is required";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const result = await callSecure(submitEmploymentAction, form);

      if (result?.success) {
        setIsRedirect(true);
        showToast({
          message: "Employment details submitted successfully!",
          type: "success",
        });
        router.push("/selfie-capture");
        return;
      }
      showToast({
        message: result?.error || "Submission failed",
        type: "error",
      });
      setError((prev) => ({ ...prev, submit: result?.error || "Submission failed" }));
    } catch (err) {
      console.log(err);
      showToast({
        message: "Something went wrong",
        type: "error",
      });
      setError((prev) => ({ ...prev, submit: "Something went wrong" }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="Employment Details"
      subtitle="We use this to verify your income and determine the best loan offer."
      className="lg:w-[812px]"
      steper={true}
      icon={<Briefcase className="w-6 h-6 text-primary" />}
      tips={{
        title: "Employment Details",
        description:
          "Please provide your current employment and income details accurately to help us assess your eligibility and offer suitable loan options.",
        Icon: <Briefcase className="w-5 h-5 text-primary" />,
        noteTitle: "Important Information",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <PulseDot />
              Enter your current company name and employment type correctly.
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Provide accurate monthly income details for faster approval.
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Ensure all employment information matches your official records.
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Company Name"
            value={form.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            error={error.companyName}
            require
          />

          <SelectBox
            label="Designation"
            options={[
              { value: "Software Engineer", label: "Software Engineer" },
              { value: "Senior Software Engineer", label: "Senior Software Engineer" },
              { value: "Team Lead", label: "Team Lead" },
              { value: "Manager", label: "Manager" },
              { value: "Senior Manager", label: "Senior Manager" },
              { value: "Director", label: "Director" },
              { value: "Analyst", label: "Analyst" },
              { value: "Executive", label: "Executive" },
              { value: "Consultant", label: "Consultant" },
              { value: "Other", label: "Other" },
            ]}
            value={form.designation ? { value: form.designation, label: form.designation } : null}
            onChange={(option) => handleChange("designation", option?.value || "")}
            error={error.designation}
            required
          />

          <TextInput
            label="Official Email ID"
            value={form.officialEmail}
            onChange={(e) => handleChange("officialEmail", e.target.value)}
            error={error.officialEmail}
            require
          />

          <SelectBox
            label="Mode of Salary"
            options={[
              { value: "Bank Transfer", label: "Bank Transfer" },
              { value: "Cash", label: "Cash" },
              { value: "Cheque", label: "Cheque" },
            ]}
            value={
              form.modeOfSalary ? { value: form.modeOfSalary, label: form.modeOfSalary } : null
            }
            onChange={(option) => handleChange("modeOfSalary", option?.value || "")}
            error={error?.modeOfSalary}
            required
          />

          <CustomDatePicker
            label="Joining Date"
            value={form.joiningDate ? new Date(form.joiningDate) : null}
            onChange={(date: Date | null) =>
              handleChange("joiningDate", date ? date.toISOString() : "")
            }
            error={error.joiningDate}
            required
          />

          <TextInput
            label="UAN Number"
            value={form.uanNumber}
            onChange={(e) => handleChange("uanNumber", sanitizeNumeric(e.target.value))}
          />

          <TextInput
            type="text"
            label="Monthly Salary"
            value={form.salary}
            onChange={(e) => handleChange("salary", sanitizeNumeric(e.target.value))}
            error={error.salary}
            require
          />

          <SelectBox
            label="Expected Date of Salary"
            options={Array.from({ length: 31 }, (_, i) => ({
              value: String(i + 1),
              label: String(i + 1),
            }))}
            value={
              form.expectedDateOfSalary
                ? { value: form.expectedDateOfSalary, label: form.expectedDateOfSalary }
                : null
            }
            onChange={(option) => handleChange("expectedDateOfSalary", option?.value || "")}
            error={error.expectedDateOfSalary}
            required
          />
        </div>

        {/* Company Location */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Company Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Company State"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              error={error.state}
              require
            />

            <TextInput
              label="Company City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              error={error.city}
              require
            />
          </div>

          <div className="mt-4">
            <TextInput
              label="Company Pincode"
              value={form.pinCode}
              onChange={(e) => handleChange("pinCode", sanitizeNumeric(e.target.value))}
              maxLength={6}
              error={error.pinCode}
              require
            />
          </div>
        </div>

        {/* Submit */}
        <GradientButton type="submit" className="mt-6 w-full" disabled={loading || isRedirect}>
          {isRedirect ? "Redirecting..." : loading ? "Submitting..." : "Submit & Continue"}
        </GradientButton>
      </form>
    </StepCard>
  );
}

export default EmploymentDetails;
