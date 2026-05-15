"use client";

import React, { useRef, useState } from "react";
import { CheckCircle, FileText, UploadCloud, X } from "lucide-react";
import { useRouter } from "next/navigation";

type DocKey = "pan" | "aadhaar" | "bank" | "salary";

type DocItem = {
  key: DocKey;
  title: string;
  file: File | null;
  error: string;
};

const initialDocs: DocItem[] = [
  { key: "pan", title: "PAN Card Copy", file: null, error: "" },
  { key: "aadhaar", title: "Aadhaar Card (Front & Back)", file: null, error: "" },
  { key: "bank", title: "Bank Statement (Last 6 months)", file: null, error: "" },
  { key: "salary", title: "Salary Slips / ITR", file: null, error: "" },
];

function UploadDocuments() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [docs, setDocs] = useState<DocItem[]>(initialDocs);
  const [selectedDoc, setSelectedDoc] = useState<DocKey | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const validateFile = (file: File) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return "Only PDF, JPG or PNG files are allowed";
    }

    if (file.size > maxSize) {
      return "File size must be less than 5MB";
    }

    return "";
  };

  const uploadFile = (file: File, docKey?: DocKey | null) => {
    const error = validateFile(file);

    setDocs((prev) => {
      const index = docKey
        ? prev.findIndex((item) => item.key === docKey)
        : prev.findIndex((item) => !item.file);

      if (index === -1) return prev;

      return prev.map((item, i) =>
        i === index
          ? {
              ...item,
              file: error ? null : file,
              error,
            }
          : item,
      );
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    uploadFile(file, selectedDoc);
    e.target.value = "";
    setSelectedDoc(null);
  };

  const handleUploadClick = (key: DocKey) => {
    setSelectedDoc(key);
    inputRef.current?.click();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    uploadFile(file);
  };

  const removeFile = (key: DocKey) => {
    setDocs((prev) =>
      prev.map((item) => (item.key === key ? { ...item, file: null, error: "" } : item)),
    );
  };

  const handleSubmit = () => {
    const hasMissing = docs.some((item) => !item.file);

    if (hasMissing) {
      setDocs((prev) =>
        prev.map((item) => ({
          ...item,
          error: item.file ? item.error : "This document is required",
        })),
      );
      return;
    }

    console.log("Uploaded docs:", docs);
    router.push("/review-application");
  };

  return (
    <div className="w-full px-6 py-24">
      <div className="mx-auto w-full max-w-[768px]">
        <div className="text-center">
          <h2 className="text-[36px] font-extrabold leading-10 tracking-[-0.9px] text-text-heading">
            Upload Documents
          </h2>
          <p className="mt-4 text-[18px] text-muted-foreground">
            Please provide the necessary documents to process your application.
          </p>
        </div>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={handleFileChange}
        />

        <div
          onClick={() => {
            setSelectedDoc(null);
            inputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          className={`mt-10 flex h-[256px] cursor-pointer flex-col items-center justify-center
            rounded-[24px] border-2 border-dashed bg-white transition ${
              dragActive ? "border-secondary" : "border-muted"
            }`}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <UploadCloud className="h-8 w-8 text-muted-foreground" />
          </div>

          <h3 className="mt-5 text-[18px] font-bold text-text-heading">Click or drag files here</h3>
          <p className="mt-1 text-[14px] text-text-muted-dark">PDF, JPG or PNG (Max 5MB)</p>
        </div>

        <div
          className="mt-8 rounded-[24px] border border-border-light bg-white p-8
            shadow-[0px_20px_25px_-5px_rgba(226,232,240,0.4)]"
        >
          <h3 className="text-[18px] font-bold text-text-heading">Required Documents</h3>

          <div className="mt-7 space-y-4">
            {docs.map((doc) => (
              <div
                key={doc.key}
                className="flex items-center justify-between rounded-[16px] border border-border
                  bg-surface p-4"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px]
                      border border-muted bg-white"
                  >
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-[16px] font-semibold text-text-heading">{doc.title}</p>
                      <span
                        className="rounded-full bg-[#FFE2E2] px-2 py-0.5 text-[10px] font-bold
                          uppercase text-[#FB2C36]"
                      >
                        Required
                      </span>
                    </div>

                    <p
                      className={`mt-0.5 truncate text-[12px] ${
                        doc.error ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {doc.error || (doc.file ? doc.file.name : "Pending upload")}
                    </p>
                  </div>
                </div>

                {doc.file ? (
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary" />
                    <button
                      type="button"
                      onClick={() => removeFile(doc.key)}
                      className="rounded-lg p-1 text-[#FB2C36]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleUploadClick(doc.key)}
                    className="h-10 rounded-[14px] border-2 border-border-medium px-5 text-[14px]
                      font-semibold text-text-dark-blue"
                  >
                    Upload
                  </button>
                )}
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="mt-8 h-14 w-full rounded-[14px] bg-gradient-to-r from-secondary to-secondary
              text-[18px] font-semibold text-white shadow-[0px_12px_24px_-8px_rgba(0,200,156,0.4)]"
          >
            Review Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadDocuments;
