import React from "react";
import { Loader2 } from "lucide-react";

export default function PublicLoading() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-background">
      <div className="relative">
        {/* Outer Glow */}
        <div className="absolute -inset-4 bg-primary/20 blur-xl rounded-full animate-pulse" />

        {/* Animated Rings */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-primary/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin" />
          <Loader2 className="absolute text-primary animate-pulse" size={24} />
        </div>
      </div>

      <div className="mt-8 text-center space-y-2">
        <h3 className="text-xl font-black text-text-heading tracking-tight">
          RinSetu<span className="text-secondary">.</span>
        </h3>
        <p className="text-sm font-medium text-text-secondary animate-pulse">
          Loading secure content...
        </p>
      </div>
    </div>
  );
}
