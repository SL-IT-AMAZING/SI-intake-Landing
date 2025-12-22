export type TargetType = 'startup' | 'smb' | 'enterprise' | 'agency' | 'individual';

export interface TargetContent {
  id: TargetType;
  label: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string;
  painPoints: string[];
  solutions: string[];
  cta: string;
}

export const targetContents: TargetContent[] = [
  {
    id: 'startup',
    label: '스타트업',
    icon: '/mvp-icon-Photoroom.png',
    heroTitle: '아이디어만 있다면,\n ANYON이 1주일 안에 MVP를 만들어드립니다',
    heroSubtitle: '개발자 구하느라 3개월 낭비하지 마세요. AI 자동화로 빠르게 시장 검증하고 투자 유치하세요.',
    painPoints: [
      '개발자 채용에만 3개월, 개발에 또 6개월... 경쟁사는 이미 시장 선점',
      '외주 맡겼더니 소스코드 받고나서 아무도 이해 못함',
      '시드 투자 받으려면 MVP 필요한데 개발비 5천만원은 너무 부담',
    ],
    solutions: [
      'AI 바이브코딩으로 평균 1주일 만에 MVP 출시',
      '비개발자도 이해하는 ANYON 시스템으로 독립적 운영 가능',
      '투자 IR 자료까지 자동 생성 (성장 데이터 대시보드 포함)',
    ],
    cta: '1주일 안에 MVP 출시하고 투자받기',
  },
  {
    id: 'smb',
    label: '중소기업',
    icon: '/prd-icon-Photoroom.png',
    heroTitle: '매출은 늘었는데 직원은 더 바쁘다?\nAI 자동화로 월 300만원 인건비 절감',
    heroSubtitle: '반복 업무는 AI에게, 팀은 핵심 업무에 집중. 실제 고객사 평균 업무시간 70% 단축 입증.',
    painPoints: [
      '매출 2배 늘었는데 직원 업무량도 2배... 추가 채용은 부담',
      '엑셀 복붙, 메일 발송, 데이터 정리에 하루 3시간 낭비',
      'CRM·ERP 도입했는데 너무 복잡해서 결국 엑셀로 회귀',
    ],
    solutions: [
      'N8N + AI로 반복 업무 100% 자동화 (메일/SMS/데이터 처리)',
      '사용하는 툴 그대로 연결 (노션, 슬랙, 구글시트 등)',
      '월 인건비 300만원 절감 효과 (3개월이면 투자 회수)',
    ],
    cta: '우리 회사 자동화 가능 업무 무료 진단받기',
  },
  {
    id: 'enterprise',
    label: '대기업',
    icon: '/architecture-icon.png',
    heroTitle: 'AI 도입 고민만 1년?\n전문팀이 3일 안에 PoC 만들어드립니다',
    heroSubtitle: '보고서는 그만, 실제 작동하는 AI 시스템으로 임원 설득하세요. LLM·RAG·Agent 전문가 팀 투입.',
    painPoints: [
      'AI 도입 검토 보고서만 3개월... 실행은 언제?',
      'IT팀 리소스 부족해서 외주 맡기면 커뮤니케이션 지옥',
      '파일럿 프로젝트 성공해도 확산이 안 됨 (각 팀마다 다른 요구사항)',
    ],
    solutions: [
      '3일 안에 실제 작동하는 PoC로 빠른 의사결정',
      '전사 AI 자동화 플랫폼 구축 (부서별 커스터마이징 가능)',
      '임직원 AI 활용 교육까지 포함 (평생 전문팀 AI 실무 활용 자료 제공)',
    ],
    cta: '우리 회사 맞춤 AI PoC 3일 안에 받기',
  },
  {
    id: 'agency',
    label: '에이전시',
    icon: '/design-icon.png',
    heroTitle: '클라이언트 10개 관리에 지쳤다?\nAI가 광고·SNS·리포트 자동 관리',
    heroSubtitle: '매일 밤 11시까지 리포트 작성? 이제 AI가 1분 만에 끝냅니다. 실제 에이전시 업무시간 80% 단축.',
    painPoints: [
      '클라이언트 10개 리포트 만들다가 새벽 2시',
      'SNS 포스팅·광고 소재 제작에 하루 종일 소진',
      '좋은 클라이언트 더 받고 싶은데 인력이 부족',
    ],
    solutions: [
      'AI 자동 리포트 생성 (광고·SNS·GA4 데이터 1분 통합)',
      'SNS 콘텐츠 자동 생성 및 예약 발행 (브랜드 톤앤매너 학습)',
      '클라이언트 3배 늘려도 같은 인력으로 운영 가능',
    ],
    cta: '우리 에이전시 업무 자동화 시뮬레이션 받기',
  },
  {
    id: 'individual',
    label: '개인/직장인',
    icon: '/erd-icon.png',
    heroTitle: '매일 반복되는 업무에 지쳤다?\nAI가 3시간 업무를 3분으로 단축',
    heroSubtitle: '데이터 정리, 보고서 작성, 메일 발송, 자료 수집 등 반복 업무를 AI가 자동화. 퇴근 시간 2시간 당겨드립니다.',
    painPoints: [
      '매일 똑같은 데이터 복붙·정리 작업에 3시간 소비',
      '보고서·발표 자료 만들려고 여러 소스 뒤지며 수작업',
      '야근은 싫은데 단순 반복 업무가 계속 쌓임',
    ],
    solutions: [
      '반복 업무 자동화로 하루 2~3시간 절약',
      '데이터 정리, 보고서, 메일 자동 생성 (클릭 한 번)',
      '개인 맞춤 AI 자동화 세팅법 제공 (평생 업데이트)',
    ],
    cta: '내 업무 자동화 가능한지 확인하기',
  },
];

