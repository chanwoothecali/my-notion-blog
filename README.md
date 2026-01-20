# Notion Blog

Notion을 CMS로 활용한 개인 개발 블로그 프로젝트입니다.

## 프로젝트 소개

Notion의 강력한 편집 기능을 활용하여 콘텐츠를 관리하고, Next.js 15로 빠르고 SEO 친화적인 블로그를 구현합니다.

### 주요 기능

- **Notion 연동**: Notion 데이터베이스와 실시간 동기화
- **글 목록/상세**: 페이지네이션, 코드 하이라이팅, 목차 자동 생성
- **카테고리 필터링**: 카테고리별 글 분류 및 필터링
- **검색 기능**: 제목 및 내용 기반 검색
- **반응형 디자인**: 모바일, 태블릿, 데스크탑 대응

## 기술 스택

| 분류 | 기술 |
|------|------|
| 프레임워크 | Next.js 15, React 19 |
| 언어 | TypeScript |
| 스타일링 | Tailwind CSS |
| UI 컴포넌트 | shadcn/ui |
| CMS | Notion API |
| 배포 | Vercel |

## 시작하기

### 사전 요구사항

- Node.js 18.17 이상
- Notion 계정 및 API 키

### 설치

```bash
# 의존성 설치
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 추가합니다:

```env
NOTION_API_KEY=secret_xxx
NOTION_DATABASE_ID=xxx
```

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

## 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
├── components/          # React 컴포넌트
│   ├── ui/             # shadcn/ui 컴포넌트
│   ├── layout/         # 레이아웃 컴포넌트
│   └── post/           # 포스트 관련 컴포넌트
├── lib/                 # 유틸리티 함수
└── types/               # TypeScript 타입 정의
```

## 문서

- [PRD (Product Requirements Document)](./docs/PRD.md)

## 배포

Vercel을 통해 배포합니다:

```bash
npm run build
```

## 라이선스

MIT License
