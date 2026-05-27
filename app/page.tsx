import { About } from "../components/About";
import { Contact } from "../components/Contact";
import { CustomCursor } from "../components/CustomCursor";
import { EducationCertifications } from "../components/EducationCertifications";
import { Experience } from "../components/Experience";
import { Footer } from "../components/Footer";
import { Hero } from "../components/Hero";
import { Navbar } from "../components/Navbar";
import { Projects } from "../components/Projects";
import { GreetingToast } from "../components/GreetingToast";
import { Skills } from "../components/Skills";
import portfolioDataRaw from "../data/data.json";

import { PortfolioData } from "../lib/types";

const portfolioData = portfolioDataRaw as PortfolioData;

export default function App() {
  return (
    <div className="relative min-h-screen selection:bg-indigo-500/30">
      <GreetingToast />
      <CustomCursor />
      <Navbar personalInfo={portfolioData.personal_info} />

      <main className="mx-auto px-6 lg:px-12">
        <Hero
          personalInfo={portfolioData.personal_info}
          summary={portfolioData.professional_summary}
        />
        <About
          info={portfolioData.personal_info}
          summary={portfolioData.professional_summary}
        />
        <Skills skills={portfolioData.technical_skills} />
        <Projects projects={portfolioData.projects} />
        <Experience experience={portfolioData.work_experience} />
        <EducationCertifications
          education={portfolioData.education}
          certifications={portfolioData.certifications}
        />
        <Contact info={portfolioData.personal_info} />
      </main>

      <Footer info={portfolioData.personal_info} />
    </div>
  );
}
