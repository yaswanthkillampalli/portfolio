export interface PersonalInfo {
  name: string;
  role: string;
  pronouns: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
}

export interface Project {
  id: string;
  title: string;
  tech_stack: string[];
  duration: string;
  live_demo?: string;
  github?: string;
  description: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  cgpa?: string;
  gpa?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
}

export interface PortfolioData {
  personal_info: PersonalInfo;
  professional_summary: string;
  technical_skills: {
    languages: string[];
    web_technologies: string[];
    databases_cloud: string[];
    tools_methodologies: string[];
  };
  work_experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}
