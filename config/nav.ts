import {
  Home,
  LayoutDashboard,
  Settings,
  Users,
  FileText,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  disabled?: boolean
  external?: boolean
}

// 마케팅 페이지 네비게이션 (Header)
export const marketingNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "기능", href: "/#features" },
  { title: "가격", href: "/pricing" },
]

// 대시보드 사이드바 네비게이션
export const dashboardNav: NavItem[] = [
  { title: "대시보드", href: "/dashboard", icon: LayoutDashboard },
  { title: "사용자", href: "/dashboard/users", icon: Users },
  { title: "문서", href: "/dashboard/documents", icon: FileText },
  { title: "설정", href: "/dashboard/settings", icon: Settings },
]

// 푸터 링크
export const footerNav = {
  product: [
    { title: "기능", href: "/#features" },
    { title: "가격", href: "/pricing" },
    { title: "문서", href: "/docs" },
  ],
  company: [
    { title: "소개", href: "/about" },
    { title: "블로그", href: "/blog" },
    { title: "채용", href: "/careers" },
  ],
  legal: [
    { title: "개인정보처리방침", href: "/privacy" },
    { title: "이용약관", href: "/terms" },
  ],
}
