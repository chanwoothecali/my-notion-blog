import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getPostBySlug, getAllPostSlugs } from "@/lib/notion"
import { NotionRenderer } from "@/components/post/notion-renderer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import type { Metadata } from "next"

interface PostPageProps {
  params: Promise<{ slug: string }>
}

// 5분마다 재생성
export const revalidate = 300

// 정적 경로 생성
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// 동적 메타데이터 생성
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "포스트를 찾을 수 없습니다",
    }
  }

  return {
    title: post.title,
    description: post.description || `${post.title} - 블로그 포스트`,
    openGraph: {
      title: post.title,
      description: post.description || `${post.title} - 블로그 포스트`,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container max-w-4xl py-12">
      {/* 뒤로 가기 버튼 */}
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/posts">
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로
        </Link>
      </Button>

      {/* 포스트 헤더 */}
      <header className="mb-8">
        {/* 카테고리 및 날짜 */}
        <div className="mb-4 flex items-center gap-3">
          {post.category && (
            <Badge variant="secondary">{post.category}</Badge>
          )}
          {post.publishedAt && (
            <time className="text-sm text-muted-foreground">
              {formatDate(post.publishedAt)}
            </time>
          )}
        </div>

        {/* 제목 */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        {/* 설명 */}
        {post.description && (
          <p className="text-xl text-muted-foreground">
            {post.description}
          </p>
        )}

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </header>

      {/* 커버 이미지 */}
      {post.coverImage && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
      )}

      {/* 본문 */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <NotionRenderer blocks={post.blocks} />
      </div>
    </article>
  )
}
