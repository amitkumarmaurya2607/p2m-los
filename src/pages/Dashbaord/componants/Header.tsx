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
      bg-white/90
      border-b border-slate-200
      shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]
    "
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100"
        >
          <ArrowLeft size={18} />
        </button>

        {/* Title */}
        <div>
          <p className="text-xs tracking-widest text-slate-400 font-semibold">
            {subtitle}
          </p>
          <h1 className="text-lg font-semibold text-slate-800">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Auto Saving */}
        <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-full text-sm text-slate-500">
          <Clock size={14} />
          <span>Auto-saving...</span>
        </div>

        {/* Save Button */}
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-full font-medium"
        >
          <Save size={16} />
          Save & Exit
        </button>
      </div>
    </div>
  );
};

export default Header;