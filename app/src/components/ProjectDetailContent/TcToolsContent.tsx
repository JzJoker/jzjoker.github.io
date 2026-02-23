import type { ProjectDetailData } from '@/data/projectDetails';

interface TcToolsContentProps {
  data: ProjectDetailData;
}

export function TcToolsContent({ data: _data }: TcToolsContentProps) {
  return (
    <section className="border-t border-border pt-6">
      <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
        SCOPE
      </h2>
      <p className="text-sm text-muted-foreground">
        Automation covered post-image tasks such as installing standard software, applying group
        policies, configuring backup targets, and validating the environment. The TypeScript CLI
        orchestrated PowerShell scripts and reported success or failure for each step so technicians
        could quickly confirm a machine was ready for use.
      </p>
    </section>
  );
}
