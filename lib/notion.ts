import { Client, isFullPage, isFullBlock } from "@notionhq/client"
import type {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { parsePost, type Post, type PostDetail } from "@/types/post"

// Notion API 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID!

/**
 * Notion API 연결 테스트
 */
export async function testConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    })
    return { success: true, title: response.title }
  } catch (error) {
    console.error("Notion 연결 실패:", error)
    return { success: false, error }
  }
}

/**
 * 데이터베이스에서 Published 상태의 포스트 목록을 조회합니다.
 */
export async function getDatabase(): Promise<Post[]> {
  try {
    // 필터/정렬 없이 모든 페이지 조회 (속성명은 데이터베이스에 맞게 수정 필요)
    const response = await notion.databases.query({
      database_id: databaseId,
    })
    const pages = response.results.filter(isFullPage) as PageObjectResponse[]
    return pages.map(parsePost)
  } catch (error) {
    console.error("데이터베이스 조회 실패:", error)
    return []
  }
}

/**
 * slug로 단일 포스트를 조회합니다.
 */
export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  try {
    const posts = await getDatabase()
    const post = posts.find((p) => p.slug === slug)

    if (!post) {
      return null
    }

    const blocks = await getPageBlocks(post.id)

    return {
      ...post,
      blocks,
    }
  } catch (error) {
    console.error("포스트 조회 실패:", error)
    return null
  }
}

/**
 * 페이지 ID로 블록(본문 콘텐츠)을 조회합니다.
 */
export async function getPageBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []
  let cursor: string | undefined = undefined

  try {
    while (true) {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor,
        page_size: 100,
      })

      const fullBlocks = response.results.filter(isFullBlock) as BlockObjectResponse[]
      blocks.push(...fullBlocks)

      if (!response.has_more) {
        break
      }
      cursor = response.next_cursor ?? undefined
    }

    // 하위 블록이 있는 경우 재귀적으로 조회
    for (const block of blocks) {
      if (block.has_children) {
        const children = await getPageBlocks(block.id)
        // @ts-expect-error - 하위 블록 추가
        block.children = children
      }
    }

    return blocks
  } catch (error) {
    console.error("블록 조회 실패:", error)
    return []
  }
}

/**
 * 모든 포스트의 slug 목록을 반환합니다. (정적 생성용)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getDatabase()
  return posts.map((post) => post.slug)
}
