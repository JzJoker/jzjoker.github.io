import { FadeWrapper } from '@/components/FadeWrapper';
import type { Experience } from '@/data/experiences';

interface ProjectCardProps {
  experience: Experience;
  isSecondProject?: boolean;
}

export function ProjectCard({ experience, isSecondProject = false }: ProjectCardProps) {
  // For default state, show the second project (HOMELAB)
  if (experience.id === 'default' && isSecondProject) {
    return (
      <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full">
        {/* Static header - no animation */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground tracking-wider">
            PROJECT #2
          </span>
          <span className="text-xs text-muted-foreground">2025</span>
        </div>

        {/* Animated content */}
        <FadeWrapper contentKey={`${experience.id}-2`}>
          <h3 className="text-lg font-bold mb-2">HOMELAB</h3>

          <p className="text-xs text-muted-foreground mb-4">
            SELF-HOSTED SANDBOX ENVIRONMENT • UBUNTU SERVER | DOCKER
          </p>

          <div className="flex-1 bg-secondary/50 rounded-lg min-h-[80px]" />
        </FadeWrapper>
      </div>
    );
  }

  // For default state first project or experience projects
  const isDefault = experience.id === 'default';
  
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      {/* Static header - no animation */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground tracking-wider">
          {isDefault ? 'PROJECT #1' : 'PROJECT'}
        </span>
        <span className="text-xs text-muted-foreground">{experience.project.subtitle}</span>
      </div>

      {/* Animated content */}
      <FadeWrapper contentKey={experience.id}>
        <h3 className="text-lg font-bold mb-2">{experience.project.title}</h3>

        <p className="text-xs text-muted-foreground mb-4">{experience.project.description}</p>

        {/* Project Preview Area */}
        <div className="flex-1 bg-secondary/50 rounded-lg min-h-[80px] flex items-center justify-center">
          {experience.project.previewText && (
            <span className="text-xs text-muted-foreground">{experience.project.previewText}</span>
          )}
        </div>
      </FadeWrapper>
    </div>
  );
}
