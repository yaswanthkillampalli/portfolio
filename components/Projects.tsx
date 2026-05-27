"use client";

import { motion } from 'motion/react';
import { Project } from '../lib/types';
import { Code2, Globe, ArrowUpRight } from 'lucide-react';

export const Projects = ({ projects }: { projects: Project[] }) => {
  return (
    <section id="projects" className="py-24 relative">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-4 relative z-10">
        <div className="flex items-center gap-4">
          <h4 className="text-white font-semibold uppercase text-sm tracking-[0.25em]">
            Selected Works
          </h4>
          <div className="h-[1px] w-12 bg-indigo-500/30 hidden sm:block"></div>
        </div>
        
        <a 
          href="#" 
          className="group flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 font-bold uppercase tracking-widest transition-colors"
        >
          <span>View Archive</span>
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
            whileHover={{ y: -5 }}
            className="group glass-card bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 rounded-3xl p-8 flex flex-col relative overflow-hidden transition-all duration-300 h-full"
          >
            {/* Internal hover gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Corner Icon */}
            <div className="absolute top-8 right-8 p-3 rounded-full bg-white/[0.03] border border-white/5 text-slate-400 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 group-hover:border-indigo-500/30 transition-all duration-300 z-10">
              <ArrowUpRight size={20} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
            </div>
            
            <div className="flex flex-col h-full relative z-10 mt-4">
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-indigo-300 transition-colors duration-300 pr-12">
                {project.title}
              </h3>
              
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {project.description[0]}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tech_stack.map(tech => (
                  <span 
                    key={tech} 
                    className="text-xs px-3 py-1.5 bg-white/[0.03] text-slate-300 rounded-lg border border-white/5 uppercase font-semibold tracking-wider group-hover:border-indigo-500/30 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action Buttons pushed to the bottom */}
              <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-white/5">
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-white/10 rounded-xl text-slate-300 transition-all duration-300"
                  >
                    <Code2 size={16} />
                    <span className="text-xs font-medium tracking-wide">Source</span>
                  </a>
                )}
                {project.live_demo && (
                  <a 
                    href={project.live_demo} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 hover:border-indigo-500/40 rounded-xl text-indigo-300 transition-all duration-300 shadow-[0_0_15px_rgba(99,102,241,0.05)] hover:shadow-[0_0_20px_rgba(99,102,241,0.15)]"
                  >
                    <Globe size={16} />
                    <span className="text-xs font-medium tracking-wide">Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};