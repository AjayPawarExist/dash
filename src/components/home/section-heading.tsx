import * as React from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  sub,
  center,
  className,
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        center && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <div className="mb-2 text-xs font-medium uppercase tracking-wide text-indigo-300/80">
          {eyebrow}
        </div>
      )}
      <h2 className="text-balance bg-gradient-to-br from-white via-white/90 to-slate-200 bg-clip-text text-2xl font-semibold tracking-tight text-transparent md:text-4xl">
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-sm leading-relaxed text-slate-400 md:text-base">
          {sub}
        </p>
      )}
    </div>
  );
}