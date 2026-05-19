"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import StepCard from "../componants/StepCard";
import GradientButton from "@/components/ui/GradientButton";
import { Upload, CheckCircle, FileText, X, Lightbulb } from "lucide-react";
import { useApplicationContext } from "@/context/ApplicationContext";
import { showToast } from "@/lib/toast";

function AccountStatementUpload() {
  const router = useRouter();
  const { setAccountStatementData, setMobileData, application } = useApplicationContext();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateFile = (f: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(f.type)) {
      return "Only PDF, JPG or PNG files are allowed";
    }

    if (f.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return "";
  };

  const handleFile = (f: File) => {
    const validationError = validateFile(f);
    if (validationError) {
      setError(validationError);
      showToast({ message: validationError, type: "error" });
      return;
    }
    setFile(f);
    setError("");
    showToast({ message: "File selected successfully", type: "success" });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    handleFile(f);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    if (!f) return;
    handleFile(f);
  };

  const removeFile = () => {
    setFile(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!file) {
      showToast({ message: "Please upload your bank statement", type: "error" });
      return;
    }

    setLoading(true);
    setAccountStatementData({
      uploaded: true,
      fileName: file.name,
    });
    setLoading(false);
    showToast({ message: "Bank statement uploaded successfully", type: "success" });
    router.push("/employment-details");
  };

  return (
    <StepCard
      title="Account Statement Upload"
      subtitle="Upload your latest bank statement for verification"
      // icon={<Upload className="w-6 h-6 text-primary" />}
      className="lg:w-[600px] mx-auto"
      steper={true}
      tips={{
        title: "Bank Statement",
        description:
          "Upload your latest bank statement (last 6 months) for income and transaction verification.",
        Icon: <Upload className="w-5 h-5 text-primary" />,
        noteTitle: "Document Guidelines",
        noteDescription: (
          <ul className="space-y-2 text-sm leading-6">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Upload statement for the last 6 months
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Supported formats: PDF, JPG, PNG
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-2 w-2 rounded-full bg-secondary shrink-0" />
              Maximum file size: 5MB
            </li>
          </ul>
        ),
        NoteIcon: Lightbulb,
      }}
    >
      <div className="mt-6 space-y-6">
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed transition ${dragActive ? "border-primary bg-primary-muted" : "border-border-medium bg-surface"
            }`}
        >
          <UploadCloudIcon />
          <h3 className="mt-4 text-base font-bold text-text-heading">
            Click or drag your statement here
          </h3>
          <p className="mt-1 text-sm text-text-muted-dark">PDF, JPG or PNG (Max 5MB)</p>
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
          disabled={!file || loading}
          className="w-full"
        >
          {loading ? "Uploading..." : "Upload & Continue"}
        </GradientButton>
      </div>
    </StepCard>
  );
}

function UploadCloudIcon() {
  return (
    <svg className="h-12 w-12 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
    </svg>
  );
}

export default AccountStatementUpload;
