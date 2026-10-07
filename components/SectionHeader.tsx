interface SectionHeaderProps {
  index: string;
  file: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export default function SectionHeader({
  index,
  file,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="reveal mb-12 md:mb-14">
      <p className="file-path">
        <span>
          <span className="text-[var(--color-accent)]">[{index}]</span> ~/anvar/
          <span className="text-[var(--color-muted)]">{file}</span>
        </span>
      </p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-subheading">{subtitle}</p>}
    </div>
  );
}
