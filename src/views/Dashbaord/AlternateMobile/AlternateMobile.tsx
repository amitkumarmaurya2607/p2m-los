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
import { useLoanApp } from "@/contexts/LoanAppContext";
import { submitAlternateMobileAction, saveAlternateMobileStepAction } from "@/lib/actions/document.action";
import PulseDot from "@/components/PulseDot";

const RELATION_OPTIONS = [
  { value: "spouse", label: "Spouse" },
  { value: "parent", label: "Parent" },
  { value: "sibling", label: "Sibling" },
  { value: "child", label: "Child" },
  { value: "friend", label: "Friend" },
  { value: "colleague", label: "Colleague" },
  { value: "other", label: "Other" },
];

const RELATION_MAP: Record<string, string> = {
  spouse: "SPOUSE",
  parent: "PARENT",
  sibling: "SIBLING",
  child: "CHILD",
  friend: "FRIEND",
  colleague: "COLLEAGUE",
  other: "OTHER",
};

function AlternateMobile() {
  const router = useRouter();
  const { application } = useLoanApp();

  const [name1, setName1] = useState("");
  const [number1, setNumber1] = useState("");
  const [relation1, setRelation1] = useState("");
  const [name2, setName2] = useState("");
  const [number2, setNumber2] = useState("");
  const [relation2, setRelation2] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [contact1Saved, setContact1Saved] = useState(false);
  const [contact2Saved, setContact2Saved] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [savingStep, setSavingStep] = useState(false);

  useEffect(() => {
    const alt = application?.alternateMobile;
    if (alt?.number1) {
      setName1(alt.name1 || "");
      setNumber1(alt.number1);
      setRelation1(alt.relation1);
      setContact1Saved(true);
      if (alt.number2) {
        setName2(alt.name2 || "");
        setNumber2(alt.number2);
        setRelation2(alt.relation2);
        setContact2Saved(true);
      }
    }
  }, [application]);

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

  const handleSaveContact1 = async () => {
    if (!validateContact1()) return;
    setLoading1(true);
    setErrors({});
    try {
      const r1 = await submitAlternateMobileAction({
        mobileNumber: sanitizeNumeric(number1),
        name: name1.trim(),
        relationType: RELATION_MAP[relation1],
      });
      if (r1?.error) {
        showToast({ message: r1.error, type: "error" });
        return;
      }
      setContact1Saved(true);
      showToast({ message: "Contact 1 saved successfully", type: "success" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      showToast({ message: msg, type: "error" });
    } finally {
      setLoading1(false);
    }
  };

  const handleSaveContact2 = async () => {
    if (!validateContact2()) return;
    setLoading2(true);
    setErrors({});
    try {
      const r2 = await submitAlternateMobileAction({
        mobileNumber: sanitizeNumeric(number2),
        name: name2.trim(),
        relationType: RELATION_MAP[relation2],
      });
      if (r2?.error) {
        showToast({ message: r2.error, type: "error" });
        return;
      }
      setContact2Saved(true);
      showToast({ message: "Contact 2 saved successfully", type: "success" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      showToast({ message: msg, type: "error" });
    } finally {
      setLoading2(false);
    }
  };

  const handleContinue = async () => {
    setSavingStep(true);
    try {
      const stepResult = await saveAlternateMobileStepAction();
      if (stepResult?.error) {
        showToast({ message: stepResult.error, type: "error" });
        return;
      }
      showToast({ message: "Alternate contact details saved", type: "success" });
      router.push("/loan-eligibility");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      showToast({ message: msg, type: "error" });
    } finally {
      setSavingStep(false);
    }
  };

  const contact2Disabled = !contact1Saved;

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
        <div className="space-y-4 rounded-2xl border border-border-light bg-surface p-5">
          <h3 className="text-sm font-bold text-text-heading">Contact Person 1</h3>
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
              disabled={contact1Saved}
            />
            <div className="flex gap-3">
              <div className="flex-1">
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
                  disabled={contact1Saved}
                />
              </div>
              <div className="w-[180px] shrink-0">
                <SelectBox
                  options={RELATION_OPTIONS}
                  value={relation1}
                  label="Relation"
                  onChange={(val: string) => {
                    setRelation1(val);
                    setErrors((p) => ({ ...p, r1: "" }));
                  }}
                  placeholder="Relation"
                  menuPlacement="auto"
                  isDisabled={contact1Saved}
                />
                {errors.r1 && <p className="mt-1 text-sm text-destructive px-1">{errors.r1}</p>}
              </div>
            </div>
          </div>
          {!contact1Saved && (
            <GradientButton
              type="button"
              onClick={handleSaveContact1}
              disabled={loading1}
              loading={loading1}
              className="w-full mt-4"
            >
              Save Contact 1
            </GradientButton>
          )}
        </div>

        <div className={`space-y-4 rounded-2xl border border-border-light bg-surface p-5 ${contact2Disabled ? "opacity-50 pointer-events-none" : ""}`}>
          <h3 className="text-sm font-bold text-text-heading">Contact Person 2</h3>
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
              disabled={contact2Disabled}
            />
            <div className="flex gap-3">
              <div className="flex-1">
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
                  disabled={contact2Disabled}
                />
              </div>
              <div className="w-[180px] shrink-0">
                <SelectBox
                  options={RELATION_OPTIONS}
                  value={relation2}
                  label="Relation"
                  onChange={(val: string) => {
                    setRelation2(val);
                    setErrors((p) => ({ ...p, r2: "" }));
                  }}
                  placeholder="Relation"
                  menuPlacement="auto"
                  isDisabled={contact2Disabled}
                />
                {errors.r2 && <p className="mt-1 text-sm text-destructive px-1">{errors.r2}</p>}
              </div>
            </div>
          </div>
          {contact1Saved && !contact2Saved && (
            <GradientButton
              type="button"
              onClick={handleSaveContact2}
              disabled={loading2}
              loading={loading2}
              className="w-full mt-4"
            >
              Save Contact 2
            </GradientButton>
          )}
        </div>

        {contact1Saved && contact2Saved && (
          <GradientButton
            type="button"
            onClick={handleContinue}
            disabled={savingStep}
            loading={savingStep}
            className="w-full"
          >
            Continue
          </GradientButton>
        )}
      </div>
    </StepCard>
  );
}

export default AlternateMobile;
