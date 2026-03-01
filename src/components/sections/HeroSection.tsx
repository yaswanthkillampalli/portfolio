"use client";

import { FadeIn, ScaleIn, FloatIn } from "@/components/MotionWrapper";
import { Terminal } from "lucide-react";

interface HeroSectionProps {
  profile: {
    full_name: string;
    role: string;
    email?: string;
  } | null;
}

export function HeroSection({ profile }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-screen text-center overflow-hidden">
      <FloatIn delay={0.1}>
        <div className="relative border border-white/10 p-2 rounded-full mb-8 bg-[#0a0a0f]/50 backdrop-blur-sm inline-block group">
          <div className="relative w-28 h-28 rounded-full bg-linear-to-br from-[#0a0a0f] to-black flex items-center justify-center text-gray-500 shadow-xl group-hover:text-blue-400 transition-colors">
            <Terminal size={48} />
          </div>
        </div>
      </FloatIn>

      <FadeIn delay={0.2}>
        <div className="mb-6 flex items-center gap-2 text-blue-400">
          <span className="text-sm font-mono uppercase tracking-wider">Web Developer & Designer</span>
        </div>
      </FadeIn>

      <ScaleIn delay={0.3}>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
          <span className="inline-block bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-blue-300 to-blue-500">
            {profile?.full_name || "Yaswanth"}
          </span>
        </h1>
      </ScaleIn>

      <FadeIn delay={0.4}>
        <h2 className="text-xl md:text-2xl text-gray-400 mb-4 font-light max-w-2xl">
          {profile?.role}
        </h2>
        <p className="text-gray-600 mb-10 max-w-xl text-sm">
          Building digital experiences with code & creativity
        </p>
      </FadeIn>

      <FadeIn delay={0.5}>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#about"
            className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all duration-300 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            About Me
          </a>
          <a
            href="#projects"
            className="px-8 py-3 rounded-full border border-white/20 hover:border-blue-400 hover:bg-blue-500/5 transition-all duration-300 font-medium backdrop-blur-sm"
          >
            View Projects
          </a>
        </div>
      </FadeIn>

      {/* Scroll indicator */}
      {/* <FadeIn delay={0.6}>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-blue-400 rounded-full"></div>
          </div>
        </div>
      </FadeIn> */}
    </section>
  );
}
