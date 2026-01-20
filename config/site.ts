export const siteConfig = {
  name: "Starter Kit",
  description: "Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui 기반 모던 웹 스타터킷",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ogImage: "/og-image.png",
  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
  },
  creator: "Your Name",
} as const

export type SiteConfig = typeof siteConfig
