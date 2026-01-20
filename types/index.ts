import type { LucideIcon } from "lucide-react"

// 네비게이션 아이템 타입
export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  disabled?: boolean
  external?: boolean
  children?: NavItem[]
}

// 사이트 설정 타입
export interface SiteConfig {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    github: string
    twitter: string
  }
  creator: string
}
