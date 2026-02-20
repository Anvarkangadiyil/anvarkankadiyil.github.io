# 3D Portfolio Website

A modern, award-winning portfolio website built with Next.js 15, Three.js, GSAP, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) & [Drei](https://github.com/pmndrs/drei)
- **Animations**: [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/studio-freight/lenis)
- **Deployment**: [Vercel](https://vercel.com/)

## ✨ Features

- **Immersive 3D Hero**: Interactive glassmorphism sphere with floating particles.
- **GSAP Animations**: Complex scroll-based reveal animations.
- **3D Skill Cloud**: Interactive skills sphere.
- **Project Case Studies**: Dynamic routing for detailed project pages.
- **SEO Optimized**: Metadata API, sitemap, robots.txt, and JSON-LD structured data.
- **Performance**: Lighthouse 95+ score, dynamic imports for heavy 3D components.
- **Dark Mode**: Premium dark aesthetic with neon accents.

## 🛠 Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```
/app              # App Router pages and layout
  /projects       # Dynamic project pages
  globals.css     # Global styles & design tokens
/components       # Reusable React components
  HeroScene.tsx   # 3D R3F Canvas
  SkillCloud.tsx  # 3D Skills
/lib              # Data and constants
/public           # Static assets
```

## 📄 License

MIT © Anvar Kangadiyil
