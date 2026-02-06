import { getDatabase } from "@/lib/notion"
import { PostCard } from "@/components/post/post-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "블로그",
  description: "개발 관련 글 모음",
}

// 10분마다 재생성
export const revalidate = 600

export default async function PostsPage() {
  const posts = await getDatabase()

  if (posts.length === 0) {
    return (
      <div className="container py-12">
        <h1 className="mb-8 text-3xl font-bold">블로그</h1>
        <p className="text-muted-foreground">
          아직 게시된 글이 없습니다.
        </p>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="mb-8 text-3xl font-bold">블로그</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
