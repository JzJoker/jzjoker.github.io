import { HomelabNetworkDiagram } from '@/components/HomelabNetworkDiagram';
import type { ProjectDetailData } from '@/data/projectDetails';

interface HomelabContentProps {
  data: ProjectDetailData;
}

export function HomelabContent(_props: HomelabContentProps) {
  return (
    <section>
      <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
        HOMELAB — NETWORK DIAGRAM
      </h2>
      <div className="bento-card bg-card border border-border rounded-xl p-5 overflow-x-auto">
        <HomelabNetworkDiagram />
      </div>
    </section>
  );
}
