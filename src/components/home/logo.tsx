import { Eye } from "lucide-react";
import * as React from "react";

export function Logo({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-1 font-semibold tracking-tight select-none ${className}`}
      aria-label="Nirikshan"
    >
      <Eye className="h-5 w-5 text-emerald-500 drop-shadow-sm" aria-hidden="true" />
      <span className="bg-gradient-to-r from-emerald-400 via-green-500 to-emerald-600 bg-clip-text text-transparent">
        Nirikshan
      </span>
    </div>
  );
}