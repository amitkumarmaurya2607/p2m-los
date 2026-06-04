const ProfileField = ({
  label,
  value,
  full = false,
}: {
  label: string;
  value?: string | number | null;
  full?: boolean;
}) => (
  <div className={full ? "sm:col-span-2 min-w-0" : "min-w-0"}>
    <label className="mb-2 block text-sm font-medium text-text-muted">
      {label}
    </label>

    <div
      className="min-h-11 w-full max-w-full overflow-hidden break-words rounded-xl border
      border-border bg-background px-4 py-2.5 text-sm text-text-heading sm:text-base"
    >
      {value ? String(value) : "-"}
    </div>
  </div>
);

export default ProfileField;
