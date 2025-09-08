import { NavBar } from "@/components/home/nav-bar";
import { Hero } from "@/components/home/hero";
import { TrustStrip } from "@/components/home/trust-strip";
import { CTAFooter } from "@/components/home/cta-footer";
import { SiteFooter } from "@/components/home/site-footer";
import Roles from "@/components/home/roles";
import { Metrics } from "@/components/home/metrics";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen scroll-smooth bg-[#0B0F17] font-sans text-white antialiased">
      <NavBar />
      <main id="main">
        <Hero />
        <div id="features" />
        <Roles />
        <TrustStrip />
        <Metrics />
        <CTAFooter />
      </main>
      <SiteFooter />
    </div>
  );
}