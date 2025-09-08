"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Camera,
  MapPin,
  ShieldCheck,
  CheckCircle2,
  Hash,
  GlobeLock,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero Component — Premium Version
 *
 * Props (extend if needed):
 * - onPrimary?: () => void
 * - onSecondary?: () => void
 */
export function Hero({
  onPrimary,
  onSecondary,
}: {
  onPrimary?: () => void;
  onSecondary?: () => void;
}) {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex w-full flex-col"
    >
      <BackgroundCanvas />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col px-4 pt-28 md:px-8 lg:px-10">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          {/* Left / Content */}
            <div className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-medium tracking-wide text-emerald-300 shadow-sm ring-1 ring-inset ring-white/10 backdrop-blur">
              <span className="inline-flex h-2 w-2 animate-pulse rounded-full bg-emerald-400/90 shadow-[0_0_0_3px_rgba(16,185,129,0.2)]" />
              Secure Geo‑Verified Inspections
            </div>

            <h1
              id="hero-heading"
              className={cn(
                "mt-6 text-balance font-semibold tracking-tight",
                "text-4xl leading-[1.05] sm:text-5xl md:text-[3.35rem]"
              )}
            >
              <span className="bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-transparent">
                Capture Proof. Verify Context.
              </span>
              <span className="mt-3 block bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 bg-clip-text text-transparent">
                Resolve With Accountability.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-sm leading-relaxed text-slate-400 md:text-[15px] md:leading-relaxed">
              Nirikshan transforms field inspections into cryptographically
              anchored records—geo‑tagged, watermarked, and reviewable in
              real time—while amplifying verifiable citizen feedback.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                onClick={onPrimary}
                size="lg"
                className="group relative overflow-hidden bg-emerald-500 px-8 text-white shadow-lg shadow-emerald-600/30 transition hover:bg-emerald-400 focus-visible:ring-emerald-300"
              >
                <RadialSheen />
                <span className="relative z-10">Get Early Access</span>
              </Button>
              <Button
                onClick={onSecondary}
                size="lg"
                variant="outline"
                className="border-emerald-400/30 bg-white/5 px-7 text-slate-100 backdrop-blur hover:bg-white/10 hover:text-white"
                asChild
              >
                <a href="#roles" aria-label="View stakeholder workflow">
                  View Workflow
                </a>
              </Button>
            </div>

            <TrustBadges className="mt-10" />

            <FeatureList className="mt-10 hidden w-full max-w-md lg:block" />
          </div>

          {/* Right / Evidence Card */}
          <div className="relative -mx-2 flex justify-center lg:col-span-6 lg:mx-0">
            <EvidencePreview />
            <FeatureList className="mt-12 w-full max-w-md lg:hidden" />
          </div>
        </div>
      </div>

      <div className="pointer-events-none mt-20 flex justify-center">
        <div className="h-px w-2/3 max-w-3xl bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent blur-[1px]" />
      </div>
    </section>
  );
}

/* -------------------- Sub Components -------------------- */

function FeatureList({ className }: { className?: string }) {
  const items = [
    {
      icon: <Camera className="h-4 w-4 text-emerald-300" />,
      title: "Authenticated Capture",
      desc: "No gallery injection—direct device media only.",
    },
    {
      icon: <MapPin className="h-4 w-4 text-emerald-300" />,
      title: "Spatial Validation",
      desc: "PostGIS radius & anomaly heuristics.",
    },
    {
      icon: <ShieldCheck className="h-4 w-4 text-emerald-300" />,
      title: "Tamper Evident",
      desc: "Signed hash chain & audit trail.",
    },
  ];
  return (
    <ul
      className={cn(
        "grid gap-3 [--col:1fr] sm:[--col:1fr_1fr] md:[--col:1fr] lg:[--col:1fr] xl:[--col:1fr_1fr]",
        "grid-cols-[var(--col)]",
        className
      )}
      aria-label="Platform Highlights"
    >
      {items.map((i) => (
        <li
          key={i.title}
          className="group relative flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-3 backdrop-blur transition hover:border-emerald-400/40"
        >
          <div className="mt-0.5">{i.icon}</div>
          <div className="space-y-1">
            <p className="text-xs font-medium text-slate-200">{i.title}</p>
            <p className="text-[11px] leading-snug text-slate-400">{i.desc}</p>
          </div>
          <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 ring-1 ring-emerald-300/30 transition group-hover:opacity-100" />
        </li>
      ))}
    </ul>
  );
}

