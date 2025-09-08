"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "./section-heading";

const metrics = [
  { label: "Geo‑verified media", value: 98, suffix: "%", color: "text-indigo-300" },
  { label: "Faster review cycles", value: 72, suffix: "%", color: "text-emerald-300" },
  { label: "Citizen engagement uplift", value: 41, suffix: "%", color: "text-amber-300" },
];

export function Metrics() {
  return (
    <section
      id="metrics"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 md:px-8"
      aria-labelledby="metrics-heading"
    >
      <SectionHeading
        eyebrow="Impact"
        title="Operational Gains That Compound"
        sub="Early pilots show higher verification assurance, reduced review backlog, and increased citizen signal quality."
        center
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  suffix,
  color,
}: {
  label: string;
  value: number;
  suffix: string;
  color: string;
}) {
  const ref = React.useRef<HTMLDivElement | null>(null);
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame: number;
    let start: number | null = null;
    const duration = 1600;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const animate = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return (
    <div
      ref={ref}
      className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
    >
      <p className="text-4xl font-semibold tracking-tight text-slate-100">
        <span className={cn(color)}>{display}</span>
        <span className="ml-1 text-slate-400">{suffix}</span>
      </p>
      <p className="mt-3 text-sm text-slate-400">{label}</p>
    </div>
  );
}