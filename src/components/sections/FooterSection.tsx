"use client";

import { FadeIn } from "@/components/MotionWrapper";
import { Mail, Linkedin, Github } from "lucide-react";

interface FooterSectionProps {
  profile: {
    full_name: string;
    email?: string;
    linkedin_link?: string;
    github_link?: string;
  } | null;
}

export function FooterSection({ profile }: FooterSectionProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative py-20 border-t border-white/5 bg-[#050508] overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl text-white font-bold mb-3">Let's Build Something</h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-blue-400">Amazing Together</h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="flex justify-center gap-4 mb-12">
            <a
              href={`mailto:${profile?.email}`}
              className="group p-4 rounded-full bg-[#0a0a0f]/80 border border-white/10 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Mail className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
            </a>
            <a
              href={profile?.linkedin_link || "#"}
              className="group p-4 rounded-full bg-[#0a0a0f]/80 border border-white/10 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Linkedin className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
            </a>
            <a
              href={profile?.github_link || "#"}
              className="group p-4 rounded-full bg-[#0a0a0f]/80 border border-white/10 hover:border-blue-400 hover:bg-blue-500/10 transition-all duration-300 backdrop-blur-sm"
            >
              <Github className="text-gray-400 group-hover:text-blue-400 transition-colors" size={24} />
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="w-16 h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm">
            © {currentYear} {profile?.full_name}. Built with Next.js & Supabase
          </p>
        </FadeIn>
      </div>
    </footer>
  );
}
