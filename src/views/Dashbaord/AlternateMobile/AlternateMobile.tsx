"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import TextInput from "@/components/ui/TextInput";
import SelectBox from "@/components/ui/SelectBox";
import GradientButton from "@/components/ui/GradientButton";
import { Phone, Lightbulb } from "lucide-react";
import { isValidMobile, sanitizeNumeric } from "@/lib/utils";
import { showToast } from "@/lib/toast";

import {
  submitAlternateMobileAction,
  saveAlternateMobileStepAction,
} from "@/lib/actions/document.action";
import { callSecure } from "@/lib/secure-action";
import PulseDot from "@/components/PulseDot";

const RELATION_OPTIONS = [
  { value: "SPOUSE", label: "Spouse" },
  { value: "PARENT", label: "Parent" },
  { value: "SIBLING", label: "Sibling" },
  { value: "CHILD", label: "Child" },
  { value: "FRIEND", label: "Friend" },
  { value: "COLLEAGUE", label: "Colleague" },
  { value: "OTHER", label: "Other" },
];

function AlternateMobile() {
  const router = useRouter();

  const [name1, setName1] = useState("");
  const [number1, setNumber1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [name2, setName2] = useState("");
  const [number2, setNumber2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savingStep, setSavingStep] = useState(false);

  const validateContact1 = () => {
    const errs: Record<string, string> = {};
    if (!name1.trim()) errs.n1 = "Enter contact name";
    const s1 = sanitizeNumeric(number1);
    if (!s1 || !isValidMobile(s1)) errs.n1m = "Enter a valid 10-digit mobile number";
    if (!relation1) errs.r1 = "Select relation";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateContact2 = () => {
    const errs: Record<string, string> = {};
    if (!name2.trim()) errs.n2 = "Enter contact name";
    const s2 = sanitizeNumeric(number2);
    if (!s2 || !isValidMobile(s2)) errs.n2m = "Enter a valid 10-digit mobile number";
    if (!relation2) errs.r2 = "Select relation";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveAndNext = async () => {
    setErrors({});
    if (!validateContact1() || !validateContact2()) return;
    setSavingStep(true);
    try {
      // const r1 = await callSecure(submitAlternateMobileAction, {
      //   mobileNumber: sanitizeNumeric(number1),
      //   name: name1.trim(),
      //   relationType: relation1,
      // });
      // if (!r1?.success) {
      //   showToast({ message: r1.error, type: "error" });
      //   return;
      // }

      const resp = await callSecure(submitAlternateMobileAction, [
        {
          mobileNumber: sanitizeNumeric(number2),
          name: name2.trim(),
          relationType: relation2,
        },
        {
          mobileNumber: sanitizeNumeric(number1),
          name: name1.trim(),
          relationType: relation1,
        }
      ]);
      if (!resp?.success) {
        showToast({ message: resp.error, type: "error" });
        return;
      }

      // const stepResult = await saveAlternateMobileStepAction();
      // if (stepResult?.error) {
      //   showToast({ message: stepResult.error, type: "error" });
      //   return;
      // }

      showToast({ message: "Alternate contact details saved", type: "success" });
      router.push("/loan-eligibility");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      showToast({ message: msg, type: "error" });
    } finally {
      setSavingStep(false);
    }
  };

  console.log("Rendering AlternateMobile with state:", {
    name1,
    number1,
    relation1,
    name2,
    number2,
    relation2,
  });

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
              <PulseDot />
              Backup communication channels for loan updates
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Ensures you never miss important notifications
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Helps us reach your family if needed
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="mt-6 space-y-6">
        {/* Contact Person 1 */}
        <div className="space-y-4 rounded-2xl border border-border-light bg-surface p-5">
          <h3 className="text-sm font-bold text-text-heading">Primary Contact</h3>

          <div className="space-y-3">
            <TextInput
              label="Full Name"
              value={name1}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName1(e.target.value);
                setErrors((p) => ({ ...p, n1: "" }));
              }}
              placeholder="Contact person name"
              error={errors.n1}
              require
            />

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="w-full flex-1">
                <TextInput
                  label="Mobile Number"
                  type="tel"
                  value={number1}
                  maxLength={10}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNumber1(sanitizeNumeric(e.target.value));
                    setErrors((p) => ({ ...p, n1m: "" }));
                  }}
                  placeholder="10-digit mobile number"
                  error={errors.n1m}
                  require
                />
              </div>

              <div className="w-full md:w-[180px] md:shrink-0">
                <SelectBox
                  options={RELATION_OPTIONS}
                  value={RELATION_OPTIONS.find((item) => item.value === relation1) || null}
                  label="Relation"
                  onChange={(val) => {
                    setRelation1(val?.value);
                    setErrors((p) => ({ ...p, r1: "" }));
                  }}
                  placeholder="Relation"
                  menuPlacement="auto"
                  required
                />

                {errors.r1 && <p className="mt-1 px-1 text-sm text-destructive">{errors.r1}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Contact Person 2 */}
        <div className="space-y-4 rounded-2xl border border-border-light bg-surface p-5">
          <h3 className="text-sm font-bold text-text-heading">Secondary Contact</h3>

          <div className="space-y-3">
            <TextInput
              label="Full Name"
              value={name2}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setName2(e.target.value);
                setErrors((p) => ({ ...p, n2: "" }));
              }}
              placeholder="Contact person name"
              error={errors.n2}
              require
            />

            <div className="flex flex-col gap-3 md:flex-row">
              <div className="w-full flex-1">
                <TextInput
                  label="Mobile Number"
                  type="tel"
                  value={number2}
                  maxLength={10}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setNumber2(sanitizeNumeric(e.target.value));
                    setErrors((p) => ({ ...p, n2m: "" }));
                  }}
                  placeholder="10-digit mobile number"
                  error={errors.n2m}
                  require
                />
              </div>

              <div className="w-full md:w-[180px] md:shrink-0">
                <SelectBox
                  options={RELATION_OPTIONS}
                  value={RELATION_OPTIONS.find((item) => item.value === relation2) || null}
                  label="Relation"
                  onChange={(val) => {
                    setRelation2(val?.value);
                    setErrors((p) => ({ ...p, r2: "" }));
                  }}
                  placeholder="Relation"
                  menuPlacement="auto"
                  required
                />

                {errors.r2 && <p className="mt-1 px-1 text-sm text-destructive">{errors.r2}</p>}
              </div>
            </div>
          </div>
        </div>

        <GradientButton
          type="button"
          onClick={handleSaveAndNext}
          disabled={savingStep}
          loading={savingStep}
          className="w-full"
        >
          Save & Next
        </GradientButton>
      </div>
    </StepCard>
  );
}

export default AlternateMobile;
