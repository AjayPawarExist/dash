"use client";

import * as React from "react";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NavBar() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 mx-auto flex h-14 w-full max-w-screen-2xl items-center gap-6 px-4 transition",
        scrolled
          ? "backdrop-blur-md bg-slate-900/70 border-b border-white/10"
          : "bg-transparent"
      )}
      role="banner"
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded focus:bg-indigo-600 focus:px-3 focus:py-1 focus:text-white"
      >
        Skip to content
      </a>
      <Logo />
      <nav
        aria-label="Primary"
        className="hidden items-center gap-6 text-sm text-slate-300 md:flex"
      >
        <a href="#features" className="hover:text-white transition">
          Features
        </a>
        <a href="#roles" className="hover:text-white transition">
          Roles
        </a>
        <a href="#trust" className="hover:text-white transition">
          Trust
        </a>
        <a href="#metrics" className="hover:text-white transition">
          Impact
        </a>
      </nav>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="sm">
          Docs
        </Button>
        <Button size="sm" className="bg-indigo-500 hover:bg-indigo-400 text-white">
          Get Early Access
        </Button>
      </div>
    </header>
  );
}