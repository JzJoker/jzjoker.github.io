import { useState } from 'react';
import { HeroCard } from './sections/HeroCard';
import { TechStackCard } from './sections/TechStackCard';
import { StatusCard } from './sections/StatusCard';
import { ExperienceCard } from './sections/ExperienceCard';
import { ProjectCard } from './sections/ProjectCard';
import { MetricsCard } from './sections/MetricsCard';
import { Navbar } from './sections/Navbar';
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
      {/* Single padded container: consistent outer padding and gap between sections at all breakpoints */}
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />
          {/* Bento Grid */}
          <div id="experience" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-min">
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

          {/* Projects + Footer: gap above matches project grid gap-4 */}
          <div className="w-full flex flex-col gap-4">
            <div id="works" className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-full min-w-0">
              {selectedExperience.projects.slice(0, 2).map((project, i) => (
                <ProjectCard
                  key={i}
                  project={project}
                  projectIndex={i}
                  totalProjects={2}
                  experienceId={selectedExperience.id}
                />
              ))}
              {!isDefault && <MetricsCard experience={selectedExperience} />}
            </div>
            <div id="info">
              <ContactFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
