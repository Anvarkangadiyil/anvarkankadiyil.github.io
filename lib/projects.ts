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
        slug: "flutter-ecommerce-app",
        title: "E-Commerce Mobile App",
        description:
            "A full-featured cross-platform e-commerce application built with Flutter and Firebase, offering seamless shopping experiences with real-time updates.",
        category: ["mobile", "fullstack"],
        techStack: ["Flutter", "Dart", "Firebase", "Firestore", "Cloud Functions"],
        problem:
            "Small businesses needed an affordable, cross-platform mobile storefront with real-time inventory management.",
        solution:
            "Built a performant Flutter app with Firebase backend, featuring real-time product updates, secure payment processing, and push notifications.",
        results:
            "Cross-platform app running on iOS and Android with 60fps performance. Reduced development cost by 40% compared to native dual-platform development.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil",
        featured: true,
    },
    {
        slug: "rust-cli-toolkit",
        title: "Rust CLI Toolkit",
        description:
            "A collection of high-performance command-line tools built in Rust for file processing, data transformation, and system automation.",
        category: ["opensource"],
        techStack: ["Rust", "Clap", "Serde", "Tokio"],
        problem:
            "Common developer workflows required multiple disparate tools with inconsistent interfaces and poor performance on large datasets.",
        solution:
            "Created a unified CLI toolkit in Rust leveraging zero-cost abstractions and fearless concurrency for blazing-fast file processing.",
        results:
            "10x faster than equivalent Python scripts. Open-sourced with community contributions.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil",
        featured: true,
    },
    {
        slug: "ai-chat-assistant",
        title: "AI Chat Assistant",
        description:
            "An intelligent conversational AI assistant powered by modern LLMs with a beautiful React frontend and Node.js backend.",
        category: ["ai", "fullstack"],
        techStack: ["React", "Node.js", "OpenAI API", "WebSockets", "MongoDB"],
        problem:
            "Organizations needed a customizable AI chat interface that could be tailored to their specific domain knowledge.",
        solution:
            "Developed a full-stack AI chat platform with streaming responses, conversation history, and domain-specific fine-tuning capabilities.",
        results:
            "Handles 1000+ concurrent conversations. Deployed across 3 organizations with custom knowledge bases.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil",
        featured: true,
    },
    {
        slug: "portfolio-website-v2",
        title: "3D Portfolio Website",
        description:
            "This very website — a modern, award-winning portfolio built with Next.js, Three.js, and GSAP featuring immersive 3D experiences.",
        category: ["fullstack", "opensource"],
        techStack: ["Next.js", "Three.js", "GSAP", "Tailwind CSS", "TypeScript"],
        problem:
            "Traditional portfolio websites feel generic and fail to showcase creative technical capabilities.",
        solution:
            "Built an immersive 3D portfolio with interactive WebGL visuals, smooth scroll animations, and premium glassmorphism design.",
        results:
            "Lighthouse score 95+. Featured with Awwwards-level design polish and fully responsive 3D experience.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil/anvarkankadiyil.github.io",
        demo: "https://anvarkankadiyil.github.io",
        featured: true,
    },
    {
        slug: "react-native-fitness",
        title: "Fitness Tracker App",
        description:
            "A React Native fitness tracking application with workout logging, progress visualization, and social features.",
        category: ["mobile"],
        techStack: ["React Native", "TypeScript", "Redux", "Firebase", "Charts"],
        problem:
            "Fitness enthusiasts needed a simple yet powerful way to track workouts and visualize their progress over time.",
        solution:
            "Built a React Native app with intuitive workout logging, interactive charts for progress tracking, and social features for motivation.",
        results:
            "Smooth 60fps animations on both platforms. Interactive data visualizations for workout history.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil",
        featured: false,
    },
    {
        slug: "fullstack-blog-platform",
        title: "Blog Platform",
        description:
            "A modern full-stack blog platform with MDX support, syntax highlighting, and a custom CMS built with Next.js.",
        category: ["fullstack", "opensource"],
        techStack: ["Next.js", "MDX", "Prisma", "PostgreSQL", "Tailwind CSS"],
        problem:
            "Developers needed a self-hosted blog platform that supports rich content with code snippets and interactive components.",
        solution:
            "Created a Next.js-based blog platform with MDX for rich content, Prisma ORM for data management, and a custom admin dashboard.",
        results:
            "Fast static generation with ISR. SEO-optimized with perfect Lighthouse scores for content pages.",
        image: "/images/placeholder.svg",
        github: "https://github.com/Anvarkangadiyil",
        featured: false,
    },
];
