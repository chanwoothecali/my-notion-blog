import Link from "next/link"
import { siteConfig } from "@/config/site"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* 로고 */}
      <Link
        href="/"
        className="absolute left-8 top-8 flex items-center text-lg font-bold"
      >
        {siteConfig.name}
      </Link>

      {/* 메인 콘텐츠 */}
      <div className="w-full max-w-[400px]">{children}</div>

      {/* 푸터 */}
      <p className="mt-8 text-center text-sm text-muted-foreground">
        계속 진행하면{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary">
          이용약관
        </Link>
        과{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
          개인정보처리방침
        </Link>
        에 동의하는 것으로 간주됩니다.
      </p>
    </div>
  )
}
