import { Link } from 'react-router-dom';
import { experiences } from '@/data/experiences';
import type { Project } from '@/data/experiences';
import { ProjectCard } from '@/sections/ProjectCard';
import { Navbar } from '@/sections/Navbar';

function getAllProjects(): { project: Project; experienceId: string }[] {
  return Object.values(experiences).flatMap((exp) =>
    exp.projects.map((project) => ({ project, experienceId: exp.id }))
  );
}

export function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />
          <Link
            to="/"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider self-start"
          >
            &lt; HOME
          </Link>
          <h2 className="text-sm text-muted-foreground tracking-wider">ALL PROJECTS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
            {allProjects.map(({ project, experienceId }, i) => (
              <ProjectCard
                key={`${experienceId}-${i}`}
                project={project}
                projectIndex={i}
                totalProjects={allProjects.length}
                experienceId={experienceId}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
