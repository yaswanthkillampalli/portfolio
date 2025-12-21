// src/components/SkillIcon.tsx
import { 
  Code2, 
  Database, 
  Server, 
  Palette, 
  GitBranch, 
  BrainCircuit, 
  FileCode,
  Terminal,
  Globe,
  Layout 
} from "lucide-react";

// ... (Keep your iconMap exactly as it is) ...
const iconMap: Record<string, any> = {
  'react': Code2,
  'nextjs': Globe,
  'palette': Palette,
  'code-2': Code2,
  'server': Server,
  'file-code': FileCode,
  'brain-circuit': BrainCircuit,
  'database': Database,
  'git-branch': GitBranch,
  'terminal': Terminal,
  'default': Layout 
};

export const SkillIcon = ({ iconName, className }: { iconName: string, className?: string }) => {
  const IconComponent = iconMap[iconName] || iconMap['default'];
  
  const rotationClass = iconName === 'brain-circuit' ? 'rotate-90' : '';

  return <IconComponent className={`${className} ${rotationClass}`} />;
};