import { CheckCircle2 } from "lucide-react";

const ProfileStatusStep = ({
  title,
  description,
  completed,
  active,
}: {
  title: string;
  description: string;
  completed?: boolean;
  active?: boolean;
}) => (
  <div className="relative flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold
        ${completed
            ? "border-primary bg-primary text-white"
            : active
              ? "border-primary bg-primary-muted text-primary"
              : "border-border bg-background text-text-muted"
          }`}
      >
        {completed ? <CheckCircle2 className="h-5 w-5" /> : active ? "•" : ""}
      </div>
      <div className="h-full min-h-10 w-px bg-border" />
    </div>

    <div className="pb-6">
      <h4 className="text-sm font-semibold text-text-heading sm:text-base">
        {title}
      </h4>
      <p className="mt-1 text-sm leading-6 text-text-secondary">
        {description}
      </p>
    </div>
  </div>
);

export default ProfileStatusStep;
