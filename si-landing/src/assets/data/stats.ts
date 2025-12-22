export const trustMetrics = [
  {
    id: 1,
    value: 87,
    suffix: '+',
    label: '프로젝트 완료',
    description: 'Projects Completed',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    value: 42,
    suffix: '%',
    label: '재계약률',
    description: 'Re-contract Rate',
    color: 'from-green-500 to-emerald-500',
    highlight: true,
  },
  {
    id: 3,
    value: 3.8,
    suffix: '년',
    label: '평균 유지보수 기간',
    description: 'Avg. Maintenance Period',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 4,
    value: 98,
    suffix: '%',
    label: '고객 만족도',
    description: 'Customer Satisfaction',
    color: 'from-orange-500 to-red-500',
  },
];

export const coreStrengths = [
  {
    id: 1,
    icon: 'wrench',
    title: '쉬운 유지보수',
    subtitle: 'Easy Maintenance',
    description: '클린 코드, 명확한 문서화, 표준화된 아키텍처로 누구나 이해하고 수정할 수 있는 코드를 작성합니다.',
    metrics: [
      { label: '유지보수 시간', value: '50% 단축' },
      { label: '코드 품질', value: 'A+ 등급' },
    ],
    image: '/maintain-tab-icon.png',
  },
  {
    id: 2,
    icon: 'refresh-cw',
    title: '지속 가능한 개발',
    subtitle: 'Sustainable Development',
    description: '확장 가능한 설계와 모듈화된 구조로 기술 부채를 최소화하고 장기적인 성장을 지원합니다.',
    metrics: [
      { label: '안정적 운영', value: '5년+ 사례' },
      { label: '기술 부채', value: '최소화' },
    ],
    image: '/mvp-icon-Photoroom.png',
  },
  {
    id: 3,
    icon: 'users',
    title: '투명한 협업',
    subtitle: 'Transparent Collaboration',
    description: '실시간 진행 상황 공유와 명확한 커뮤니케이션으로 프로젝트의 모든 단계를 함께합니다.',
    metrics: [
      { label: '분쟁 건수', value: '0건 유지' },
      { label: '응답 시간', value: '24시간 이내' },
    ],
    image: '/prd-icon-Photoroom.png',
  },
];
