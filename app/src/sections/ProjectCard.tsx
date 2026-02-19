import { FadeWrapper } from '@/components/FadeWrapper';
import type { Project } from '@/data/experiences';

interface ProjectCardProps {
  project: Project;
  projectIndex: number;
  totalProjects: number;
  experienceId: string;
}

export function ProjectCard({ project, projectIndex, totalProjects, experienceId }: ProjectCardProps) {
  const projectLabel = totalProjects > 1 ? `PROJECT #${projectIndex + 1}` : 'PROJECT';
  const contentKey = `${experienceId}-${projectIndex}`;

  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full cursor-pointer">
      {/* Static header - no animation */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground tracking-wider">
          {projectLabel}
        </span>
        <span className="text-xs text-muted-foreground">{project.subtitle}</span>
      </div>

      {/* Animated content */}
      <FadeWrapper contentKey={contentKey}>
        <h3 className="text-lg font-bold mb-2">{project.title}</h3>

        <p className="text-xs text-muted-foreground mb-4">{project.description}</p>

        {/* Project Preview Area */}
        <div className="flex-1 bg-[#0B0B0B] rounded-lg min-h-[80px] flex items-center justify-center overflow-hidden">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            project.previewText && (
              <span className="text-xs text-muted-foreground">{project.previewText}</span>
            )
          )}
        </div>
      </FadeWrapper>
    </div>
  );
}
