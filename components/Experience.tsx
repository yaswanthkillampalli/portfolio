"use client";

import { motion } from "motion/react";
import { Experience as ExperienceType } from "../lib/types";
import { MapPin } from "lucide-react";

export const Experience = ({ experience }: { experience: ExperienceType[] }) => {
  return (
    <section id="experience" className="py-24 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col gap-16 md:flex-row relative z-10">
        {/* ── Sidebar label ── */}
        <div className="md:w-1/3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-24"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-indigo-400">
                Career Timeline
              </span>
              <div className="h-[1px] w-8 bg-indigo-500/30"></div>
            </div>
            
            <h2 className="mb-6 text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Where I&rsquo;ve
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                worked.
              </span>
            </h2>
            <p className="text-base leading-relaxed text-slate-400 pr-4">
              Professional trajectory focused on full-stack excellence and cutting-edge AI integration.
            </p>
          </motion.div>
        </div>

        {/* ── Timeline ── */}
        <div className="relative md:w-2/3">
          {/* Vertical line */}
          <div className="absolute left-0 top-4 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-white/10 to-transparent" />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.1 }}
                className="group relative pl-10"
              >
                {/* Interactive Timeline Dot */}
                <div className="absolute -left-[5px] top-10 h-3 w-3 rounded-full border-2 border-[#080810] bg-slate-600 group-hover:bg-indigo-400 group-hover:border-indigo-300 shadow-[0_0_0_rgba(99,102,241,0)] group-hover:shadow-[0_0_15px_rgba(99,102,241,0.6)] transition-all duration-500 z-10" />

                <div className="relative rounded-3xl border border-white/5 bg-white/[0.02] p-8 overflow-hidden transition-all duration-300 group-hover:border-indigo-500/30">
                  
                  {/* Internal hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    {/* Header row */}
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      <div>
                        <h6 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors duration-300">
                          {exp.role}
                        </h6>
                        <p className="mt-1 text-sm font-medium text-slate-400">
                          {exp.company}
                        </p>
                      </div>
                      <span className="inline-flex w-fit items-center rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-1.5 font-mono text-xs font-semibold uppercase tracking-widest text-indigo-300">
                        {exp.duration}
                      </span>
                    </div>

                    {/* Location */}
                    <div className="mb-6 flex items-center gap-2">
                      <MapPin size={14} className="text-slate-500" />
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                        {exp.location}
                      </span>
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-3">
                      {exp.responsibilities.map((res, idx) => (
                        <li
                          key={idx}
                          className="group/item flex gap-4 text-sm leading-relaxed text-slate-400 hover:text-slate-300 transition-colors duration-300"
                        >
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-500/30 group-hover/item:bg-indigo-400 group-hover/item:shadow-[0_0_8px_rgba(99,102,241,0.8)] transition-all duration-300" />
                          <span>{res}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};