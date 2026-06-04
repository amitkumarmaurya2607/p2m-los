import React from "react";

type ProfileFieldProps = {
  label: string;
  value?: string | number | null;
  full?: boolean;
};

const ProfileField = ({ label, value, full = false }: ProfileFieldProps) => {
  return (
    <div
      className={[
        "min-w-0 border-b border-border/80 py-5",
        full ? "sm:col-span-2" : "",
      ].join(" ")}
    >
      <p className="mb-2 text-sm font-medium text-text-muted sm:text-base">
        {label}
      </p>

      <p className="break-words text-sm font-medium text-text-heading sm:text-base">
        {value || "-"}
      </p>
    </div>
  );
};

export default ProfileField;