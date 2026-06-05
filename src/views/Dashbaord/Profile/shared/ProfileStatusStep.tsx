import { Shield } from "lucide-react";

type State = "done" | "active" | "pending";

const stateStyles: Record<
  State,
  { dot: string; text: string; line: string }
> = {
  done: {
    dot: "border-home-green/20 bg-home-green shadow-[var(--shadow-green-ring)]",
    text: "text-home-green",
    line: "bg-home-green",
  },
  active: {
    dot: "border-home-purple/20 bg-home-purple shadow-[var(--shadow-purple-ring)]",
    text: "text-home-purple",
    line: "bg-home-purple/30",
  },
  pending: {
    dot: "border-white bg-text-on-dark-muted",
    text: "text-text-muted-light",
    line: "bg-border-medium",
  },
};

const ProfileStatusStep = ({
  title,
  description,
  state,
  isLast = false,
}: {
  title: string;
  description: string;
  state: State;
  isLast?: boolean;
}) => {
  const colors = stateStyles[state];

  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className={`h-5 w-5 rounded-full border-4 ${colors.dot}`} />
        {!isLast && <div className={`mt-1 w-0.5 flex-1 ${colors.line}`} />}
      </div>
      <div className="pb-8 flex-1">
        <h4 className={`text-sm font-bold ${colors.text}`}>{title}</h4>
        {state === "active" ? (
          <div className="mt-2 flex items-center gap-2 rounded-xl border border-border-light bg-surface-muted px-4 py-3 text-sm font-medium text-text-body">
            <Shield className="h-4 w-4 text-home-purple shrink-0" />
            {description}
          </div>
        ) : (
          <p className="mt-1 text-sm font-medium text-text-muted-dark">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfileStatusStep;
