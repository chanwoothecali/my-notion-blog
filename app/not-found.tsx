import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 404 숫자 */}
        <h1 className="text-9xl font-bold text-muted-foreground/20">404</h1>

        {/* 메시지 */}
        <h2 className="mt-4 text-2xl font-semibold tracking-tight">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-muted-foreground">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>

        {/* 액션 버튼 */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild>
            <Link href="/">홈으로 돌아가기</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard">대시보드로 이동</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
