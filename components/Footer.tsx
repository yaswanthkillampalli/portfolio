import { Code2, Globe, ExternalLink, Mail } from "lucide-react";
import { PersonalInfo } from "../lib/types";

export const Footer = ({ info }: { info: PersonalInfo }) => {
  const links = [
    { href: info.github, icon: <Code2 size={14} />, label: "GitHub" },
    { href: info.linkedin, icon: <Globe size={14} />, label: "LinkedIn" },
    {
      href: info.portfolio,
      icon: <ExternalLink size={14} />,
      label: "Portfolio",
    },
    {
      href: `mailto:${info.email}`,
      icon: <Mail size={14} />,
      label: info.email,
      highlight: true,
    },
  ];

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/5 py-12 bg-[#080810]/50 backdrop-blur-md">
      {/* Subtle glow behind the top border */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-[100px] w-[600px] bg-indigo-500/10 blur-[80px]" />

      {/* Padding Container matching the <main> tag alignment */}
      <div className="mx-auto w-full px-6 lg:px-12 flex flex-col items-center justify-between gap-8 md:flex-row relative z-10">
        
        {/* Copyright */}
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 md:text-left flex flex-wrap justify-center gap-1.5 items-center">
          <span>&copy; {new Date().getFullYear()}</span>
          <span className="text-slate-300 font-bold">{info.name}</span>
          <span className="mx-1 text-white/10 hidden sm:inline-block">|</span>
          <span>Built with</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400 font-bold">
            Precision.
          </span>
        </p>

        {/* Links */}
        <nav className="flex flex-wrap items-center justify-center gap-3">
          {links.map(({ href, icon, label, highlight }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              className={`group flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                highlight
                  ? "border-indigo-500/20 bg-indigo-500/10 text-indigo-300 hover:bg-indigo-500/20 hover:border-indigo-500/40 hover:text-indigo-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  : "border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className={`transition-transform duration-300 group-hover:scale-110 ${highlight ? "text-indigo-400" : "text-slate-500 group-hover:text-white"}`}>
                {icon}
              </span>
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};