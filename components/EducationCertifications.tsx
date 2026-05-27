"use client";

import { motion } from "motion/react";
import { Education, Certification } from "../lib/types";
import { Award, GraduationCap } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: {
    duration: 0.5,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

export const EducationCertifications = ({
  education,
  certifications,
}: {
  education: Education[];
  certifications: Certification[];
}) => {
  return (
    <section className="relative py-24 border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
        {/* ── Education ── */}
        <motion.div {...fadeUp(0)}>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <GraduationCap size={20} />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">
                Academic Journey
              </h4>
              <div className="h-[1px] flex-1 max-w-[50px] bg-indigo-500/30"></div>
            </div>
          </div>

          <div className="relative space-y-0 border-l border-white/10 pl-8 ml-5">
            {education.map((edu, i) => (
              <motion.div
                key={edu.id}
                {...fadeUp(0.1 * i)}
                className="relative pb-10 last:pb-0 group"
              >
                {/* Interactive Timeline dot */}
                <div className="absolute -left-[37px] top-2 h-3 w-3 rounded-full border-2 border-[#080810] bg-slate-600 group-hover:bg-indigo-400 group-hover:border-indigo-300 shadow-[0_0_0_rgba(99,102,241,0)] group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-500" />

                <div className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-6 overflow-hidden transition-all duration-300 group-hover:border-indigo-500/30">
                  {/* Internal hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="mb-3 flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <h5 className="text-lg font-bold text-white leading-snug group-hover:text-indigo-300 transition-colors duration-300">
                        {edu.degree}
                      </h5>
                      <span className="inline-flex w-fit shrink-0 items-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-xs font-semibold text-indigo-300">
                        {edu.duration}
                      </span>
                    </div>

                    <p className="mb-4 text-sm font-medium text-slate-400">
                      {edu.institution}
                    </p>

                    {(edu.cgpa || edu.gpa) && (
                      <span className="inline-flex items-center rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 font-mono text-xs font-medium text-slate-300 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5 transition-colors">
                        {edu.cgpa ? `CGPA: ${edu.cgpa}` : `GPA: ${edu.gpa}`}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Certifications ── */}
        <motion.div {...fadeUp(0.2)}>
          <div className="mb-10 flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.1)]">
              <Award size={20} />
            </div>
            <div className="flex items-center gap-4 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-300">
                Certifications
              </h4>
              <div className="h-[1px] flex-1 max-w-[50px] bg-indigo-500/30"></div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                {...fadeUp(0.1 * i)}
                className="group relative flex items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 overflow-hidden transition-all duration-300 hover:border-indigo-500/30"
              >
                {/* Internal hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Icon */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/5 bg-white/[0.03] text-slate-400 transition-all duration-300 group-hover:border-indigo-500/30 group-hover:bg-indigo-500/10 group-hover:text-indigo-300 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]">
                  <Award size={20} />
                </div>

                <div className="min-w-0 flex-1 relative z-10">
                  <h6 className="mb-1 truncate text-sm font-bold text-white group-hover:text-indigo-200 transition-colors">
                    {cert.name}
                  </h6>
                  <p className="text-xs font-medium text-slate-400">
                    {cert.issuer}
                  </p>
                </div>

                <span className="relative z-10 shrink-0 font-mono text-xs font-medium text-slate-500 group-hover:text-indigo-300/70 transition-colors">
                  {cert.date}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};