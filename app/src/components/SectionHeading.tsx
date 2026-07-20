export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400">
      {children}
    </h2>
  );
}
