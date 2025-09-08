"use client";

import * as React from "react";
import {
  Camera,
  ClipboardCheck,
  Users2,
  Network,
  ArrowRight,
  ShieldCheck,
  MapPin,
  Sparkles,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/**
 * Enhanced Roles Section
 * Visual Language:
 * - Emerald / teal gradient energy
 * - Layered glass card, subtle grid + radial accent
 * - Iconic tab triggers with motion underline
 * - Feature chips: concise value statements
 */

type RoleKey = "officer" | "reviewer" | "citizen" | "admin";

interface RoleSpec {
  title: string;
  tagline: string;
  narrative: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  features: string[];
  accentIcon?: React.ReactNode;
  cta?: string;
}

const ROLES: Record<RoleKey, RoleSpec> = {
  officer: {
    title: "Officer",
    tagline: "Capture. Authenticate. Submit.",
    narrative:
      "Frontline execution: Officers convert on‑site conditions into verifiable, watermarked evidence with embedded geo/time context and device integrity signals.",
    icon: Camera,
    features: [
      "In‑app capture only (photo / video)",
      "Auto geo + timestamp + hash",
      "Watermarked evidentiary media",
      "Track reviewer actions / status",
      "Reply with supplemental proof",
      "Offline queue + resilient upload",
    ],
    cta: "Inspection Flow",
  },
  reviewer: {
    title: "Reviewer",
    tagline: "Assess. Prioritize. Resolve.",
    narrative:
      "Reviewers enforce quality, escalate actionable gaps, apply ratings, and transition inspections through state changes with full traceability.",
    icon: ClipboardCheck,
    features: [
      "Live queue triage",
      "ActionRequired assignment",
      "Structured rating + commentary",
      "State transitions logged",
      "Integrity metadata visibility",
      "Closure validation workflow",
    ],
    cta: "Reviewer Console",
  },
  citizen: {
    title: "Citizen",
    tagline: "Observe. Validate. Signal.",
    narrative:
      "Nearby citizens amplify ground truth—confirming satisfactory work or flagging issues with authenticated supplemental imagery inside a defined radius.",
    icon: Users2,
    features: [
      "Nearby inspections ≤ 4 km",
      "Satisfactory quick feedback",
      "Unsatisfactory evidence attach",
      "Single feedback per 24h guard",
      "Opt-in resolution notifications",
      "Privacy-first minimal PII",
    ],
    cta: "Citizen View",
  },
  admin: {
    title: "Admin",
    tagline: "Govern. Configure. Audit.",
    narrative:
      "Administrators orchestrate trust—managing users, device bindings, locations, SLAs, exports, and audit intelligence for continuous accountability.",
    icon: Network,
    features: [
      "RBAC + district scoping",
      "Device binding revocation",
      "Location & SLA registry",
      "Analytics & export jobs",
      "Full audit diff viewer",
      "Retention & anonymization",
    ],
    cta: "Admin Dashboard",
  },
};

export function RolesSection() {
  const [current, setCurrent] = React.useState<RoleKey>("officer");

  return (
    <section
      id="roles"
      aria-labelledby="roles-heading"
      className="relative mx-auto w-full max-w-7xl px-4 py-28 md:px-8 lg:px-12"
    >
      <Header />
      <div
        className={cn(
          "relative mt-14 overflow-hidden rounded-3xl border border-white/10",
          "bg-white/[0.035] backdrop-blur-xl shadow-[0_4px_28px_-6px_rgba(16,185,129,0.25),0_2px_10px_-2px_rgba(0,0,0,0.55)]",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-3xl",
          "before:bg-[radial-gradient(circle_at_75%_15%,rgba(16,185,129,0.20),rgba(15,23,42,0)_65%)]"
        )}
      >
        <TopAccentGrid />
        <Tabs
          defaultValue="officer"
          value={current}
          onValueChange={(v) => setCurrent(v as RoleKey)}
          className="relative"
        >
          <RoleTabsNav current={current} onChange={setCurrent} />
          {Object.entries(ROLES).map(([key, spec]) => (
            <TabsContent
              key={key}
              value={key}
              forceMount
              className={cn(
                "outline-none focus-visible:ring-0",
                current === key
                  ? "block animate-fade-in"
                  : "hidden opacity-0 pointer-events-none"
              )}
            >
              <RolePanel spec={spec} active={current === key} />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}

/* ---------- Sub Components ---------- */

function Header() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-[10px] font-medium tracking-wide text-emerald-300 backdrop-blur">
        <Sparkles className="h-3 w-3" />
        Multi-Stakeholder Trust Layer
      </div>
      <h2
        id="roles-heading"
        className="mt-6 bg-gradient-to-b from-white via-white to-slate-300 bg-clip-text text-3xl font-semibold tracking-tight text-transparent md:text-5xl"
      >
        Roles Aligned. Data Unified.
      </h2>
      <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">
        Each role contributes verifiable context—inspection evidence,
        structured assessments, citizen validation, and governance controls—
        forming a defensible operational record.
      </p>
    </div>
  );
}

function RoleTabsNav({
  current,
  onChange,
}: {
  current: RoleKey;
  onChange: (r: RoleKey) => void;
}) {
  return (
    <TabsList
      className={cn(
        "relative z-10 mx-auto mt-10 flex w-full max-w-3xl flex-wrap justify-center gap-2",
        "rounded-2xl border border-white/10 bg-white/[0.045] p-2 backdrop-blur",
        "shadow-inner"
      )}
    >
      {Object.entries(ROLES).map(([key, spec]) => {
        const Icon = spec.icon;
        const active = current === key;
        return (
          <TabsTrigger
            key={key}
            value={key}
            aria-label={`${spec.title} role`}
            className={cn(
              "group relative flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-medium tracking-wide outline-none transition",
              "data-[state=active]:text-white text-slate-300",
              "focus-visible:ring-2 focus-visible:ring-emerald-300/40",
              active
                ? "bg-gradient-to-r from-emerald-500/80 to-teal-500/80 shadow-md shadow-emerald-700/30"
                : "hover:bg-white/10"
            )}
            onClick={() => onChange(key as RoleKey)}
          >
            <Icon
              className={cn(
                "h-4 w-4",
                active
                  ? "text-white drop-shadow-[0_0_4px_rgba(255,255,255,0.45)]"
                  : "text-emerald-300"
              )}
            />
            {spec.title}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-px left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 opacity-0 transition-all duration-500",
                active && "w-3/4 opacity-100",
                !active && "group-hover:w-2/5 group-hover:opacity-70"
              )}
            />
          </TabsTrigger>
        );
      })}
    </TabsList>
  );
}

function RolePanel({ spec, active }: { spec: RoleSpec; active: boolean }) {
  return (
    <div
      className={cn(
        "relative mx-auto grid w-full max-w-6xl gap-12 px-5 pb-20 pt-14 md:px-10 lg:grid-cols-12"
      )}
    >
      <div className="relative flex flex-col lg:col-span-5">
        <h3 className="flex items-center gap-3 text-2xl font-semibold tracking-tight text-slate-100 md:text-3xl">
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/[0.05] shadow-inner backdrop-blur">
            <spec.icon className="h-5 w-5 text-emerald-300" />
          </span>
          {spec.title}
        </h3>
        <p className="mt-4 text-xs font-medium uppercase tracking-wide text-emerald-300/80">
          {spec.tagline}
        </p>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
          {spec.narrative}
        </p>
        {spec.cta && (
          <div className="mt-8">
            <Button
              variant="outline"
              className="group border-emerald-400/30 bg-white/5 text-slate-100 backdrop-blur hover:border-emerald-300/60 hover:bg-emerald-400/10"
            >
              {spec.cta}
              <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Button>
          </div>
        )}
        <PanelGlow active={active} side="left" />
      </div>

      <div className="relative lg:col-span-7">
        <div
          className={cn(
            "grid gap-4 sm:grid-cols-2",
            "relative rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6",
            "shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04),0_4px_26px_-6px_rgba(16,185,129,0.25)] backdrop-blur"
          )}
        >
          {spec.features.map((f) => (
            <FeatureChip key={f} text={f} />
          ))}
          <PanelGlow active={active} side="right" />
        </div>
      </div>
    </div>
  );
}

function FeatureChip({ text }: { text: string }) {
  return (
    <div
      className={cn(
        "group relative flex min-h-[70px] flex-col justify-center overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] px-4 py-3",
        "text-[11px] leading-snug text-slate-300 shadow-inner transition",
        "hover:border-emerald-400/40 hover:text-slate-100"
      )}
    >
      <span className="absolute inset-0 rounded-xl opacity-0 transition group-hover:opacity-100 group-hover:ring-1 group-hover:ring-emerald-300/30" />
      <span className="pointer-events-none absolute -left-6 -top-6 h-16 w-16 rounded-full bg-emerald-400/10 blur-xl transition group-hover:scale-125" />
      <span className="relative flex items-start gap-2">
        <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-none text-emerald-300/80" />
        {text}
      </span>
    </div>
  );
}

function PanelGlow({ active, side }: { active: boolean; side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 h-72 w-72 -translate-y-1/2 rounded-full blur-2xl transition-opacity duration-700",
        side === "left"
          ? "-left-24 bg-emerald-500/15"
          : "-right-20 bg-teal-400/15",
        active ? "opacity-100" : "opacity-0"
      )}
    />
  );
}

function TopAccentGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl [mask-image:radial-gradient(circle_at_70%_25%,white,transparent_70%)]"
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to_right,#ffffff 1px,transparent 1px),linear-gradient(to_bottom,#ffffff 1px,transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  );
}

/* ---------- Animations (inject once) ---------- */
const styleId = "__roles_anim";
if (typeof document !== "undefined" && !document.getElementById(styleId)) {
  const style = document.createElement("style");
  style.id = styleId;
  style.textContent = `
@keyframes fade-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.55s cubic-bezier(.4,.0,.2,1);
}
@media (prefers-reduced-motion: reduce) {
  .animate-fade-in { animation: none !important; }
}
`;
  document.head.appendChild(style);
}

export default RolesSection;