#!/usr/bin/env node

/**
 * 위험 명령어 차단 Hook
 *
 * Claude Code의 PreToolUse hook으로 실행되어
 * Bash 명령어 중 위험한 패턴을 감지하고 차단합니다.
 *
 * 종료 코드:
 * - 0: 안전한 명령어, 실행 허용
 * - 2: 위험한 명령어 감지, 실행 차단
 */

const fs = require('fs');

// 위험 명령어 패턴 정의
const DANGEROUS_PATTERNS = [
  // 파일 시스템 관련
  {
    pattern: /rm\s+(-[^\s]*\s+)*-rf\s+[\/~]/,
    description: '루트 또는 홈 디렉토리 삭제 시도',
    example: 'rm -rf /, rm -rf ~'
  },
  {
    pattern: /rm\s+(-[^\s]*\s+)*-rf\s+\*/,
    description: '현재 디렉토리 전체 삭제 시도',
    example: 'rm -rf *'
  },
  {
    pattern: /rm\s+(-[^\s]*\s+)*-rf\s+\.\s*$/,
    description: '현재 디렉토리 삭제 시도',
    example: 'rm -rf .'
  },
  {
    pattern: /chmod\s+777/,
    description: '과도한 권한 부여',
    example: 'chmod 777'
  },
  {
    pattern: />\s*\/[^\s]+/,
    description: '루트 경로 파일 덮어쓰기 시도',
    example: '> /etc/passwd'
  },

  // Git 관련
  {
    pattern: /git\s+push\s+.*(-f|--force)/,
    description: 'Git 강제 푸시',
    example: 'git push --force, git push -f'
  },
  {
    pattern: /git\s+push\s+(-f|--force)/,
    description: 'Git 강제 푸시',
    example: 'git push --force'
  },
  {
    pattern: /git\s+reset\s+--hard/,
    description: 'Git 하드 리셋',
    example: 'git reset --hard'
  },
  {
    pattern: /git\s+clean\s+.*-fdx/,
    description: 'Git 추적되지 않은 파일 전체 삭제',
    example: 'git clean -fdx'
  },

  // 데이터베이스 관련
  {
    pattern: /DROP\s+DATABASE/i,
    description: '데이터베이스 삭제 시도',
    example: 'DROP DATABASE'
  },
  {
    pattern: /DROP\s+TABLE/i,
    description: '테이블 삭제 시도',
    example: 'DROP TABLE'
  },
  {
    pattern: /TRUNCATE\s+/i,
    description: '테이블 데이터 전체 삭제 시도',
    example: 'TRUNCATE TABLE'
  },
  {
    pattern: /DELETE\s+FROM\s+\w+\s*(?:;|$)/i,
    description: 'WHERE 절 없는 DELETE (전체 삭제)',
    example: 'DELETE FROM users;'
  },

  // 시스템 관련
  {
    pattern: /\bshutdown\b/,
    description: '시스템 종료 시도',
    example: 'shutdown'
  },
  {
    pattern: /\breboot\b/,
    description: '시스템 재부팅 시도',
    example: 'reboot'
  },
  {
    pattern: /\bmkfs\b/,
    description: '파일시스템 포맷 시도',
    example: 'mkfs'
  },
  {
    pattern: /:\(\)\s*\{\s*:\s*\|\s*:\s*&\s*\}\s*;?\s*:/,
    description: '포크 폭탄 감지',
    example: ':(){:|:&};:'
  },
  {
    pattern: /\bdd\s+.*of=\/dev\//,
    description: '디스크 직접 쓰기 시도',
    example: 'dd of=/dev/sda'
  }
];

/**
 * 명령어 위험성 검사
 * @param {string} command - 검사할 명령어
 * @returns {{ dangerous: boolean, reason?: string, example?: string }}
 */
function checkDangerous(command) {
  for (const { pattern, description, example } of DANGEROUS_PATTERNS) {
    if (pattern.test(command)) {
      return {
        dangerous: true,
        reason: description,
        example: example
      };
    }
  }
  return { dangerous: false };
}

/**
 * 메인 함수
 */
async function main() {
  // stdin에서 JSON 입력 읽기
  const chunks = [];
  for await (const chunk of process.stdin) {
    chunks.push(chunk);
  }
  const input = Buffer.concat(chunks).toString('utf-8');

  let hookData;
  try {
    hookData = JSON.parse(input);
  } catch (e) {
    console.error('⚠️ Hook 입력 파싱 실패:', e.message);
    process.exit(0); // 파싱 실패 시 명령어 통과
  }

  // tool_input에서 command 추출
  const command = hookData?.tool_input?.command;

  if (!command) {
    // command가 없으면 통과
    process.exit(0);
  }

  // 위험성 검사
  const result = checkDangerous(command);

  if (result.dangerous) {
    // 위험 명령어 감지 - 차단
    console.error('');
    console.error('🚫 ═══════════════════════════════════════════════════════════');
    console.error('   위험 명령어 감지 - 실행이 차단되었습니다!');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('');
    console.error(`📋 명령어: ${command}`);
    console.error(`⚠️  이유: ${result.reason}`);
    console.error(`💡 예시: ${result.example}`);
    console.error('');
    console.error('이 명령어는 시스템에 심각한 영향을 줄 수 있습니다.');
    console.error('정말 실행이 필요하다면 터미널에서 직접 실행하세요.');
    console.error('═══════════════════════════════════════════════════════════════');
    console.error('');

    process.exit(2); // 차단
  }

  // 안전한 명령어 - 통과
  process.exit(0);
}

main().catch(err => {
  console.error('Hook 실행 오류:', err);
  process.exit(0); // 오류 시 명령어 통과 (안전한 기본값)
});
