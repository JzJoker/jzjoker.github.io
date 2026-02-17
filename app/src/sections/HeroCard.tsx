import { Search } from 'lucide-react';
import { FadeWrapper } from '@/components/FadeWrapper';
import type { Experience } from '@/data/experiences';

interface HeroCardProps {
  experience: Experience;
}

export function HeroCard({ experience }: HeroCardProps) {
  const isDefault = experience.id === 'default';
  
  return (
    <div className="bento-card col-span-2 row-span-2 bg-card border border-border rounded-xl p-6 flex flex-col h-full overflow-hidden">
      {/* Search Bar */}
      <div className="flex items-center gap-3 pb-4 border-b border-border/50 mb-8">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="SEARCH PROJECT OR COMMANDS..."
          className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          readOnly
        />
        <kbd className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border">
          ESC
        </kbd>
      </div>

      {/* Static Name - no animation */}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        JUSTIN ZHAO
      </h1>

      {/* Profile Content with Fade Animation */}
      <FadeWrapper contentKey={experience.id}>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm text-muted-foreground leading-relaxed max-w-md mb-8">
            {experience.description}
          </p>

          {/* Show Current Focus for default, Time Period for experiences */}
          <div className="mt-auto">
            {isDefault ? (
              <>
                <p className="text-xs text-muted-foreground mb-2">CURRENT FOCUS</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium">{experience.currentFocus}</span>
                </div>
              </>
            ) : (
              <>
                <p className="text-xs text-muted-foreground mb-2">TIME PERIOD</p>
                <div className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: experience.accentColor }}
                  />
                  <span className="text-sm font-medium">{experience.timePeriod}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </FadeWrapper>
    </div>
  );
}
