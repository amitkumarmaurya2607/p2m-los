const ProfileStatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl border border-border-light bg-surface p-4">
    <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-primary-muted text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
      {label}
    </p>
    <h4 className="mt-1 break-words text-xl font-extrabold text-text-heading">
      {value}
    </h4>
  </div>
);

export default ProfileStatCard;
