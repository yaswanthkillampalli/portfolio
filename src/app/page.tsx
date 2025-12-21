import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import { FadeIn, SlideIn } from "@/components/MotionWrapper"; 
import { SkillIcon } from "@/components/SkillIcon";
import Image from "next/image";
import { 
  Briefcase, 
  GraduationCap, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  User, 
  Code, 
  Award, 
  Clock 
} from "lucide-react";

// ... (Keep all your existing Interfaces: Project, Experience, Education, Skill) ...
interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    image_url: string;
}

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

interface Skill {
    id: number;
    name: string;
    category: string;
    icon: string;
}

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
  const experienceYears = "1+"; // You can make this dynamic later if you want
  const certifications = "10+"; // Based on your PDF

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-gray-100 selection:bg-purple-500/30">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center justify-center min-h-[80vh] text-center overflow-hidden">
        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -z-10"></div>

        <FadeIn delay={0.1}>
          <div className="border border-white/10 p-2 rounded-full mb-8 bg-white/5 backdrop-blur-sm inline-block">
            <div className="w-32 h-32 rounded-full bg-linear-to-br from-gray-800 to-black flex items-center justify-center text-gray-400 shadow-2xl">
              <User size={64} />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 tracking-tight">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-400 via-purple-400 to-pink-400">
              {profile?.full_name || "Yaswanth"}
            </span>
          </h1>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <h2 className="text-2xl text-gray-300 mb-8 font-light">
            {profile?.role}
          </h2>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex gap-4 justify-center">
             <a href="#about" className="px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-medium transition shadow-lg shadow-blue-500/20">
               About Me
             </a>
             <a href="#projects" className="px-8 py-3 rounded-full border border-white/20 hover:bg-white/10 transition font-medium">
               View Projects
             </a>
          </div>
        </FadeIn>
      </section>


      {/* --- NEW: DETAILED ABOUT ME SECTION --- */}
      <section id="about" className="py-20 px-6 max-w-7xl mx-auto border-t border-white/5">
        <FadeIn>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                
                {/* Left: Text Content */}
                <div>
                    <h3 className="text-blue-400 font-semibold uppercase tracking-wider mb-2">My Story</h3>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">A bit about me.</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-6">
                        {profile?.bio}
                    </p>
                    <p className="text-gray-400 leading-relaxed">
                        I specialize in MERN stack development and have a growing passion for AI integrations. 
                        When I'm not coding, you can find me exploring new ML algorithms or optimizing backend performance.
                    </p>
                </div>

                {/* Right: Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    
                    {/* Stat Card 1 */}
                    <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition">
                        <Code className="text-blue-400 mb-2" size={32} />
                        <h4 className="text-3xl font-bold text-white mb-1">{projectCount}</h4>
                        <p className="text-gray-500 text-sm">Projects Completed</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition">
                        <Clock className="text-purple-400 mb-2" size={32} />
                        <h4 className="text-3xl font-bold text-white mb-1">{experienceYears}</h4>
                        <p className="text-gray-500 text-sm">Years Experience</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5 hover:border-pink-500/30 transition">
                        <Award className="text-pink-400 mb-2" size={32} />
                        <h4 className="text-3xl font-bold text-white mb-1">{certifications}</h4>
                        <p className="text-gray-500 text-sm">Certifications</p>
                    </div>

                    {/* Stat Card 4 */}
                    <div className="bg-[#12121a] p-6 rounded-2xl border border-white/5 hover:border-green-500/30 transition">
                        <User className="text-green-400 mb-2" size={32} />
                        <h4 className="text-3xl font-bold text-white mb-1">Open</h4>
                        <p className="text-gray-500 text-sm">To Work</p>
                    </div>

                </div>
            </div>
        </FadeIn>
      </section>


      {/* --- SKILLS SECTION --- */}
      <section className="py-12 bg-white/5 backdrop-blur-sm">
         {/* ... (Keep existing skills code) ... */}
         <div className="max-w-7xl mx-auto px-6">
           <p className="text-center text-gray-400 mb-10 text-sm uppercase tracking-widest font-semibold">Tech Stack & Tools</p>
           {/* src/app/page.tsx - Inside the Skills Section */}
            <div className="flex flex-wrap justify-center gap-6">
              {skills?.map((skill: Skill, i) => (
                <FadeIn key={skill.id} delay={i * 0.05}>
                  <div className="group flex flex-col items-center justify-center w-28 h-28 
                    bg-black/40 rounded-2xl border border-white/10 
                    transition-all duration-300 ease-in-out
                    hover:border-blue-500 hover:bg-blue-500/10 hover:-translate-y-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                    
                    {/* Icon Container */}
                    <div className="text-gray-400 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300 mb-3">
                      <SkillIcon iconName={skill.icon} className="w-8 h-8" />
                    </div>
                    
                    <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  
                  </div>
                </FadeIn>
              ))}
            </div>
        </div>
      </section>

      {/* --- EXPERIENCE & EDUCATION --- */}
      {/* ... (Keep the rest of your page EXACTLY as it was) ... */}
      <section id="experience" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16">
          <SlideIn delay={0.2}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-blue-400" /> Experience
            </h3>
            <div className="space-y-12">
              {experience?.map((exp) => (
                <div key={exp.id} className="relative pl-8 border-l-2 border-gray-800 hover:border-blue-500 transition-colors duration-300">
                  <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-blue-500"></div>
                  <h4 className="text-xl font-bold text-gray-100">{exp.role}</h4>
                  <p className="text-blue-400 font-medium mb-1">{exp.company}</p>
                  <span className="text-xs text-gray-500 uppercase tracking-wider block mb-3">{exp.duration}</span>
                  <p className="text-gray-400 text-sm leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </SlideIn>

          <SlideIn delay={0.4} className="md:mt-0 mt-12">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <GraduationCap className="text-purple-400" /> Education
            </h3>
            <div className="space-y-12">
              {education?.map((edu) => (
                <div key={edu.id} className="relative pl-8 border-l-2 border-gray-800 hover:border-purple-500 transition-colors duration-300">
                  <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-gray-900 border-2 border-purple-500"></div>
                  <h4 className="text-xl font-bold text-gray-100">{edu.institution}</h4>
                  <p className="text-purple-400 font-medium mb-1">{edu.degree}</p>
                  <span className="text-xs text-gray-500 uppercase tracking-wider">{edu.duration}</span>
                </div>
              ))}
            </div>
          </SlideIn>
        </div>
      </section>

      {/* --- PROJECTS --- */}
      <section id="projects" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <FadeIn>
            <h2 className="text-4xl font-bold mb-16 text-center">
              Featured <span className="text-blue-500">Projects</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, i) => (
              <FadeIn key={project.id} delay={i * 0.1}>
                <div className="group relative bg-[#0f0f16] border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2 h-full flex flex-col">
                    
                    {/* Image Section */}
                    <div className="relative w-full h-48 overflow-hidden bg-gray-800">
                        {project.image_url ? (
                            <Image 
                            src={project.image_url} 
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        ) : (
                             <div className="flex items-center justify-center h-full text-gray-600">No Image</div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-[#0f0f16] to-transparent opacity-60"></div>
                    </div>

                    {/* Content Section */}
                    <div className="p-6 flex flex-col grow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                            {project.title}
                            </h3>
                            <a href={project.link} target="_blank" className="text-gray-500 hover:text-white transition transform hover:rotate-45 hover:scale-110">
                            <ExternalLink size={20} />
                            </a>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 grow leading-relaxed">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-auto">
                            {project.technologies?.map((tech: string, index: number) => (
                            <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                                {tech}
                            </span>
                            ))}
                        </div>
                    </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="py-20 border-t border-white/10 bg-[#0a0a0f] relative overflow-hidden">
        <div className="relative z-10 text-center">
            <h2 className="text-3xl text-white font-bold mb-8">Let's Build Something Together</h2>
            
            <div className="flex justify-center gap-8 mb-12">
            <a href={`mailto:${profile?.email}`} className="group p-4 rounded-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:border-blue-500 transition-all duration-300">
                <Mail className="text-gray-300 group-hover:text-white" size={24} />
            </a>
            <a href={profile?.linkedin_link || "#"} className="group p-4 rounded-full bg-white/5 border border-white/10 hover:bg-[#0077b5] hover:border-[#0077b5] transition-all duration-300">
                <Linkedin className="text-gray-300 group-hover:text-white" size={24} />
            </a>
            <a href={profile?.github_link || "#"} className="group p-4 rounded-full bg-white/5 border border-white/10 hover:bg-gray-800 hover:border-gray-600 transition-all duration-300">
                <Github className="text-gray-300 group-hover:text-white" size={24} />
            </a>
            </div>
            
            <p className="text-gray-600 text-sm">© {new Date().getFullYear()} {profile?.full_name}. Built with Next.js & Supabase.</p>
        </div>
      </footer>
    </main>
  );
}