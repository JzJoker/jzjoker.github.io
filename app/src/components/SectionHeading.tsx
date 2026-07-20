export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl md:text-3xl font-medium tracking-tight leading-[1.15] pb-3 border-b border-neutral-200 dark:border-neutral-800">
      {children}
    </h2>
  );
}
