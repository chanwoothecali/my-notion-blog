# Development Guidelines

> AI Agent 전용 프로젝트 개발 표준 문서

## 프로젝트 개요

| 항목 | 값 |
|------|-----|
| 프로젝트명 | Notion Blog |
| 목적 | Notion을 CMS로 활용한 개인 개발 블로그 |
| 기술 스택 | Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, shadcn/ui |
| 상태 | Phase 1 진행 중 |

---

## 디렉토리 구조

```
app/
├── (auth)/           # 인증 페이지 (login, register)
├── (dashboard)/      # 대시보드 페이지
├── (marketing)/      # 마케팅/랜딩 페이지
├── posts/            # [예정] 블로그 포스트 페이지
├── categories/       # [예정] 카테고리 페이지
├── layout.tsx        # 루트 레이아웃
├── globals.css       # 전역 스타일
├── error.tsx         # 에러 페이지
└── not-found.tsx     # 404 페이지

components/
├── landing/          # 랜딩 페이지 전용 컴포넌트
├── layout/           # 레이아웃 컴포넌트 (Header, Footer, Sidebar)
├── post/             # [예정] 포스트 관련 컴포넌트
├── providers/        # Context Provider
└── ui/               # shadcn/ui 컴포넌트 (자동 생성)

config/
├── nav.ts            # 네비게이션 설정
└── site.ts           # 사이트 메타데이터 설정

hooks/                # 커스텀 React 훅
lib/                  # 유틸리티 함수, API 클라이언트
types/                # TypeScript 타입 정의
docs/                 # PRD, ROADMAP 문서
public/               # 정적 파일
```

---

## 파일 생성 규칙

### 페이지 생성

| 페이지 유형 | 위치 | 예시 |
|------------|------|------|
| 인증 관련 | `app/(auth)/` | `app/(auth)/login/page.tsx` |
| 대시보드 | `app/(dashboard)/dashboard/` | `app/(dashboard)/dashboard/users/page.tsx` |
| 마케팅/공개 | `app/(marketing)/` | `app/(marketing)/about/page.tsx` |
| 블로그 포스트 | `app/posts/` | `app/posts/[slug]/page.tsx` |
| 카테고리 | `app/categories/` | `app/categories/[category]/page.tsx` |

### 컴포넌트 생성

| 컴포넌트 유형 | 위치 | 파일명 규칙 |
|--------------|------|------------|
| 페이지 전용 | 해당 페이지 폴더 내 | `_components/` 폴더 또는 같은 폴더 |
| 공유 레이아웃 | `components/layout/` | `kebab-case.tsx` |
| 도메인별 공유 | `components/{domain}/` | `kebab-case.tsx` |
| UI 기본 | `components/ui/` | shadcn CLI로만 추가 |

### 올바른 예시

```typescript
// ✅ 올바름: 페이지 전용 컴포넌트
// app/posts/[slug]/_components/post-content.tsx

// ✅ 올바름: 공유 컴포넌트
// components/post/post-card.tsx

// ✅ 올바름: shadcn/ui 컴포넌트 추가
// npx shadcn@latest add button
```

### 잘못된 예시

```typescript
// ❌ 금지: UI 컴포넌트 직접 생성
// components/ui/my-button.tsx

// ❌ 금지: Route Group 없이 페이지 생성
// app/login/page.tsx (반드시 (auth) 그룹 내에)
```

---

## 코드 작성 규칙

### TypeScript

- **모든 파일**: `.tsx` 또는 `.ts` 확장자 필수
- **any 타입**: 사용 금지
- **타입 정의**: `types/` 폴더에 집중 관리
- **Props 타입**: 인라인 또는 별도 interface 정의

```typescript
// ✅ 올바름
interface PostCardProps {
  title: string
  slug: string
  publishedAt: Date
}

export function PostCard({ title, slug, publishedAt }: PostCardProps) {
  // ...
}

// ❌ 금지
export function PostCard(props: any) {
  // ...
}
```

### 경로 별칭

| 별칭 | 실제 경로 |
|-----|----------|
| `@/components` | `components/` |
| `@/lib` | `lib/` |
| `@/hooks` | `hooks/` |
| `@/types` | `types/` |
| `@/config` | `config/` |

```typescript
// ✅ 올바름
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Post } from "@/types"

// ❌ 금지
import { Button } from "../../components/ui/button"
import { cn } from "../../../lib/utils"
```

### 스타일링

- **Tailwind CSS**: 모든 스타일링에 사용
- **cn() 유틸리티**: 조건부 클래스에 필수 사용
- **CSS 변수**: `globals.css`에 정의된 변수 사용
- **인라인 스타일**: 사용 금지

```typescript
// ✅ 올바름
<div className={cn(
  "rounded-lg border bg-card p-4",
  isActive && "border-primary"
)}>

// ❌ 금지
<div style={{ borderRadius: '8px', padding: '16px' }}>
```

### 아이콘

- **lucide-react**: 유일한 아이콘 라이브러리
- 다른 아이콘 라이브러리 추가 금지

```typescript
// ✅ 올바름
import { Home, Settings, User } from "lucide-react"

// ❌ 금지
import { FaHome } from "react-icons/fa"
```

---

## 컴포넌트 규칙

### Server Components vs Client Components

| 상황 | 컴포넌트 유형 |
|-----|-------------|
| 데이터 페칭 | Server Component |
| 정적 UI | Server Component |
| 이벤트 핸들러 필요 | Client Component |
| 브라우저 API 사용 | Client Component |
| useState/useEffect 사용 | Client Component |

