export const servicePackages = [
  {
    id: 1,
    name: 'MVP 런칭',
    subtitle: '아이디어 → 제품화',
    description: '1주일 안에 시장 검증 가능한 MVP 출시',
    features: [
      'AI 바이브코딩으로 초고속 개발',
      '비개발자도 이해하기 쉬운 설명',
      'ANYON 시스템으로 스스로 운영 가능',
      '바이브코딩 원포인트 레슨받고 본인 서비스 구현하기 가능',
      'MVP 구현단계는 맡기고 유지보수만 ANYON 활용 가능',
      '스타트업 맞춤 AI 세팅법 제공 (평생 업데이트)',
    ],
    popular: false,
    cta: '1주일 안에 MVP 출시하기',
    roi: '시장 검증 속도 10배',
  },
  {
    id: 2,
    name: '업무 자동화',
    subtitle: '반복 업무 제로화',
    description: '월 300만원 인건비 절감하는 AI 자동화',
    features: [
      'N8N + AI로 반복 업무 70% 자동화',
      '기존 툴 그대로 연동 (노션/슬랙/시트)',
      'CRM·메일·SNS 자동 관리',
      '업무별 AI 자동화 세팅법 제공 (평생 업데이트)',
      '24시간 내 빠른 응답 보장',
    ],
    popular: true,
    cta: '무료 자동화 진단 받기',
    roi: '월 300만원 절감',
  },
  {
    id: 3,
    name: '맞춤형 솔루션',
    subtitle: '전사 AI 전환',
    description: 'PoC 3일 → 전사 확산까지 올인원',
    features: [
      '3일 안에 실제 작동하는 PoC',
      'LLM·RAG·Agent 전문가 투입',
      '부서별 맞춤 AI 자동화 플랫폼',
      '전사 AI 인프라 세팅법 제공 (평생 업데이트)',
      '1년 무상 유지보수 + SLA 보장',
    ],
    popular: false,
    cta: '맞춤 PoC 3일 안에 받기',
    roi: '전사 생산성 2배',
  },
];

export const trustMetrics = [
  {
    id: 1,
    value: 1,
    suffix: '주일',
    label: '평균 구현 속도',
    sublabel: 'Delivery Speed',
  },
  {
    id: 2,
    value: 95,
    suffix: '%',
    label: '고객 재계약률',
    sublabel: 'Re-contract Rate',
    highlight: true,
  },
  {
    id: 3,
    value: 70,
    suffix: '%',
    label: '업무 자동화율',
    sublabel: 'Automation Rate',
  },
  {
    id: 4,
    value: 16,
    suffix: '시간',
    label: 'AI 연구 시간/일',
    sublabel: 'Daily AI Research',
  },
];

export const whyAnyon = [
  {
    id: 1,
    icon: 'Wrench',
    title: 'AI 자동화 전문',
    description: '하루 16시간 AI만 연구하는 미친 팀. Claude Code, N8N, RAG, Agent 실전 투입 검증 완료.',
    image: '/maintain-tab-icon.png',
  },
  {
    id: 2,
    icon: 'Shield',
    title: '비개발자 친화',
    description: '팀의 50%가 비개발자 출신. 개발자 언어 통역 필요 없이 정확히 이해하고 만듭니다.',
    image: '/prd-icon-Photoroom.png',
  },
  {
    id: 3,
    icon: 'MessageSquare',
    title: '평생 자료 무료',
    description: '전문팀의 AI 자동화 세팅법 무제한 제공. 매주 업데이트되는 실전 노하우로 지속 성장하게 해드립니다.',
    image: '/mvp-icon-Photoroom.png',
  },
];
