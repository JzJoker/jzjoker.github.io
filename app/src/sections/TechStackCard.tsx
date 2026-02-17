import { FadeWrapper } from '@/components/FadeWrapper';
import type { Experience } from '@/data/experiences';

interface TechStackCardProps {
  experience: Experience;
}

export function TechStackCard({ experience }: TechStackCardProps) {
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full overflow-hidden">
      <h3 className="text-xs text-muted-foreground mb-4 tracking-wider">TECH STACK</h3>
      <FadeWrapper contentKey={experience.id}>
        <ul className="space-y-3">
          {experience.technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <li key={tech.name} className="flex items-center gap-3">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">{tech.name}</span>
              </li>
            );
          })}
        </ul>
      </FadeWrapper>
    </div>
  );
}