```typescript
// ✅ Server Component (기본)
export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug)
  return <PostContent post={post} />
}

// ✅ Client Component (필요시에만)
"use client"

export function LikeButton({ postId }: { postId: string }) {
  const [liked, setLiked] = useState(false)
  // ...
}
```

### shadcn/ui 컴포넌트

- **추가 방법**: `npx shadcn@latest add [component]` 명령어만 사용
- **직접 수정**: `components/ui/` 파일 직접 수정 금지
- **커스터마이징**: 래퍼 컴포넌트 생성하여 확장

```bash
# ✅ 올바름
npx shadcn@latest add dialog
npx shadcn@latest add table

# ❌ 금지: components/ui/button.tsx 직접 편집
```

---

## Notion API 연동 규칙

> Phase 2에서 구현 예정

### 파일 구조

| 파일 | 역할 |
|-----|------|
| `lib/notion.ts` | Notion API 클라이언트 및 함수 |
| `types/post.ts` | 포스트 관련 타입 정의 |
| `types/notion.ts` | Notion 블록 타입 정의 |

### 구현 규칙

- 모든 Notion API 호출은 `lib/notion.ts`에 집중
- 에러 핸들링 필수 (try-catch)
- 환경 변수: `NOTION_API_KEY`, `NOTION_DATABASE_ID`

```typescript
// lib/notion.ts 예상 구조
export async function getDatabase(): Promise<Post[]>
export async function getPage(pageId: string): Promise<PostDetail>
export async function getPageContent(pageId: string): Promise<NotionBlock[]>
```

### ISR 설정

| 페이지 | revalidate 값 |
|-------|--------------|
| 포스트 목록 | 600 (10분) |
| 포스트 상세 | 300 (5분) |
| 카테고리 목록 | 600 (10분) |

```typescript
// app/posts/page.tsx
export const revalidate = 600

// app/posts/[slug]/page.tsx
export const revalidate = 300
```

---

## 파일 동시 수정 규칙

### 타입 변경 시

| 수정 파일 | 함께 확인할 파일 |
|----------|----------------|
| `types/index.ts` | 해당 타입 사용하는 모든 컴포넌트 |
| `types/post.ts` | `lib/notion.ts`, `components/post/*` |

### 설정 변경 시

| 수정 파일 | 함께 확인할 파일 |
|----------|----------------|
| `config/site.ts` | `app/layout.tsx` (메타데이터) |
| `config/nav.ts` | `components/layout/header.tsx`, `footer.tsx`, `app-sidebar.tsx` |

### 스타일 변경 시

| 수정 파일 | 함께 확인할 파일 |
|----------|----------------|
| `app/globals.css` | 테마 변수 사용하는 모든 컴포넌트 |
| CSS 변수 추가 | `:root`와 `.dark` 모두 정의 필수 |

---

## 네비게이션 수정 규칙

### marketingNav 수정 시

```typescript
// config/nav.ts 수정
export const marketingNav: NavItem[] = [
  { title: "홈", href: "/" },
  { title: "블로그", href: "/posts" },  // 추가
]
```

**확인 필요 파일**: `components/layout/header.tsx`, `components/layout/mobile-nav.tsx`

### dashboardNav 수정 시

**확인 필요 파일**: `components/layout/app-sidebar.tsx`

### footerNav 수정 시

**확인 필요 파일**: `components/layout/footer.tsx`

---

## 금지 사항

### 절대 금지

| 금지 항목 | 이유 |
|----------|-----|
| `components/ui/` 파일 직접 수정 | shadcn/ui 업데이트 시 충돌 |
| `any` 타입 사용 | 타입 안정성 저하 |
| 인라인 스타일 | Tailwind CSS 일관성 |
| `console.log` (프로덕션) | 성능 및 보안 |
| 상대 경로 import | 경로 별칭 사용 필수 |

### 지양 사항

| 지양 항목 | 대안 |
|----------|-----|
| `"use client"` 과다 사용 | Server Component 우선 |
| 새 라이브러리 추가 | 기존 라이브러리로 해결 시도 |
| 복잡한 상태 관리 | Server Component + 최소 클라이언트 상태 |

---

## AI 결정 기준

### 새 컴포넌트 생성 시

```
1. UI 기본 컴포넌트인가?
   → Yes: shadcn/ui에 있는지 확인 → 없으면 추가
   → No: 2번으로

2. 여러 페이지에서 사용되는가?
   → Yes: components/{domain}/ 에 생성
   → No: 해당 페이지 폴더 내 생성

3. 상태/이벤트가 필요한가?
   → Yes: "use client" 추가
   → No: Server Component 유지
```

### 새 페이지 생성 시

```
1. 인증이 필요한 페이지인가?
   → Yes: app/(dashboard)/ 에 생성
   → No: 2번으로

2. 인증 관련 페이지인가? (login, register 등)
   → Yes: app/(auth)/ 에 생성
   → No: app/(marketing)/ 또는 도메인별 폴더에 생성
```

### 타입 정의 시

```
1. 단일 파일에서만 사용?
   → Yes: 파일 내 정의
   → No: types/ 폴더에 정의

2. Notion API 응답 관련?
   → Yes: types/notion.ts 또는 types/post.ts
   → No: types/index.ts 또는 도메인별 파일
```

---

## 참고 문서

| 문서 | 경로 | 설명 |
|-----|------|-----|
| PRD | `docs/PRD.md` | 요구사항 정의서 |
| ROADMAP | `docs/ROADMAP.md` | 개발 로드맵 |
| CLAUDE.md | `CLAUDE.md` | 프로젝트 지침 |
