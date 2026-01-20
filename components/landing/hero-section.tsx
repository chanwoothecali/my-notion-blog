import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* 배경 그라데이션 */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />

      <div className="container">
        <div className="mx-auto max-w-3xl text-center">
          {/* 배지 */}
          <Badge variant="secondary" className="mb-6">
            <Sparkles className="mr-1 h-3 w-3" />
            Next.js 16 + React 19 기반
          </Badge>

          {/* 타이틀 */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            빠르게 시작하는
            <span className="block text-primary">모던 웹 개발</span>
          </h1>

          {/* 설명 */}
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            Next.js, TypeScript, Tailwind CSS, shadcn/ui가 미리 설정된 스타터킷으로
            <br className="hidden sm:inline" />
            복잡한 초기 설정 없이 바로 개발을 시작하세요.
          </p>

          {/* CTA 버튼 */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/register">
                무료로 시작하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/dashboard">
                대시보드 보기
              </Link>
            </Button>
          </div>

          {/* 기술 스택 표시 */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                N
              </div>
              <span className="text-sm font-medium">Next.js 16</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                R
              </div>
              <span className="text-sm font-medium">React 19</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                TS
              </div>
              <span className="text-sm font-medium">TypeScript</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-muted flex items-center justify-center text-xs font-bold">
                TW
              </div>
              <span className="text-sm font-medium">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
