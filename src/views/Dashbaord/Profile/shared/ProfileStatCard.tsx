const ProfileStatCard = ({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon: React.ElementType;
}) => (
  <div className="rounded-2xl border border-border bg-background p-4">
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-muted">
      <Icon className="h-5 w-5 text-primary" />
    </div>
    <p className="text-sm text-text-secondary">{label}</p>
    <h4 className="mt-1 break-words text-lg font-semibold text-text-heading">
      {value}
    </h4>
  </div>
);

export default ProfileStatCard;
