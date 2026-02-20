import { MetadataRoute } from "next";
import { siteConfig, navLinks } from "@/lib/constants";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = navLinks
        .filter((link) => link.href.startsWith("/"))
        .map((link) => ({
            url: `${siteConfig.url}${link.href}`,
            lastModified: new Date(),
            changeFrequency: "monthly" as const,
            priority: 0.8,
        }));

    const projectRoutes = projects.map((project) => ({
        url: `${siteConfig.url}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
    }));

    return [
        {
            url: siteConfig.url,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 1,
        },
        ...routes,
        ...projectRoutes,
    ];
}
