import { FileCheck2, CheckCircle2, Download } from "lucide-react";
import ProfileInfoCard from "../shared/ProfileInfoCard";

const approvedDocs = [
  "PAN Card Verification",
  "Aadhaar Verification",
  "Bank Details",
  "Account Statement",
  "Selfie Verification",
  "Address Proof",
];

const ApprovedDocsTab = () => (
  <div className="space-y-5">
    <ProfileInfoCard title="Approved Documents" icon={FileCheck2}>
      <div className="space-y-3 my-5">
        {approvedDocs.map((doc) => (
          <div
            key={doc}
            className="flex flex-col gap-3 rounded-xl border border-border-light bg-surface-muted
              p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted">
                <CheckCircle2 className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0">
                <h4 className="break-words text-sm font-bold text-text-heading sm:text-base">
                  {doc}
                </h4>
                <p className="mt-1 text-sm text-text-secondary">
                  Approved and verified
                </p>
              </div>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl border
                border-border-light px-4 py-2 text-sm font-medium text-text-heading transition
                hover:bg-muted"
            >
              <Download className="h-4 w-4" />
              View
            </button>
          </div>
        ))}
      </div>
    </ProfileInfoCard>

    <div className="rounded-2xl border border-border-light bg-surface-muted p-4 text-sm leading-6 text-text-body sm:p-5">
      Your documents are approved. Please review your loan agreement before
      final disbursal.
    </div>
  </div>
);

export default ApprovedDocsTab;