// 공통 Pain Points (모든 타겟에 적용)
export const commonPainPoints = [
  '개발 끝나고 인수인계 받았는데 아무도 유지보수 못함',
  '외주 개발사 연락 안 되고 진행상황 블랙박스',
  '추가 개발 견적 보니 처음 개발비보다 비쌈',
];

// AI 차별점 강조
export const aiDifferentiators = [
  {
    title: '하루 16시간 AI만 연구하는 미친 팀',
    description: 'Claude Code, N8N, RAG, Agent 등 최신 AI 기술 실전 투입. 전문팀이 매일 쓰면서 검증하고 있습니다.',
    metric: '16시간/일',
  },
  {
    title: '비개발자 출신이 팀의 절반',
    description: '개발자 언어 소통 필요 없음. 비개발자가 어려워하는 걸 정확히 이해하고 만듭니다.',
    metric: '50%',
  },
  {
    title: '맞춤 AI 자동화 세팅법 제공',
    description: '전문팀이 귀사에 맞춘 AI 자동화 세팅 방법을 제공. 지속 업데이트되는 실전 노하우.',
    metric: '∞',
  },
  {
    title: 'ANYON 시스템으로 외주 지옥 탈출',
    description: '비개발자도 바이브코딩 가능한 플랫폼 제공. 더 이상 개발사에 의존하지 마세요.',
    metric: '100% 독립',
  },
];

// 실제 성과 데이터
export const provenResults = [
  {
    title: '평균 구현 속도',
    value: '1주일',
    description: '협의 미팅 1~3회, 구현 평균 7일',
  },
  {
    title: '업무 자동화율',
    value: '70%',
    description: '반복 업무 평균 70% 자동화 달성',
  },
  {
    title: 'ROI 회수 기간',
    value: '3개월',
    description: '월 인건비 절감 효과로 빠른 회수',
  },
  {
    title: '고객 재계약률',
    value: '95%',
    description: 'AI 교육·유지보수 만족도 최상',
  },
];
