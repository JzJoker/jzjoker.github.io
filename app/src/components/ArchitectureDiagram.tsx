interface ArchitectureDiagramProps {
  nodes: { id: string; label: string; items?: string[] }[];
  edges: { from: string; to: string }[];
}

export function ArchitectureDiagram({ nodes }: ArchitectureDiagramProps) {
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
