"use client";

import React, { useState } from "react";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import GradientButton from "@/components/ui/GradientButton";
import { Calendar, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setEmploymentDetails, selectApplication } from "@/features/application/applicationSlice";

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
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newError.email = "Invalid email";
    }

    if (!form.salary) newError.salary = "Salary is required";

    if (!form.joiningDate) newError.joiningDate = "Joining date required";

    if (!form.city) newError.city = "City is required";

    if (!form.pincode) {
      newError.pincode = "Pincode required";
    } else if (!/^[0-9]{6}$/.test(form.pincode)) {
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

      router.push("/review"); // next step
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StepCard
      title="Employment Details"
      subtitle="We use this to verify your income and determine the best loan offer."
      className="  w-[812px]"
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
            onChange={(e) => handleChange("salary", e.target.value.replace(/[^0-9]/g, ""))}
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
            onChange={(e) => handleChange("uan", e.target.value.replace(/[^0-9]/g, ""))}
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
              onChange={(e) => handleChange("pincode", e.target.value.replace(/[^0-9]/g, ""))}
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
  );
}

export default EmploymentDetails;
