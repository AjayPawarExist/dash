import { ShieldCheck, Hash, LocateFixed, FileCheck2, Fingerprint } from "lucide-react";
import { SectionHeading } from "./section-heading";

const items = [
  {
    icon: ShieldCheck,
    label: "Signed Payloads",
    desc: "Device-bound key signatures verify submission integrity.",
  },
  {
    icon: LocateFixed,
    label: "Geo Precision",
    desc: "PostGIS radius, speed & plausibility checks.",
  },
  {
    icon: Hash,
    label: "Hashed Media",
    desc: "Hash chain links media + metadata immutably.",
  },
  {
    icon: Fingerprint,
    label: "Mock Detection",
    desc: "Heuristics & anomalies reduce spoof attempts.",
  },
  {
    icon: FileCheck2,
    label: "Full Audit Trail",
    desc: "Every transition logged with diff snapshots.",
  },
];

export function TrustStrip() {
  return (
    <section
      id="trust"
      className="relative mx-auto w-full max-w-6xl px-4 py-24 md:px-8"
      aria-labelledby="trust-heading"
    >
      <SectionHeading
        eyebrow="Integrity"
        title="Trust-Built Architecture"
        sub="Nirikshan layers cryptographic evidence, geospatial validation, and tamper-evident logging to establish defensible inspection records."
        center
      />
      <div className="mt-14 grid gap-4 md:grid-cols-5">
        {items.map((i) => {
          const Icon = i.icon;
            return (
              <div
                key={i.label}
                className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-indigo-400/40"
              >
                <div className="flex items-center gap-2">
                  <Icon className="h-4 w-4 text-indigo-300" />
                  <p className="text-xs font-medium text-slate-100">
                    {i.label}
                  </p>
                </div>
                <p className="mt-2 text-[11px] leading-snug text-slate-400">
                  {i.desc}
                </p>
              </div>
            );
        })}
      </div>
    </section>
  );
}