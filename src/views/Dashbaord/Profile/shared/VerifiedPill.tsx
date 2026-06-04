import { CheckCircle2, Clock3 } from "lucide-react";

const VerifiedPill = ({ verified }: { verified?: boolean }) => (
  <span
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs
      font-bold ${verified
        ? "border-home-green/20 bg-primary-muted text-primary"
        : "border-border-light bg-muted text-text-muted"
      }`}
  >
    {verified ? (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ) : (
      <Clock3 className="h-3.5 w-3.5" />
    )}
    {verified ? "Verified" : "Not verified"}
  </span>
);

export default VerifiedPill;
