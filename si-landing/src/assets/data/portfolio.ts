export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  image: string;
  featured?: boolean;
}

export const portfolioCategories = [
  { id: 'all', label: '전체', value: 'all' },
  { id: 'web', label: '웹 애플리케이션', value: 'web' },
  { id: 'mobile', label: '모바일 앱', value: 'mobile' },
  { id: 'backoffice', label: '백오피스 시스템', value: 'backoffice' },
  { id: 'ai', label: 'AI/데이터 솔루션', value: 'ai' },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    title: '전사 통합 관리 시스템',
    category: 'backoffice',
    description: '대기업의 인사, 회계, 재고를 통합 관리하는 ERP 시스템. 레거시 시스템을 모던 웹 기술로 전환하여 유지보수성 향상.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
    image: '/architecture-icon.png',
    featured: true,
  },
  {
    id: 2,
    title: 'AI 기반 고객 분석 플랫폼',
    category: 'ai',
    description: '머신러닝을 활용한 고객 행동 패턴 분석 및 예측 시스템. 실시간 데이터 파이프라인 구축.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'Redis'],
    image: '/erd-icon.png',
    featured: true,
  },
  {
    id: 3,
    title: '스마트 예약 관리 앱',
    category: 'mobile',
    description: '병원/클리닉을 위한 예약 관리 및 환자 관리 모바일 애플리케이션. iOS/Android 크로스 플랫폼 개발.',
    technologies: ['React Native', 'TypeScript', 'Firebase'],
    image: '/design-icon.png',
  },
  {
    id: 4,
    title: 'B2B 전자상거래 플랫폼',
    category: 'web',
    description: '기업간 대량 거래를 위한 전자상거래 플랫폼. 복잡한 견적/발주/결제 프로세스 자동화.',
    technologies: ['Next.js', 'NestJS', 'MySQL', 'AWS'],
    image: '/uiux-icon.png',
    featured: true,
  },
  {
    id: 5,
    title: '실시간 모니터링 대시보드',
    category: 'web',
    description: '제조 공정 실시간 모니터링 및 이상 감지 시스템. 대용량 센서 데이터 처리 및 시각화.',
    technologies: ['Vue.js', 'InfluxDB', 'Grafana', 'MQTT'],
    image: '/trd-icon.png',
  },
  {
    id: 6,
    title: '내부 업무 자동화 시스템',
    category: 'backoffice',
    description: '반복적인 업무 프로세스를 자동화하는 RPA 시스템. 문서 처리 시간 70% 단축.',
    technologies: ['Python', 'Selenium', 'Django', 'Celery'],
    image: '/mvp-icon-Photoroom.png',
  },
];

export const serviceProcess = [
  {
    id: 1,
    title: '요구사항 분석',
    subtitle: 'Requirements Analysis',
    description: '비즈니스 목표와 기술적 요구사항을 명확히 파악하고 프로젝트 범위를 정의합니다.',
    duration: '1-2주',
    icon: '/prd-icon-Photoroom.png',
  },
  {
    id: 2,
    title: '설계 및 계획',
    subtitle: 'Design & Planning',
    description: '확장 가능한 아키텍처를 설계하고 상세한 개발 일정을 수립합니다.',
    duration: '2-3주',
    icon: '/architecture-icon.png',
  },
  {
    id: 3,
    title: '개발 및 테스트',
    subtitle: 'Development & Testing',
    description: '애자일 방식으로 개발하며 지속적인 테스트와 코드 리뷰를 진행합니다.',
    duration: '8-12주',
    icon: '/design-icon.png',
  },
  {
    id: 4,
    title: '배포 및 인수인계',
    subtitle: 'Deployment & Handover',
    description: '안전한 배포 프로세스와 함께 상세한 문서화 및 교육을 제공합니다.',
    duration: '1-2주',
    icon: '/uiux-icon.png',
  },
  {
    id: 5,
    title: '유지보수 및 지원',
    subtitle: 'Maintenance & Support',
    description: '지속적인 모니터링과 빠른 대응으로 안정적인 서비스 운영을 보장합니다.',
    duration: '장기',
    icon: '/maintain-tab-icon.png',
    highlight: true,
  },
];
