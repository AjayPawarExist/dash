export function SiteFooter() {
  return (
    <footer
      className="border-t border-white/10 bg-slate-950/70 px-4 py-10 text-sm text-slate-500 backdrop-blur-md md:px-8"
      role="contentinfo"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs">
          © {new Date().getFullYear()} Nirikshan. All rights reserved.
        </p>
        <nav className="flex flex-wrap gap-5 text-xs" aria-label="Footer">
          <a href="#" className="hover:text-slate-300 transition">
            Privacy
          </a>
            <a href="#" className="hover:text-slate-300 transition">
            Terms
          </a>
          <a href="#" className="hover:text-slate-300 transition">
            Docs
          </a>
          <a href="#" className="hover:text-slate-300 transition">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}