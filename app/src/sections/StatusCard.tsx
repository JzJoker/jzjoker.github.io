import type { Experience } from '@/data/experiences';

interface StatusCardProps {
  experience: Experience;
}

export function StatusCard({ experience }: StatusCardProps) {
  const isDefault = experience.id === 'default';
  
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col items-center justify-center h-full min-h-[140px]">
      {/* Static content - no animation */}
      <div className="flex flex-col items-center">
        <div className="relative mb-3">
          {/* Always green glow */}
          <div className="w-3 h-3 rounded-full bg-green-500 glow-green" />
        </div>
        <p className="text-xs text-muted-foreground mb-1 tracking-wider">STATUS</p>
        <p className="text-sm font-semibold tracking-wide">
          {isDefault ? 'AVAILABLE' : 'EXPERIENCE'}
        </p>
      </div>
    </div>
  );
}
