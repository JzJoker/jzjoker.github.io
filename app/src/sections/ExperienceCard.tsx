import { Briefcase, Monitor, Code } from 'lucide-react';
import type { Experience } from '@/data/experiences';

interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  icon: typeof Briefcase;
  accentColor: string;
}

const experienceItems: ExperienceItem[] = [
  { id: 'vanguard', company: 'VANGUARD', period: '2024-25', icon: Briefcase, accentColor: '#dc2626' },
  { id: 'ritits', company: 'RIT ITS', period: '2024', icon: Monitor, accentColor: '#f97316' },
  { id: 'rithr', company: 'RIT HR', period: '2022-2023', icon: Code, accentColor: '#f97316' },
];

interface ExperienceCardProps {
  selectedExperience: Experience;
  onSelectExperience: (id: string) => void;
}

export function ExperienceCard({ selectedExperience, onSelectExperience }: ExperienceCardProps) {
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs text-muted-foreground tracking-wider">EXPERIENCE</h3>
        <button 
          onClick={() => onSelectExperience('default')}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          CLEAR
        </button>
      </div>
      <ul className="space-y-2">
        {experienceItems.map((exp) => {
          const Icon = exp.icon;
          const isSelected = selectedExperience.id === exp.id;
          
          return (
            <li 
              key={exp.id}
              onClick={() => onSelectExperience(exp.id)}
              className={`
                flex items-center justify-between p-2 rounded-lg cursor-pointer
                transition-all duration-200
                ${isSelected ? 'text-white' : 'hover:bg-secondary/50'}
              `}
              style={{
                backgroundColor: isSelected ? exp.accentColor : 'transparent',
              }}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                <span className="text-sm font-medium">{exp.company}</span>
              </div>
              <span className={`text-xs ${isSelected ? 'text-white/80' : 'text-muted-foreground'}`}>
                {exp.period}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
