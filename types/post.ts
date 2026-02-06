import type {
  PageObjectResponse,
  BlockObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints"

// 포스트 기본 정보
export interface Post {
  id: string
  slug: string
  title: string
  description: string
  category: string | null
  tags: string[]
  publishedAt: string | null
  status: string
  coverImage: string | null
}

// 포스트 상세 정보 (본문 포함)
export interface PostDetail extends Post {
  blocks: BlockObjectResponse[]
}

// Notion 페이지에서 포스트 정보 추출
export function parsePost(page: PageObjectResponse): Post {
  const properties = page.properties

  // Title 속성 추출 (속성 이름에 관계없이 title 타입 찾기)
  let title = "제목 없음"
  for (const [, prop] of Object.entries(properties)) {
    if (prop.type === "title" && prop.title.length > 0) {
      title = prop.title.map((t) => t.plain_text).join("")
      break
    }
  }

  // Slug: 페이지 ID 사용 (안정적인 URL)
  const slug = page.id.replace(/-/g, "")

  // Category 속성 추출 (Category, 카테고리 등)
  let category: string | null = null
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "select" && (key === "Category" || key === "카테고리")) {
      category = prop.select?.name ?? null
      break
    }
  }

  // Tags 속성 추출 (Tags, 태그 등)
  let tags: string[] = []
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "multi_select" && (key === "Tags" || key === "태그")) {
      tags = prop.multi_select.map((tag) => tag.name)
      break
    }
  }

  // 날짜 속성 추출 (첫 번째 date 타입)
  let publishedAt: string | null = null
  for (const [, prop] of Object.entries(properties)) {
    if (prop.type === "date" && prop.date?.start) {
      publishedAt = prop.date.start
      break
    }
  }

  // Status 추출
  let status = "Draft"
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "select" && (key === "Status" || key === "상태")) {
      status = prop.select?.name ?? "Draft"
      break
    }
  }

  // 커버 이미지 추출
  let coverImage: string | null = null
  if (page.cover) {
    if (page.cover.type === "external") {
      coverImage = page.cover.external.url
    } else if (page.cover.type === "file") {
      coverImage = page.cover.file.url
    }
  }

  // Description 추출 (첫 번째 rich_text 타입, title 제외)
  let description = ""
  for (const [key, prop] of Object.entries(properties)) {
    if (prop.type === "rich_text" && prop.rich_text.length > 0) {
      description = prop.rich_text.map((t) => t.plain_text).join("")
      break
    }
  }

  return {
    id: page.id,
    slug,
    title,
    description,
    category,
    tags,
    publishedAt,
    status,
    coverImage,
  }
}

// Rich Text를 plain text로 변환
export function richTextToPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((text) => text.plain_text).join("")
}
