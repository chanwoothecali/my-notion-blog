import { Metadata } from "next"
import {
  Users,
  CreditCard,
  Activity,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const metadata: Metadata = {
  title: "대시보드",
  description: "대시보드 개요 페이지",
}

// 통계 카드 데이터
const stats = [
  {
    title: "총 방문자",
    value: "12,345",
    change: "+12.5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "활성 사용자",
    value: "1,234",
    change: "+5.2%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "수익",
    value: "₩1,234,567",
    change: "+18.7%",
    trend: "up",
    icon: CreditCard,
  },
  {
    title: "전환율",
    value: "3.2%",
    change: "-2.1%",
    trend: "down",
    icon: TrendingUp,
  },
]

// 최근 활동 데이터
const recentActivities = [
  { user: "홍길동", action: "새 계정 생성", time: "방금 전" },
  { user: "김철수", action: "프로필 업데이트", time: "5분 전" },
  { user: "이영희", action: "결제 완료", time: "10분 전" },
  { user: "박민수", action: "문서 업로드", time: "30분 전" },
  { user: "정수진", action: "비밀번호 변경", time: "1시간 전" },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
        <p className="text-muted-foreground">
          프로젝트 현황을 한눈에 확인하세요.
        </p>
      </div>

      {/* 통계 카드 그리드 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span>지난 달 대비</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 콘텐츠 그리드 */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* 차트 플레이스홀더 */}
        <Card>
          <CardHeader>
            <CardTitle>방문자 추이</CardTitle>
            <CardDescription>최근 30일간의 방문자 현황</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground text-sm">
                차트 영역 (Recharts 등 차트 라이브러리 연동)
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 최근 활동 */}
        <Card>
          <CardHeader>
            <CardTitle>최근 활동</CardTitle>
            <CardDescription>사용자들의 최근 활동 내역</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {activity.user[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{activity.user}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
