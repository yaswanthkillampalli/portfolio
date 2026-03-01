"use client";

import { FadeIn, ScaleIn } from "@/components/MotionWrapper";
import { SkillIcon } from "@/components/SkillIcon";

interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}

interface SkillsSectionProps {
  skills: Skill[] | null;
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="relative py-20 bg-[#050508]/50 backdrop-blur-sm border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn>
          <p className="text-center text-gray-500 mb-4 text-sm uppercase tracking-widest font-semibold">
            Tech Stack & Tools
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-bold mb-16 text-white">Technologies I Work With</h2>
        </FadeIn>
        <div className="flex flex-wrap justify-center gap-4">
          {skills?.map((skill: Skill, i) => (
            <ScaleIn key={skill.id} delay={i * 0.02}>
              <div className="group relative flex flex-col items-center justify-center w-28 h-28 bg-[#0a0a0f]/80 rounded-xl border border-white/10 transition-all duration-300 ease-out hover:border-blue-400 hover:bg-blue-500/5 hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer backdrop-blur-sm">
                {/* Icon Container */}
                <div className="relative text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-2 z-10">
                  <SkillIcon iconName={skill.icon} className="w-8 h-8" />
                </div>

                <span className="relative text-xs font-medium text-gray-400 group-hover:text-white transition-colors z-10">
                  {skill.name}
                </span>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}
