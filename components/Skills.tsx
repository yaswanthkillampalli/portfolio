"use client";

import { motion } from 'motion/react';
import { PortfolioData } from '../lib/types';

export const Skills = ({ skills }: { skills: PortfolioData['technical_skills'] }) => {
  const categories = [
    { title: 'Languages', data: skills.languages },
    { title: 'Web Tech', data: skills.web_technologies },
    { title: 'Cloud & DB', data: skills.databases_cloud },
    { title: 'Tools', data: skills.tools_methodologies },
  ];

  return (
    <section id="skills" className="py-24 relative">
      {/* Subtle ambient background glow for the section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <h4 className="text-white font-semibold uppercase text-sm tracking-[0.25em]">
            Technical Expertise
          </h4>
          {/* Decorative line next to heading */}
          <div className="h-[1px] w-12 bg-indigo-500/30 hidden sm:block"></div>
        </div>
        <span className="text-xs bg-indigo-500/10 text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-500/20 backdrop-blur-md font-medium shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          MERN + AI
        </span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="group glass-card bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 rounded-2xl p-6 flex flex-col gap-5 transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle internal gradient that appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <h5 className="text-xs text-indigo-200/80 font-bold uppercase tracking-widest border-b border-white/10 pb-3 relative z-10">
              {cat.title}
            </h5>
            
            <div className="flex flex-wrap gap-2.5 relative z-10">
              {cat.data.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1.5 bg-white/[0.03] hover:bg-indigo-500/20 border border-white/5 hover:border-indigo-500/40 rounded-lg text-xs font-medium text-slate-300 hover:text-white transition-all duration-300 cursor-default shadow-sm hover:shadow-indigo-500/10"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};