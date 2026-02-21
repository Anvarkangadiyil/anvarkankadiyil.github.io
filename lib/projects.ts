export type ProjectCategory = "all" | "fullstack" | "mobile" | "ai" | "opensource";

export interface Project {
    slug: string;
    title: string;
    description: string;
    category: ProjectCategory[];
    techStack: string[];
    problem: string;
    solution: string;
    results: string;
    image: string;
    github?: string;
    demo?: string;
    featured: boolean;
}

export const projects: Project[] = [
    {
        slug: "axiom-ai-code-editor",
        title: "Axiom — AI Code Editor",
        description:
            "An AI-powered code editor inspired by Cursor and Antigravity, built to enhance developer productivity with real-time AI assistance.",
        category: ["ai", "fullstack"],
        techStack: [
            "Next.js",
            "TypeScript",
            "Convex",
            "AI SDK",
            "Monaco Editor",
            "Tailwind CSS"
        ],
        problem:
            "Developers switch between multiple tools for coding and AI assistance, breaking workflow efficiency.",
        solution:
            "Built an AI-native code editor integrating real-time code generation, inline suggestions, and conversational debugging directly inside the editor.",
        results:
            "Unified coding + AI workflow, reducing context switching and improving development speed.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil/axiom",
        demo: undefined,
        featured: true,
    },

    {
        slug: "file-explorer-rust",
        title: "Tubo File Explorer",
        description:
            "A high-performance file explorer built with Rust and Tauri, optimized for faster file search and navigation than native explorers.",
        category: ["opensource"],
        techStack: ["Rust", "Tauri", "TypeScript", "Node.js"],
        problem:
            "Default OS file explorers struggle with performance and fast indexing for large file systems.",
        solution:
            "Developed a Rust-powered desktop file explorer with efficient search indexing and lightweight UI.",
        results:
            "Significantly improved search speed and performance compared to traditional explorers.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil/file-explorer-rust",
        featured: false,
    },

    {
        slug: "2048-terminal-game",
        title: "2048 Terminal Game",
        description:
            "A terminal-based clone of the popular 2048 puzzle game implemented in Rust.",
        category: ["opensource"],
        techStack: ["Rust"],
        problem:
            "Recreating classic games in system-level languages is useful for mastering memory safety and performance.",
        solution:
            "Implemented full game mechanics including tile merging, movement logic, and score tracking in a CLI environment.",
        results:
            "Fully playable terminal game showcasing Rust systems programming skills.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil/2048-game",
        featured: false,
    },

    {
        slug: "ideafy-startup-platform",
        title: "Ideafy — Startup Idea Platform",
        description:
            "A platform where founders can share, validate, and explore startup ideas publicly.",
        category: ["fullstack"],
        techStack: [
            "Next.js",
            "TypeScript",
            "Sanity CMS",
            "Tailwind CSS",
            "Vercel"
        ],
        problem:
            "Early-stage founders lack a simple platform to showcase and validate startup ideas.",
        solution:
            "Built a full-stack idea sharing platform with CMS integration and public idea listings.",
        results:
            "Live production deployment enabling founders to pitch and discover startup concepts.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil/ideafy",
        demo: "https://ideafy-nine.vercel.app/",
        featured: true,
    },
];