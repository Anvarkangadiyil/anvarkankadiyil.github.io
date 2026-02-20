export interface Skill {
    name: string;
    category: "language" | "framework" | "tool" | "platform";
}

export const skills: Skill[] = [
    { name: "Flutter", category: "framework" },
    { name: "Dart", category: "language" },
    { name: "React", category: "framework" },
    { name: "Next.js", category: "framework" },
    { name: "React Native", category: "framework" },
    { name: "TypeScript", category: "language" },
    { name: "JavaScript", category: "language" },
    { name: "Rust", category: "language" },
    { name: "Python", category: "language" },
    { name: "Node.js", category: "framework" },
    { name: "HTML/CSS", category: "language" },
    { name: "Tailwind CSS", category: "framework" },
    { name: "Three.js", category: "framework" },
    { name: "Firebase", category: "platform" },
    { name: "MongoDB", category: "platform" },
    { name: "PostgreSQL", category: "platform" },
    { name: "Git", category: "tool" },
    { name: "Docker", category: "tool" },
    { name: "GSAP", category: "framework" },
    { name: "Figma", category: "tool" },
    { name: "VS Code", category: "tool" },
    { name: "Linux", category: "platform" },
    { name: "AWS", category: "platform" },
    { name: "GraphQL", category: "framework" },
];
