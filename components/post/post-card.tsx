import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/types/post"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="h-full overflow-hidden transition-shadow hover:shadow-lg">
        {post.coverImage && (
          <div className="relative aspect-video w-full overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              unoptimized
            />
          </div>
        )}
        <CardHeader>
          <div className="flex items-center gap-2">
            {post.category && (
              <Badge variant="secondary">{post.category}</Badge>
            )}
            {post.publishedAt && (
              <span className="text-sm text-muted-foreground">
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
          <h3 className="line-clamp-2 text-xl font-semibold">{post.title}</h3>
        </CardHeader>
        {post.description && (
          <CardContent>
            <p className="line-clamp-2 text-muted-foreground">
              {post.description}
            </p>
          </CardContent>
        )}
        {post.tags.length > 0 && (
          <CardFooter className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </CardFooter>
        )}
      </Card>
    </Link>
  )
}
