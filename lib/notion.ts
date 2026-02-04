import { Client, isFullDatabase, isFullPageOrDataSource } from "@notionhq/client"

// Notion API 클라이언트 초기화
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
})

const databaseId = process.env.NOTION_DATABASE_ID

/**
 * Notion API 연결 테스트
 * 데이터베이스 정보를 조회하여 연결 상태를 확인합니다.
 */
export async function testConnection() {
  try {
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    })
    if (!isFullDatabase(response)) {
      return { success: false, error: "데이터베이스 정보를 가져올 수 없습니다." }
    }
    return { success: true, title: response.title }
  } catch (error) {
    console.error("Notion 연결 실패:", error)
    return { success: false, error }
  }
}

/**
 * 데이터베이스에서 Published 상태의 포스트 목록을 조회합니다.
 */
export async function getDatabase() {
  try {
    const response = await notion.dataSources.query({
      data_source_id: databaseId,
      filter: {
        property: "Status",
        select: {
          equals: "Published",
        },
      },
      sorts: [
        {
          property: "Published",
          direction: "descending",
        },
      ],
    })
    return response.results.filter(isFullPageOrDataSource)
  } catch (error) {
    console.error("데이터베이스 조회 실패:", error)
    return []
  }
}
