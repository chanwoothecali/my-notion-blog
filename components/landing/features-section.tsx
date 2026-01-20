import { Zap, Shield, Palette, Layers, Smartphone, Code2 } from "lucide-react"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "빠른 시작",
    description:
      "복잡한 설정 없이 바로 개발을 시작하세요. 모든 도구가 미리 구성되어 있습니다.",
  },
  {
    icon: Palette,
    title: "다크 모드 지원",
    description:
      "next-themes를 활용한 완벽한 다크 모드. 시스템 설정 자동 감지를 지원합니다.",
  },
  {
    icon: Layers,
    title: "컴포넌트 라이브러리",
    description:
      "shadcn/ui 기반의 재사용 가능한 컴포넌트로 일관된 UI를 빠르게 구축하세요.",
  },
  {
    icon: Smartphone,
    title: "반응형 디자인",
    description:
      "모바일 우선 접근 방식으로 모든 디바이스에서 완벽하게 동작합니다.",
  },
  {
    icon: Shield,
    title: "타입 안정성",
    description:
      "TypeScript로 작성되어 개발 시 오류를 미리 잡고 안정적인 코드를 작성할 수 있습니다.",
  },
  {
    icon: Code2,
    title: "최신 기술 스택",
    description:
      "Next.js 16, React 19, Tailwind CSS v4 등 최신 기술로 구성되어 있습니다.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 md:py-32 bg-muted/50">
      <div className="container">
        {/* 섹션 헤더 */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            개발에 필요한 모든 것
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            프로덕션 레벨의 웹 애플리케이션을 빠르게 구축하기 위한
            모든 도구와 설정이 포함되어 있습니다.
          </p>
        </div>

        {/* 기능 카드 그리드 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-none bg-background">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
