"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import GradientButton from "@/components/ui/GradientButton";
import { Phone, Lightbulb } from "lucide-react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { isValidMobile, sanitizeNumeric } from "@/lib/utils";
import { showToast } from "@/lib/toast";

const RELATION_OPTIONS = [
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child" },
  { value: "friend", label: "Friend" },
  { value: "colleague", label: "Colleague" },
  { value: "other", label: "Other" },
];

function AlternateMobile() {
  const router = useRouter();
  const { setAlternateMobileData } = useApplicationContext();
  const [number1, setNumber1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [number2, setNumber2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [errors, setErrors] = useState<{ n1?: string; n2?: string; r1?: string; r2?: string }>({});

  const validate = () => {
    const errs: typeof errors = {};
    const s1 = sanitizeNumeric(number1);
    if (!s1 || !isValidMobile(s1)) errs.n1 = "Enter a valid 10-digit mobile number";
    if (!relation1) errs.r1 = "Select relation";
    const s2 = sanitizeNumeric(number2);
    if (!s2 || !isValidMobile(s2)) errs.n2 = "Enter a valid 10-digit mobile number";
    if (!relation2) errs.r2 = "Select relation";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setAlternateMobileData({
      number1: sanitizeNumeric(number1),
      relation1,
      number2: sanitizeNumeric(number2),
      relation2,
    });
    showToast({ message: "Alternate contact details saved", type: "success" });
    router.push("/loan-eligibility");
  };

  return (
    <StepCard
      title="Alternate Mobile Numbers"
      subtitle="Provide two alternate contact numbers with their relationship to you"
      icon={<Phone className="w-6 h-6 text-primary" />}
      className="lg:w-[800px] mx-auto"
      steper={true}
      tips={{
        title: "Alternate Contacts",
        description:
          "Provide two secondary contact numbers for backup communication regarding your loan application.",
        Icon: <Phone className="w-5 h-5 text-primary" />,
        noteTitle: "Why Alternate Contacts?",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Backup communication channels for loan updates
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Ensures you never miss important notifications
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Helps us reach your family if needed
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="mt-6 space-y-6">
        <div className="space-y-4 rounded-2xl border border-border-light bg-surface p-5">
          <h3 className="text-sm font-bold text-text-heading">Contact Person 1</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <TextInput
                label="Mobile Number"
                type="tel"
                value={number1}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNumber1(sanitizeNumeric(e.target.value));
                  setErrors((p) => ({ ...p, n1: undefined }));
                }}
                placeholder="10-digit mobile number"
                error={errors.n1}
              />
            </div>
            <div className="w-[180px] shrink-0">
              <SelectBox
                options={RELATION_OPTIONS}
                value={relation1}
                label="Relation"
                onChange={(val: string) => {
                  setRelation1(val);
                  setErrors((p) => ({ ...p, r1: undefined }));
                }}
                placeholder="Relation"
                menuPlacement="auto"
              />
              {errors.r1 && (
                <p className="mt-1 text-sm text-destructive px-1">{errors.r1}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border-light bg-surface p-5">
          <h3 className="text-sm font-bold text-text-heading">Contact Person 2</h3>
          <div className="flex gap-3">
            <div className="flex-1">
              <TextInput
                label="Mobile Number"
                type="tel"
                value={number2}
                maxLength={10}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setNumber2(sanitizeNumeric(e.target.value));
                  setErrors((p) => ({ ...p, n2: undefined }));
                }}
                placeholder="10-digit mobile number"
                error={errors.n2}
              />
            </div>
            <div className="w-[180px] shrink-0">
              <SelectBox
                options={RELATION_OPTIONS}
                value={relation2}
                label="Relation"
                onChange={(val: string) => {
                  setRelation2(val);
                  setErrors((p) => ({ ...p, r2: undefined }));
                }}
                placeholder="Relation"
                menuPlacement="auto"
              />
              {errors.r2 && (
                <p className="mt-1 text-sm text-destructive px-1">{errors.r2}</p>
              )}
            </div>
          </div>
        </div>

        <GradientButton type="button" onClick={handleSubmit} className="w-full">
          Save & Continue
        </GradientButton>
      </div>
    </StepCard>
  );
}

export default AlternateMobile;
