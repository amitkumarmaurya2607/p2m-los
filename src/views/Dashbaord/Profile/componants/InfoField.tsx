export type InfoItemType = {
  label: string;
  value?: string | number | null;
  icon?: React.ReactNode;
  valueClassName?: string;
};

const formatValue = (value?: string | number | null) => {
  if (value === null || value === undefined || value === "") return "-";
  return value;
};

export function InfoField({ label, value, icon, valueClassName = "" }: InfoItemType) {
  return (
    <div className="min-w-0">
      <p
        className="text-[10px] font-bold uppercase leading-4 tracking-[0.4px] text-[#90A1B9]
          sm:text-xs"
      >
        {label}
      </p>

      <div className="mt-0.5 flex min-w-0 items-center gap-2">
        {icon && <span className="shrink-0 text-[#90A1B9]">{icon}</span>}

        <p
          className="break-words text-sm font-semibold leading-5 text-[#1D293D] sm:text-base
            sm:leading-6"
        >
          {formatValue(value)}
        </p>
      </div>
    </div>
  );
}
