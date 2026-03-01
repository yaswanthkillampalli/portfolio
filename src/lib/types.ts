// Portfolio data types
export interface Profile {
  id: number;
  full_name: string;
  role: string;
  bio: string;
  email: string;
  linkedin_link?: string;
  github_link?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  link: string;
  image_url: string;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  duration: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  icon: string;
}