function TrustBadges({ className }: { className?: string }) {
  const items = [
    { icon: <Hash className="h-3.5 w-3.5" />, label: "Hashed" },
    { icon: <GlobeLock className="h-3.5 w-3.5" />, label: "Geo‑Bound" },
    { icon: <CheckCircle2 className="h-3.5 w-3.5" />, label: "Audited" },
  ];
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 text-[11px] text-slate-400",
        className
      )}
      aria-label="Integrity Indicators"
    >
      {items.map((b) => (
        <span
          key={b.label}
          className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-medium tracking-wide text-slate-300 shadow-sm backdrop-blur transition hover:border-emerald-400/40 hover:text-white"
        >
          <span className="text-emerald-300">{b.icon}</span>
          {b.label}
        </span>
      ))}
    </div>
  );
}

function EvidencePreview() {
  return (
    <div
      className={cn(
        "relative w-full max-w-[540px]",
        "rounded-3xl border border-white/10 bg-white/[0.035] px-4 pb-4 pt-5",
        "shadow-[0_4px_32px_-8px_rgba(16,185,129,0.25),0_2px_8px_-2px_rgba(0,0,0,0.5)]",
        "backdrop-blur-xl"
      )}
      aria-label="Inspection Evidence Example"
    >
      {/* Accent border mask */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10 before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(circle_at_70%_20%,rgba(16,185,129,0.25),rgba(15,23,42,0)_70%)]" />

      {/* Fake window header */}
      <div className="mb-3 flex items-center gap-1.5 pl-1">
        {["bg-rose-400", "bg-amber-400", "bg-emerald-400"].map((c) => (
          <span
            key={c}
            className={cn(
              "h-2.5 w-2.5 rounded-full border border-black/40 shadow-inner",
              c
            )}
          />
        ))}
        <span className="ml-2 text-[10px] font-medium tracking-wide text-slate-400">
          Recent Capture
        </span>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-white/10">
        <Image
          src="/immh.png"
          alt="Captured site with compliance watermark overlay"
          width={1280}
          height={800}
          priority
          className="h-72 w-full select-none object-cover brightness-[0.95]"
        />

        {/* Watermark ribbon */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-1 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium tracking-wide text-emerald-300">
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              18.2345N, 73.9123E
            </span>
            <span>2025-09-08 14:21 UTC</span>
            <span className="inline-flex items-center gap-1">
              <Hash className="h-3 w-3" />
              sha256:a9f3...7be
            </span>
          </p>
          <p className="text-[10px] text-slate-300/70">
            Device-signed | Integrity verified
          </p>
        </div>

        {/* Floating accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-400/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-teal-400/10 blur-2xl" />
        </div>
      </div>

      {/* Quick stats */}
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        <StatBadge
          label="Geo Verified"
          value="98%"
          desc="Radius validation"
        />
        <StatBadge label="Action SLA" value="<12h" desc="Median" />
        <StatBadge label="Citizen Sync" value="4 km" desc="Feedback zone" />
      </div>
    </div>
  );
}

function StatBadge({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] p-3 shadow-inner backdrop-blur transition hover:border-emerald-400/40">
      <p className="text-[10px] font-medium tracking-wide text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold leading-none tracking-tight text-slate-100">
        {value}
      </p>
      <p className="mt-1 text-[10px] text-slate-500">{desc}</p>
      <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 ring-1 ring-emerald-300/30 transition group-hover:opacity-100" />
    </div>
  );
}

/* Background layers */
function BackgroundCanvas() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(140deg,#0B1215_0%,#0E1B21_55%,#07191a_100%)]" />
      {/* Subtle grid (mask) */}
      <div
        className="absolute inset-0 opacity-[0.08] [mask-image:radial-gradient(circle_at_center,white,transparent_70%)]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,#ffffff 1px,transparent 1px),linear-gradient(to_bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />
      {/* Radial focal */}
      <div className="absolute left-1/2 top-1/2 h-[120vh] w-[120vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.18),rgba(0,0,0,0)_65%)] blur-[60px]" />
      {/* Noise overlay */}
      <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 [background:repeating-linear-gradient(45deg,rgba(255,255,255,0.03)_0_2px,transparent_2px_4px)]" />
    </div>
  );
}

function RadialSheen() {
  return (
    <span className="pointer-events-none absolute inset-0 overflow-hidden">
      <span className="absolute -inset-px rounded-md bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),rgba(255,255,255,0)_70%)] opacity-0 transition group-hover:opacity-100" />
    </span>
  );
}