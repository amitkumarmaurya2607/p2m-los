import React from "react";

export interface GrievanceSection {
  id: string;
  title: string;
  iconId: string;
  content: React.ReactNode | string;
}

export const GRC_SECTIONS: GrievanceSection[] = [
  {
    id: "process",
    title: "1. Complaint Redressal Process",
    iconId: "message-square",
    content: "At RinSetu, we are committed to providing the highest level of service. However, if you have a complaint or grievance, we follow a transparent and time-bound resolution process. Customers can register their complaints through multiple channels including our app, website, email, or telephone. Every complaint is assigned a unique reference number for tracking."
  },
  {
    id: "escalation",
    title: "2. Escalation Matrix",
    iconId: "trending-up",
    content: (
      <div className="space-y-6">
        <p>If you are not satisfied with the resolution provided at any level, you can escalate your concern as per the following matrix:</p>
        <div className="grid gap-4">
          <div className="p-5 bg-surface-muted rounded-2xl border border-border">
            <h4 className="font-black text-primary mb-2">Level 1: Customer Support</h4>
            <p className="text-sm">Reach out to our support team via the app or email. Most queries are resolved here within 7 business days.</p>
          </div>
          <div className="p-5 bg-surface-muted rounded-2xl border border-border">
            <h4 className="font-black text-secondary mb-2">Level 2: Grievance Redressal Officer</h4>
            <p className="text-sm">If unresolved for 15 days, escalate to our Grievance Officer. Resolution is provided within 10 additional days.</p>
          </div>
          <div className="p-5 bg-surface-muted rounded-2xl border border-border">
            <h4 className="font-black text-accent-orange mb-2">Level 3: Nodal Officer</h4>
            <p className="text-sm">Final internal escalation point. The Nodal Officer reviews the case and provides a final decision within 7 business days.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: "timelines",
    title: "3. Response Timelines",
    iconId: "clock",
    content: "We strive to acknowledge every complaint within 24-48 hours. Our standard resolution timelines are: General Queries (3-5 days), Transaction Disputes (7-10 days), and Complex Grievances (up to 30 days as per RBI guidelines)."
  },
  {
    id: "governance",
    title: "4. Corporate Governance",
    iconId: "shield",
    content: "RinSetu adheres to the highest standards of Corporate Governance. Our framework ensures accountability, transparency, and fairness in all our dealings. We comply with all RBI Master Directions on digital lending, Fair Practices Code (FPC), and data protection regulations to safeguard customer interests."
  },
  {
    id: "rights",
    title: "5. Customer Rights",
    iconId: "user-check",
    content: (
      <ul className="list-disc pl-6 space-y-3">
        <li><strong>Right to Fair Treatment:</strong> To be treated with dignity and respect at all times.</li>
        <li><strong>Right to Transparency:</strong> To receive clear information about interest rates, fees, and charges.</li>
        <li><strong>Right to Privacy:</strong> To have personal data protected as per the DPDP Act and RBI guidelines.</li>
        <li><strong>Right to Redressal:</strong> To have access to a robust and free grievance redressal mechanism.</li>
      </ul>
    )
  },
  {
    id: "fraud-reporting",
    title: "6. Reporting Misuse & Fraud",
    iconId: "alert-triangle",
    content: "Security is our top priority. If you suspect any fraudulent activity, unauthorized transactions, or misuse of your account, please report it immediately to our dedicated fraud response team at security@rinsetu.com or call our emergency helpline."
  }
];
