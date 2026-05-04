import React from "react";
import { ArrowLeft, Clock, Save } from "lucide-react";

type HeaderProps = {
  title?: string;
  subtitle?: string;
  onBack?: () => void;
  onSave?: () => void;
};

const Header: React.FC<HeaderProps> = ({
  title = "Verification",
  subtitle = "APPLICATION",
  onBack,
  onSave,
}) => {
  return (
    <div
      className="
      flex items-center justify-between
      w-full h-[80px]
      px-[56px]
      bg-surface-overlay-90
      border-b border-border
      shadow-[var(--shadow-sm)]
    "
    >
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-muted"
        >
          <ArrowLeft size={18} />
        </button>

        <div>
          <p className="text-xs tracking-widest text-text-muted font-semibold">
            {subtitle}
          </p>
          <h1 className="text-lg font-semibold text-text-heading">
            {title}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-full text-sm text-text-muted">
          <Clock size={14} />
          <span>Auto-saving...</span>
        </div>

        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-primary-muted text-primary rounded-full font-medium"
        >
          <Save size={16} />
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default Header;
