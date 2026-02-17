import { ArrowRight } from 'lucide-react';
import { FadeWrapper } from '@/components/FadeWrapper';
import type { Experience } from '@/data/experiences';

interface MetricsCardProps {
  experience: Experience;
}

export function MetricsCard({ experience }: MetricsCardProps) {
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 flex flex-col h-full">
      <h3 className="text-xs text-muted-foreground mb-4 tracking-wider">METRICS</h3>
      <FadeWrapper contentKey={experience.id}>
        <div className="flex gap-3 h-full">
          {/* Metric Cards */}
          {experience.metrics.map((metric, index) => (
            <div 
              key={index}
              className="flex-1 bg-secondary/80 rounded-lg p-4 flex flex-col justify-center"
            >
              <span className="text-2xl font-bold mb-2">{metric.value}</span>
              <span className="text-xs text-muted-foreground whitespace-pre-line">
                {metric.label}
              </span>
            </div>
          ))}
          
          {/* Read More Button */}
          <button 
            className="flex-1 rounded-lg p-4 flex flex-col items-center justify-center gap-2 text-white font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: experience.accentColor }}
          >
            <span className="text-sm">READ MORE</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </FadeWrapper>
    </div>
  );
}
