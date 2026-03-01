"use client";

import Image from "next/image";
import { FadeIn, ScaleIn } from "@/components/MotionWrapper";
import { Code, ExternalLink } from "lucide-react";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image_url: string;
}

interface ProjectsSectionProps {
  projects: Project[] | null;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center text-white">
            Featured <span className="text-blue-400">Projects</span>
          </h2>
          <p className="text-center text-gray-500 mb-16 max-w-2xl mx-auto">
            Showcasing my best work in web development
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, i) => (
            <ScaleIn key={project.id} delay={i * 0.1}>
              <div className="group relative bg-[#0a0a0f]/90 border border-white/10 rounded-xl overflow-hidden hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 h-full flex flex-col backdrop-blur-sm hover:shadow-lg hover:shadow-blue-500/10">
                {/* Image Section */}
                <div className="relative w-full h-48 overflow-hidden bg-[#050508]">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-600">
                      <Code size={40} />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-[#0a0a0f] to-transparent opacity-60"></div>
                </div>

                {/* Content Section */}
                <div className="relative p-5 flex flex-col grow">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{project.title}</h3>
                    <a href={project.link} target="_blank" className="text-gray-500 hover:text-blue-400 transition-all p-2">
                      <ExternalLink size={18} />
                    </a>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 grow leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.technologies?.map((tech: string, index: number) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 text-xs rounded-md bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:border-blue-400/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScaleIn>
          ))}
        </div>
      </div>
    </section>
  );
}
