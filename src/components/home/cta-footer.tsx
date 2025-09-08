import { Button } from "@/components/ui/button";
import { SectionHeading } from "./section-heading";

export function CTAFooter() {
  return (
    <section
      className="relative mx-auto w-full max-w-4xl px-4 py-28 text-center md:px-8"
      aria-labelledby="final-cta-heading"
    >
      <SectionHeading
        title="Bring verified accountability to every field inspection."
        sub="Start transforming inspections into trusted, actionable records."
        center
      />
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Button size="lg" className="bg-indigo-500 px-10 text-white hover:bg-indigo-400">
          Request Access
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="text-black/80"
        >
          Contact Us
        </Button>
      </div>
    </section>
  );
}