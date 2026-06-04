import { AlertTriangle } from "lucide-react";

const ProfileEmptyState = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed border-border-light bg-surface-muted px-4 py-10 text-center">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-muted">
      <AlertTriangle className="h-7 w-7 text-primary" />
    </div>
    <h3 className="text-lg font-semibold text-text-heading sm:text-xl">
      {title}
    </h3>
    <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary sm:text-base">
      {description}
    </p>
  </div>
);

export default ProfileEmptyState;
