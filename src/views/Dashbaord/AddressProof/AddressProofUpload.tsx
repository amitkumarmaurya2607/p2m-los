"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import SelectBox from "@/components/ui/SelectBox";
import TextInput from "@/components/ui/TextInput";
import { Upload, CheckCircle, FileText, X, Lightbulb, Home, FileCheck } from "lucide-react";
import { showToast } from "@/lib/toast";
import { submitAddressProofAction } from "@/lib/actions/document.action";
import { callSecureFormData } from "@/lib/secure-action";
import PulseDot from "@/components/PulseDot";

type DocumentTypeOption = {
  value: string;
  label: string;
};

const DOCUMENT_TYPES = [
  { value: "AADHAAR", label: "Aadhaar Card" },
  { value: "VOTER_ID", label: "Voter ID" },
  { value: "PASSPORT", label: "Passport" },
  { value: "UTILITY_BILL", label: "Utility Bill (Electricity/Water/Gas)" },
  { value: "RENTAL_AGREEMENT", label: "Rental Agreement" },
  { value: "BANK_STATEMENT", label: "Bank Statement with Address" },
];

function AddressProofUpload() {
  const router = useRouter();
  const frontInputRef = useRef<HTMLInputElement | null>(null);
  const backInputRef = useRef<HTMLInputElement | null>(null);
  const [frontFile, setFrontFile] = useState<File | null>(null);
  const [backFile, setBackFile] = useState<File | null>(null);
  const [docType, setDocType] = useState<DocumentTypeOption | null>(null);
  const [documentNumber, setDocumentNumber] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState(false);

  const validateFile = (f: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;
    if (!allowedTypes.includes(f.type)) return "Only PDF, JPG or PNG files are allowed";
    if (f.size > maxSize) return "File size must be less than 1MB";
    return "";
  };

  const handleFrontFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      showToast({ message: validationError, type: "error" });
      return;
    }
    setFrontFile(f);
    setError("");
    e.target.value = "";
  };

  const handleBackFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      showToast({ message: validationError, type: "error" });
      return;
    }
    setBackFile(f);
    setError("");
    e.target.value = "";
  };

  const removeFile = (side: "front" | "back") => {
    if (side === "front") setFrontFile(null);
    else setBackFile(null);
    setError("");
  };

  const handleDocTypeChange = (val: DocumentTypeOption) => {
    setDocType(val);
    if (val.value !== "AADHAAR") {
      setBackFile(null);
    }
  };

  const isAadhaar = docType?.value === "AADHAAR";

  const handleSubmit = async () => {
    if (!docType) {
      showToast({ message: "Please select document type", type: "error" });
      return;
    }
    if (!documentNumber.trim()) {
      showToast({ message: "Please enter document number", type: "error" });
      return;
    }
    if (!frontFile) {
      showToast({ message: "Please upload the front side of your document", type: "error" });
      return;
    }
    if (isAadhaar && !backFile) {
      showToast({ message: "Please upload the back side of your Aadhaar card", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("frontFile", frontFile);
      if (isAadhaar && backFile) {
        formData.append("backFile", backFile);
      }
      formData.append(
        "data",
        JSON.stringify({
          proofType: docType?.value,
          documentNumber: documentNumber.trim(),
        }),
      );

      const result = await callSecureFormData(submitAddressProofAction, formData);
      if (result?.error) {
        setError(result.error);
        showToast({ message: result.error, type: "error" });
        return;
      }

      setIsRedirect(true);
      showToast({ message: "Address proof uploaded successfully", type: "success" });
      router.push("/alternate-mobile");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      setError(msg);
      showToast({ message: msg, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  console.log("isAadhaar", isAadhaar, docType);

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
              <PulseDot />
              Aadhaar Card with current address
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
              Voter ID / Passport
            </li>
            <li className="flex items-start gap-2">
              <PulseDot />
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
            onChange={handleDocTypeChange}
            label="Document Type"
            menuPlacement="auto"
            required
          />
        </div>

        <div>
          <TextInput
            label="Document Number"
            value={documentNumber}
            onChange={(e) => setDocumentNumber(e.target.value)}
            placeholder="Enter document number"
            require
          />
        </div>

        <input
          ref={frontInputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFrontFileChange}
        />

        {isAadhaar && (
          <input
            ref={backInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleBackFileChange}
          />
        )}

        {isAadhaar ? (
          <div className="space-y-4">
            <div className="max-w-[calc(100vw-90px)]">
              <p className="mb-2 text-sm font-semibold text-text-heading">Front Side</p>
              {!frontFile ? (
                <div
                  onClick={() => frontInputRef.current?.click()}
                  className="flex h-32 cursor-pointer flex-col items-center justify-center
                    rounded-2xl border-2 border-dashed border-border-medium bg-surface transition
                    hover:border-primary"
                >
                  <Upload className="h-7 w-7 text-text-muted" />
                  <h3 className="mt-2 text-sm font-bold text-text-heading">Upload front side</h3>
                  <p className="mt-1 text-xs text-text-muted-dark">PDF, JPG or PNG (Max 1MB)</p>
                </div>
              ) : (
                <div
                  className="flex items-center justify-between rounded-2xl border
                    border-border-light bg-surface p-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                        border border-border-medium bg-white"
                    >
                      <FileText className="h-5 w-5 text-text-muted-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-heading truncate">
                        {frontFile.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {(frontFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <button
                      type="button"
                      onClick={() => removeFile("front")}
                      className="rounded-lg p-1 text-destructive"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="max-w-[calc(100vw-90px)]">
              <p className="mb-2 text-sm font-semibold text-text-heading">Back Side</p>
              {!backFile ? (
                <div
                  onClick={() => backInputRef.current?.click()}
                  className="flex h-32 cursor-pointer flex-col items-center justify-center
                    rounded-2xl border-2 border-dashed border-border-medium bg-surface transition
                    hover:border-primary"
                >
                  <Upload className="h-7 w-7 text-text-muted" />
                  <h3 className="mt-2 text-sm font-bold text-text-heading">Upload back side</h3>
                  <p className="mt-1 text-xs text-text-muted-dark">PDF, JPG or PNG (Max 1MB)</p>
                </div>
              ) : (
                <div
                  className="flex items-center justify-between rounded-2xl border
                    border-border-light bg-surface p-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl
                        border border-border-medium bg-white"
                    >
                      <FileText className="h-5 w-5 text-text-muted-dark" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-text-heading truncate">
                        {backFile.name}
                      </p>
                      <p className="text-xs text-text-muted">
                        {(backFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <button
                      type="button"
                      onClick={() => removeFile("back")}
                      className="rounded-lg p-1 text-destructive"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="max-w-[calc(100vw-90px)]">
            {!frontFile ? (
              <div
                onClick={() => frontInputRef.current?.click()}
                className="flex h-36 cursor-pointer flex-col items-center justify-center rounded-2xl
                  border-2 border-dashed border-border-medium bg-surface transition
                  hover:border-primary"
              >
                <Upload className="h-8 w-8 text-text-muted" />
                <h3 className="mt-3 text-sm font-bold text-text-heading">
                  Click to upload document
                </h3>
                <p className="mt-1 text-xs text-text-muted-dark">PDF, JPG or PNG (Max 1MB)</p>
              </div>
            ) : (
              <div
                className="flex items-center justify-between rounded-2xl border border-border-light
                  bg-surface p-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border
                      border-border-medium bg-white"
                  >
                    <FileText className="h-5 w-5 text-text-muted-dark" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-text-heading truncate">
                      {frontFile.name}
                    </p>
                    <p className="text-xs text-text-muted">
                      {(frontFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  <button
                    type="button"
                    onClick={() => removeFile("front")}
                    className="rounded-lg p-1 text-destructive"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {error && <p className="text-sm text-destructive">{error}</p>}

        <GradientButton
          type="button"
          onClick={handleSubmit}
          disabled={
            !docType ||
            !documentNumber.trim() ||
            !frontFile ||
            (isAadhaar && !backFile) ||
            loading ||
            isRedirect
          }
          className="w-full"
        >
          {isRedirect ? "Redirecting..." : loading ? "Uploading..." : "Upload & Continue"}
        </GradientButton>
      </div>
    </StepCard>
  );
}

export default AddressProofUpload;
