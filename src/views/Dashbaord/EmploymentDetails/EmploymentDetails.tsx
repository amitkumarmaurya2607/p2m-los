"use client";

import React, { useState } from "react";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { Briefcase, Calendar, ChevronRight, Lightbulb } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setEmploymentDetails, selectApplication } from "@/features/application/applicationSlice";
import { isValidEmail, isValidPinCode, sanitizeNumeric } from "@/lib/utils";
import StepNotes from "../componants/StepNotes";

function EmploymentDetails() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const application = useAppSelector(selectApplication);
  const saved = application.employmentDetails;

  const [form, setForm] = useState({
    companyName: saved?.companyName || "",
    designation: saved?.designation || "",
    email: saved?.email || "",
    salary: saved?.salary || "",
    salaryMode: saved?.salaryMode || "",
    joiningDate: saved?.joiningDate || "",
    uan: saved?.uan || "",
    city: saved?.city || "",
    pincode: saved?.pincode || "",
  });

  const [error, setError] = useState<any>({});
  const [loading, setLoading] = useState(false);

  // 🔹 Handle Change
  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error[field]) {
      setError((prev: any) => ({ ...prev, [field]: "" }));
    }
  };

  // 🔹 Validation
  const validate = () => {
    let newError: any = {};

    if (!form.companyName) newError.companyName = "Company name is required";
    if (!form.designation) newError.designation = "Designation is required";

    if (!form.email) {
      newError.email = "Email is required";
    } else if (!isValidEmail(form.email)) {
      newError.email = "Invalid email";
    }

    if (!form.salary) newError.salary = "Salary is required";

    if (!form.joiningDate) newError.joiningDate = "Joining date required";

    if (!form.city) newError.city = "City is required";

    if (!form.pincode) {
      newError.pincode = "Pincode required";
    } else if (!isValidPinCode(form.pincode)) {
      newError.pincode = "Invalid pincode";
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  // 🔹 Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      // 👉 API call simulation
      await new Promise((res) => setTimeout(res, 1200));

      console.log("Employment Data:", form);

      dispatch(setEmploymentDetails(form));

      router.push("/loan-calculator"); // next step
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (

  <div className="flex gap-12">
      <StepNotes
  title="Employment Details"
  description="Please provide your current employment and income details accurately to help us assess your eligibility and offer suitable loan options."

  noteTitle="Important Information"
  noteDescription={
    <ul className="space-y-2 text-sm leading-6">
      <li className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
        Enter your current company name and employment type correctly.
      </li>

      <li className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
        Provide accurate monthly income details for faster approval.
      </li>

      <li className="flex items-start gap-2">
        <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
        Ensure all employment information matches your official records.
      </li>
    </ul>
  }

  icon={<Briefcase className="w-6 h-6 text-primary" />}
  noteIcon={<Lightbulb className="w-5 h-5 text-secondary" />}
/>
    <StepCard
      title="Employment Details"
      subtitle="We use this to verify your income and determine the best loan offer."
      className="lg:w-[812px]"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInput
            label="Company Name"
            value={form.companyName}
            onChange={(e) => handleChange("companyName", e.target.value)}
            error={error.companyName}
          />

          <TextInput
            label="Designation"
            value={form.designation}
            onChange={(e) => handleChange("designation", e.target.value)}
            error={error.designation}
          />

          <TextInput
            label="Official Email ID"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            error={error.email}
          />

          <TextInput
            label="Monthly Net Salary (₹)"
            value={form.salary}
            onChange={(e) => handleChange("salary", sanitizeNumeric(e.target.value))}
            error={error.salary}
          />

          <TextInput
            label="Salary Mode"
            value={form.salaryMode}
            onChange={(e) => handleChange("salaryMode", e.target.value)}
          />

          <TextInput
            label="Joining Date"
            value={form.joiningDate}
            onChange={(e) => handleChange("joiningDate", e.target.value)}
            error={error.joiningDate}
            rightIcon={<Calendar className="w-5 h-5 text-[#00C89C]" />}
          />

          <TextInput
            label="UAN Number (Optional)"
            value={form.uan}
            onChange={(e) => handleChange("uan", sanitizeNumeric(e.target.value))}
          />
        </div>

        {/* Company Location */}
        <div className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Company Location</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TextInput
              label="Company Location / City"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              error={error.city}
            />

            <TextInput
              label="Company Pincode"
              value={form.pincode}
              onChange={(e) => handleChange("pincode", sanitizeNumeric(e.target.value))}
              maxLength={6}
              error={error.pincode}
            />
          </div>
        </div>

        {/* Submit */}
        <GradientButton type="submit" className="mt-6 w-full" disabled={loading}>
          <span className="flex items-center justify-center gap-2">
            {loading ? "Submitting..." : "Review Application"}
            {!loading && <ChevronRight className="w-5 h-5" />}
          </span>
        </GradientButton>
      </form>
    </StepCard>
  </div>
  );
}

export default EmploymentDetails;
