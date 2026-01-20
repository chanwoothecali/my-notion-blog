# 프로젝트 지침

## 파일 생성 규칙

- 로컬 전용 파일/디렉토리 생성 시 `.gitignore`에 자동 추가
  - 로컬 설정, 캐시, 로그, 임시 파일 등
  - 예: `*.local.*`, `*.log`
- 팀 공유 파일은 git 추적 유지
  - `.claude/commands/`, `.claude/agents/`, `.claude/hooks/`
- 프로젝트 공유 파일은 `.gitignore`에 추가하지 않음
  - 소스 코드, 공용 설정, 문서 등
