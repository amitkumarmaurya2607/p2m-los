const ProfileInfoCard = ({
  title,
  children,
  icon: Icon,
}: {
  title: string;
  children: React.ReactNode;
  icon: React.ElementType;
}) => (
  <section className="rounded-2xl border border-border bg-surface p-4 sm:p-5">
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-muted">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="text-lg font-semibold text-text-heading sm:text-xl">
        {title}
      </h3>
    </div>

    {children}
  </section>
);

export default ProfileInfoCard;
