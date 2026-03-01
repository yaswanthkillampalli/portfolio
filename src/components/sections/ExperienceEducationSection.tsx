"use client";

import { SlideIn } from "@/components/MotionWrapper";
import { Briefcase, GraduationCap } from "lucide-react";

interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

interface Education {
  id: number;
  institution: string;
  degree: string;
  duration: string;
}

interface ExperienceEducationSectionProps {
  experience: Experience[] | null;
  education: Education[] | null;
}

export function ExperienceEducationSection({ experience, education }: ExperienceEducationSectionProps) {
  return (
    <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16">
        <SlideIn delay={0.2}>
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Briefcase className="text-blue-400" /> Experience
          </h3>
          <div className="space-y-12">
            {experience?.map((exp) => (
              <div
                key={exp.id}
                className="relative pl-8 border-l-2 border-gray-800 hover:border-blue-500 transition-colors duration-300"
              >
                <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-blue-500"></div>
                <h4 className="text-xl font-bold text-gray-100">{exp.role}</h4>
                <p className="text-blue-400 font-medium mb-1">{exp.company}</p>
                <span className="text-xs text-gray-500 uppercase tracking-wider block mb-3">{exp.duration}</span>
                <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        </SlideIn>

        <SlideIn delay={0.4}>
          <div className="md:mt-0 mt-12">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-purple-400" /> Education
            </h3>
            <div className="space-y-12">
              {education?.map((edu) => (
                <div
                  key={edu.id}
                  className="relative pl-8 border-l-2 border-gray-800 hover:border-purple-500 transition-colors duration-300"
                >
                  <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-purple-500"></div>
                  <h4 className="text-xl font-bold text-gray-100">{edu.institution}</h4>
                  <p className="text-purple-400 font-medium mb-1">{edu.degree}</p>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{edu.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </SlideIn>
      </div>
    </section>
  );
}
