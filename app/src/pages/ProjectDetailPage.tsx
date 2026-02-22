import { useParams, useLocation, Link } from 'react-router-dom';
import { projectDetails } from '@/data/projectDetails';
import { experiences } from '@/data/experiences';
import { ProjectPageLayout } from '@/components/ProjectPageLayout';
import { Navbar } from '@/sections/Navbar';

const validProjectSlugs = new Set(
  Object.values(experiences).flatMap((e) =>
    e.projects.map((p) => p.slug).filter((s): s is string => Boolean(s))
  )
);
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { HomelabNetworkDiagram } from '@/components/HomelabNetworkDiagram';

function UnderConstructionPlaceholder({
  slug,
  backHref = '/projects',
}: {
  slug: string;
  backHref?: string;
}) {
  const title = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
  const backLabel = backHref === '/' ? 'HOME' : 'PROJECTS';
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-4 w-full box-border">
        <div className="max-w-6xl mx-auto w-full flex flex-col gap-4">
          <Navbar />
          <Link
            to={backHref}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider self-start"
          >
            &lt; {backLabel}
          </Link>
          <div className="bento-card bg-card border border-border rounded-xl p-12 flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-sm text-muted-foreground tracking-wider uppercase">
              Under construction
            </p>
            <h1 className="text-xl font-bold uppercase text-foreground">{title}</h1>
            <p className="text-sm text-muted-foreground max-w-md">
              This project page is being built. Check back later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArchitectureDiagram({
  nodes,
}: {
  nodes: { id: string; label: string; items?: string[] }[];
  edges: { from: string; to: string }[];
}) {
  return (
    <div className="bento-card bg-card border border-border rounded-xl p-5 overflow-x-auto">
      <div className="flex flex-wrap items-stretch gap-2 justify-center min-w-[600px]">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-2">
            <div className="bg-background border border-border rounded-lg px-4 py-3 min-w-[140px] text-center">
              <div className="text-xs font-medium text-foreground">{node.label}</div>
              {node.items?.length ? (
                <div className="mt-2 space-y-0.5">
                  {node.items.map((item) => (
                    <div key={item} className="text-xs text-muted-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
            {i < nodes.length - 1 && (
              <span className="text-muted-foreground flex-shrink-0" aria-hidden>
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const from = location.state?.from as string | undefined;
  const backHref = from === '/' ? '/' : '/projects';
  const data = slug ? projectDetails[slug] : undefined;

  if (!data) {
    if (slug && validProjectSlugs.has(slug)) {
      return <UnderConstructionPlaceholder slug={slug} backHref={backHref} />;
    }
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center gap-4 p-8">
        <p className="text-muted-foreground text-sm">Project not found.</p>
        <Link
          to="/projects"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors tracking-wider"
        >
          &lt; BACK TO PROJECTS
        </Link>
      </div>
    );
  }

  const { header, introParagraphs, techStack, architecture, conclusionParagraphs } = data;

  return (
    <ProjectPageLayout
      backHref={backHref}
      title={header.title}
      subtitle={header.subtitle}
      role={header.role}
      duration={header.duration}
      readTime={header.readTime}
      techStackSummary={header.techStackSummary}
      heroImageUrl={header.heroImageUrl}
      icon={header.icon}
    >
      <div className="flex flex-col gap-6">
        {/* Intro */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {introParagraphs.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              {p}
            </p>
          ))}
        </div>

        {techStack && techStack.length > 0 && (
          <section>
            <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
              Tech Stack Index
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
              <div className="bento-card bg-card border border-border w-full">
                <Table className="[&_th]:border-r [&_th]:border-border [&_th:last-child]:border-r-0 [&_td]:border-r [&_td]:border-border [&_td:last-child]:border-r-0">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-muted-foreground">Layer</TableHead>
                      <TableHead className="text-muted-foreground">Technology</TableHead>
                      <TableHead className="text-muted-foreground">Purpose</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {techStack.map((row, i) => (
                      <TableRow key={i}>
                        <TableCell className="text-foreground">{row.layer}</TableCell>
                        <TableCell className="text-foreground">{row.technology}</TableCell>
                        <TableCell className="text-foreground whitespace-normal">
                          {row.purpose}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div className="text-sm text-muted-foreground space-y-3">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
                </p>
              </div>
            </div>
          </section>
        )}

        {architecture && (
          <section>
            <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
              SYSTEM ARCHITECTURE
            </h2>
            <ArchitectureDiagram nodes={architecture.nodes} edges={architecture.edges} />
          </section>
        )}

        {slug === 'homelab' && (
          <section>
            <h2 className="text-sm font-medium text-foreground tracking-wider text-center mb-4">
              HOMELAB — NETWORK DIAGRAM
            </h2>
            <div className="bento-card bg-card border border-border rounded-xl p-5 overflow-x-auto">
              <HomelabNetworkDiagram />
            </div>
          </section>
        )}

        {/* Conclusion */}
        <div className="flex flex-col gap-3">
          {conclusionParagraphs.map((p, i) => (
            <p key={i} className="text-sm text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
      </div>
    </ProjectPageLayout>
  );
}
