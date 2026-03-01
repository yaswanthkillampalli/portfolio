import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { AnimatedGrid, GlowOrbs } from "@/components/BackgroundEffects";
import { SmoothScrollOptimizer } from "@/components/SmoothScroll";
import { PageVisitTracker } from "@/components/PageVisitTracker";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceEducationSection } from "@/components/sections/ExperienceEducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { FooterSection } from "@/components/sections/FooterSection";
import type { Profile, Project, Experience, Education, Skill } from "@/lib/types";

async function getData() {
  const { data: profile } = await supabase.from('profile').select('*').single();
  const { data: projects } = await supabase.from('projects').select('*').order('id', { ascending: false });
  const { data: experience } = await supabase.from('experience').select('*').order('id', { ascending: true });
  const { data: education } = await supabase.from('education').select('*').order('id', { ascending: true });
  const { data: skills } = await supabase.from('skills').select('*');

  return { profile, projects, experience, education, skills };
}

export default async function Home() {
  const { profile, projects, experience, education, skills } = await getData();

  // Dynamic Stats
  const projectCount = projects?.length || 0;
  const experienceYears = "1+";
  const certifications = "10+";

  const statsData = {
    projectCount,
    experienceYears,
    certifications,
  };

  return (
    <main className="min-h-screen bg-[#050508] text-gray-100 selection:bg-blue-500/20 relative overflow-hidden">
      {/* Page Visit Tracker - Send webhook on visit */}
      <PageVisitTracker />
      
      {/* Smooth Scroll Optimizer */}
      <SmoothScrollOptimizer />
      
      {/* Background Effects - GPU Accelerated */}
      <div className="fixed inset-0 pointer-events-none" style={{ transform: 'translateZ(0)' }}>
        <AnimatedGrid />
        <GlowOrbs />
      </div>

      <Navbar />

      {/* Section Components with CSS Containment */}
      <div style={{ isolation: 'isolate' }}>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} stats={statsData} />
        <SkillsSection skills={skills} />
        <ExperienceEducationSection experience={experience} education={education} />
        <ProjectsSection projects={projects} />
        <FooterSection profile={profile} />
      </div>
    </main>
  );
}
