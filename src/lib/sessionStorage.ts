export type StepStatus = "pending" | "progress" | "complete";

export const steps = [
  { id: 1, key: "mobile", title: "Mobile", fullTitle: "Mobile Verification" },
  { id: 2, key: "pan", title: "PAN", fullTitle: "PAN Verification" },
  { id: 3, key: "personalInfo", title: "Personal", fullTitle: "Personal Details" },
  { id: 4, key: "aadhaar", title: "Aadhaar", fullTitle: "Aadhaar Verification" },
  { id: 5, key: "bankDetails", title: "Bank", fullTitle: "Bank Details" },
  { id: 6, key: "selfie", title: "Selfie", fullTitle: "Selfie Verification" },
  { id: 7, key: "employmentDetails", title: "Employment", fullTitle: "Employment Details" },
] as const;
