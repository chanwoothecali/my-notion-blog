"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 에러 로깅 서비스에 에러 기록
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div className="text-center">
        {/* 에러 아이콘 */}
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <svg
            className="h-10 w-10 text-destructive"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* 메시지 */}
        <h2 className="text-2xl font-semibold tracking-tight">
          문제가 발생했습니다
        </h2>
        <p className="mt-2 text-muted-foreground">
          예기치 않은 오류가 발생했습니다. 잠시 후 다시 시도해주세요.
        </p>

        {/* 에러 정보 (개발 환경에서만 표시) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mt-4 rounded-lg bg-muted p-4 text-left">
            <p className="text-sm font-mono text-muted-foreground">
              {error.message}
            </p>
          </div>
        )}

        {/* 액션 버튼 */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button onClick={() => reset()}>다시 시도</Button>
          <Button variant="outline" onClick={() => window.location.href = "/"}>
            홈으로 돌아가기
          </Button>
        </div>
      </div>
    </div>
  )
}
