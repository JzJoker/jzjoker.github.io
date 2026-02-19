import { useState } from 'react';
import { HeroCard } from './sections/HeroCard';
import { TechStackCard } from './sections/TechStackCard';
import { StatusCard } from './sections/StatusCard';
import { ExperienceCard } from './sections/ExperienceCard';
import { ProjectCard } from './sections/ProjectCard';
import { MetricsCard } from './sections/MetricsCard';
import { ContactFooter } from './sections/ContactFooter';
import { experiences, defaultExperience } from './data/experiences';

function App() {
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>(defaultExperience.id);
  
  const selectedExperience = experiences[selectedExperienceId] || defaultExperience;
  const isDefault = selectedExperienceId === 'default';

  const handleSelectExperience = (id: string) => {
    setSelectedExperienceId(id);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Bento Grid: padded content area */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
            {/* Hero Card - spans 2 columns and 2 rows */}
            <HeroCard experience={selectedExperience} />

            {/* Tech Stack Card */}
            <TechStackCard experience={selectedExperience} />

            {/* Status & Experience Column */}
            <div className="flex flex-col gap-4">
              <StatusCard experience={selectedExperience} />
              <ExperienceCard 
                selectedExperience={selectedExperience}
                onSelectExperience={handleSelectExperience}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Project + Footer: same padding and max-width as content above */}
      <div className="w-full px-4 sm:px-6 lg:px-8 box-border flex flex-col gap-4">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
            {selectedExperience.projects.map((project, i) => (
              <ProjectCard
                key={i}
                project={project}
                projectIndex={i}
                totalProjects={selectedExperience.projects.length}
                experienceId={selectedExperience.id}
              />
            ))}
            {!isDefault && <MetricsCard experience={selectedExperience} />}
          </div>
          <ContactFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
