import { siteConfig } from "@/lib/constants";
import SocialIcon from "./SocialIcon";

const SOCIAL = [
  { icon: "github", label: "GitHub", href: siteConfig.links.github },
  { icon: "linkedin", label: "LinkedIn", href: siteConfig.links.linkedin },
  { icon: "medium", label: "Medium", href: siteConfig.links.medium },
  { icon: "instagram", label: "Instagram", href: siteConfig.links.instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)]">
      <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-6 px-4 py-10 sm:flex-row sm:items-center sm:px-6">
        <div>
          <p className="font-mono text-sm">
            <span className="text-[var(--color-accent)]">~/</span>
            {siteConfig.name.split(" ")[0].toLowerCase()}
            <span className="text-[var(--color-subtle)]">.dev</span>
          </p>
          <p className="mt-1 text-sm text-[var(--color-subtle)]">
            © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js.
          </p>
        </div>

        <div className="flex items-center gap-5">
          {SOCIAL.map(({ icon, label, href }) => (
            <a
              key={icon}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-[var(--color-subtle)] transition-colors hover:text-[var(--color-text)]"
            >
              <SocialIcon name={icon} size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
