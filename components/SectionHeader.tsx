interface SectionHeaderProps {
  index: string;
  label: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}

export default function SectionHeader({
  index,
  label,
  title,
  subtitle,
}: SectionHeaderProps) {
  return (
    <div className="reveal mb-12 md:mb-14">
      <p className="eyebrow">
        {"// "}
        {index} — {label}
      </p>
      <h2 className="section-heading">{title}</h2>
      {subtitle && <p className="section-subheading">{subtitle}</p>}
    </div>
  );
}
