"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import SelectBox from "@/components/ui/SelectBox";
import { Upload, CheckCircle, FileText, X, Lightbulb, Home, FileCheck } from "lucide-react";
import { showToast } from "@/lib/toast";
import { submitAddressProofAction } from "@/lib/actions/document.action";

const DOCUMENT_TYPES = [
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "voter", label: "Voter ID" },
  { value: "passport", label: "Passport" },
  { value: "utility", label: "Utility Bill (Electricity/Water/Gas)" },
  { value: "rental", label: "Rental Agreement" },
  { value: "bank", label: "Bank Statement with Address" },
];

function AddressProofUpload() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<string>("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateFile = (f: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(f.type)) return "Only PDF, JPG or PNG files are allowed";
    if (f.size > maxSize) return "File size must be less than 5MB";
    return "";
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      showToast({ message: validationError, type: "error" });
      return;
    }
    setFile(f);
    setError("");
    e.target.value = "";
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!docType) {
      showToast({ message: "Please select document type", type: "error" });
      return;
    }
    if (!file) {
      showToast({ message: "Please upload your address proof document", type: "error" });
      return;
    }

    const result = await submitAddressProofAction();
    if (result?.error) {
      showToast({ message: result.error, type: "error" });
      setLoading(false);
      return;
    }
    setLoading(false);
    showToast({ message: "Address proof uploaded successfully", type: "success" });
    router.push("/alternate-mobile");
  };

  return (
    <StepCard
      title="Local Address Proof Upload"
      subtitle="Upload a document to verify your current local address"
      icon={<FileCheck className="w-6 h-6 text-primary" />}
      className="lg:w-[600px] mx-auto"
      steper={true}
      tips={{
        title: "Address Proof",
        description:
          "Upload a valid address proof document. This helps us verify your current residential address for loan processing.",
        Icon: <Home className="w-5 h-5 text-primary" />,
        noteTitle: "Accepted Documents",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Aadhaar Card with current address
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Voter ID / Passport
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Utility Bill or Rental Agreement
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="mt-6 space-y-6">
        <div>

          <SelectBox
            options={DOCUMENT_TYPES}
            value={docType}
            onChange={(val: string) => setDocType(val)}
            label="Document Type"
            menuPlacement="auto"
          />
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          onClick={() => inputRef.current?.click()}
          className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border-medium bg-surface transition hover:border-primary"
        >
          <Upload className="h-8 w-8 text-text-muted" />
          <h3 className="mt-3 text-sm font-bold text-text-heading">
            Click to upload document
          </h3>
          <p className="mt-1 text-xs text-text-muted-dark">PDF, JPG or PNG (Max 5MB)</p>
        </div>

        {file && (
          <div className="flex items-center justify-between rounded-2xl border border-border-light bg-surface p-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border-medium bg-white">
                <FileText className="h-5 w-5 text-text-muted-dark" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-text-heading truncate">{file.name}</p>
                <p className="text-xs text-text-muted">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-secondary" />
              <button type="button" onClick={removeFile} className="rounded-lg p-1 text-destructive">
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <GradientButton
          type="button"
          onClick={handleSubmit}
          disabled={!docType || !file || loading}
          className="w-full"
        >
          {loading ? "Uploading..." : "Upload & Continue"}
        </GradientButton>
      </div>
    </StepCard>
  );
}

export default AddressProofUpload;
