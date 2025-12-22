# ANYON 랜딩페이지 카피라이팅 개선 계획

## 목표
브랜드블로그 대행사 매뉴얼의 검증된 카피라이팅 기법을 적용하여 Hero 섹션 후킹, CTA 최적화, 포트폴리오 섹션을 개선한다.

## 매뉴얼 핵심 기법 요약

### 1. 13단계 상세페이지 구조 (3P 방식)
1. **후킹 (Hooking)** - 정신적 충격을 줄 수 있는 핵심 이슈
2. **위협 (Threat)** - 손실 회피 심리 자극
3. **변화 포트폴리오** - Before & After 사례
4. **문제 (Problem)** - 인지하지 못하는 문제 끄집어내기
5. **해결 (Solve)** - 반박 불가능한 논리로 해결책 제시
6. **양질 포트폴리오** - 정성스러운 후기 3~4개
7. **가치 입증 (Value)** - 전문가 스펙과 스토리텔링
8. **혜택 (Benefit)** - 왜 나에게 사야 하는지
9. **뭉탱이 포트폴리오** - 10개 이상 짧은 후기
10. **제안 (Offer)** - 호명 효과 ("어, 난데?")
11. **정보 (Information)** - 모든 정보 세세하게
12. **한정 (Limit)** - 시간/수량/가격 한정 2가지 이상
13. **행동 유도 (Action)** - 자신감 300% 감성 카피

### 2. 핵심 카피라이팅 원칙
- **거절이 편안해질 때까지 시도** - 강력하고 직설적인 표현
- **300% 자신감 확언체** - "회심의 일격" 카피
- **구체적 숫자와 명분** - 시간, 금액, 성과 수치화
- **호명 효과** - "어, 난데?" 감정 유발
- **손실 회피 + 희소성** - 한정성 강조

---

## 구현 계획

### Phase 1: Hero 섹션 카피라이팅 강화 (우선순위 1)

**목표**: 정신적 충격과 위협 요소를 추가하여 첫 인상을 극대화

**권장 조합** (감성 + 위협 균형):

**메인 헤드라인**:
```
"새벽 2시까지 반복 업무하던 우리 팀,
이제 AI가 10분 안에 끝냅니다"
```

**서브헤드라인**:
```
개발자 채용 3개월 + 연봉 5천만원 + 퇴사 리스크...
이 모든 게 1주일이면 끝납니다

지금 시작하면 경쟁사보다 90일 앞서갑니다
```

**CTA 버튼**:
```
새벽 야근에서 탈출하기 (1주일이면 됩니다)

※ 5분 투자로 월 300만원 절감. 선착순 5팀만 무료 진단
```

**수정 파일**:
- `si-landing-v2/src/components/Hero.tsx` (Line 66-96)

---

### Phase 2: CTA 확언체 전환 (우선순위 2)

**목표**: 모든 CTA를 수동적 표현에서 능동적 확언체로 전환

**핵심 전략**:
- "받기" → "시작하기", "달성하기", "탈출하기"
- 감정 조합: [긴박감] + [구체적 성과] + [행동 동사]

**주요 CTA 변경**:

1. **Hero CTA**: "지금 바로 월 300만원 절감 시작하기"
2. **스타트업 타겟**: "경쟁사보다 10배 빠르게 시장 선점하기"
3. **중소기업 타겟**: "월 300만원, 오늘부터 절감 시작하기"
4. **대기업 타겟**: "72시간 후 임원 보고에서 박수받기"
5. **MVP 패키지**: "다음 주 투자자 앞에 서기"
6. **자동화 패키지**: "이번 달부터 300만원 절감하기"
7. **ContactForm**: "지금 바로 변화 시작하기"

**수정 파일**:
- `si-landing-v2/src/components/Hero.tsx` (Line 90)
- `si-landing-v2/src/components/ContactForm.tsx` (Line 199)
- `si-landing-v2/src/assets/data/targetContent.ts` (Line 31, 49, 67, 85, 103)
- `si-landing-v2/src/assets/data/servicePackages.ts` (Line 16, 32, 48)
- `si-landing-v2/src/components/AnyonService.tsx` (Line 126)

---

### Phase 3: 포트폴리오 Before & After 전환 (우선순위 3)

**목표**: 정적 프로젝트 나열을 동적 변화 스토리로 전환

**구현 방식**: 토글 탭 기반 Before/After 비교

**데이터 구조 확장**:
```typescript
interface PortfolioProject {
  id: number;
  title: string;
  category: string;

  before: {
    title: string;
    description: string;
    painPoints: string[];
  };

  after: {
    title: string;
    description: string;
    benefits: string[];
  };

  metrics: Array<{
    label: string;
    before: string;
    after: string;
    improvement: string;
    highlight?: boolean;
  }>;

  technologies: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}
```

**6개 프로젝트 스토리 예시**:
1. **ERP 시스템**: "부서별 엑셀 혼란" → "통합 실시간 관리" (처리시간 5시간→10분, 95% 단축)
2. **AI 고객분석**: "직감 기반 의사결정" → "데이터 기반 예측" (전환율 3%→12%, 4배 향상)
3. **예약관리앱**: "전화 예약 대기" → "자동 예약+알림" (노쇼율 30%→5%, 83% 감소)
4. **B2B 커머스**: "이메일 견적 주고받기" → "실시간 주문" (거래시간 3일→30분, 98% 단축)
5. **모니터링**: "사후 대응 손실" → "실시간 감지+알림" (장애대응 2시간→5분, 96% 단축)
6. **RPA 자동화**: "수작업 8시간" → "AI 자동 10분" (작업시간 96% 단축, 오류 97% 감소)

**UI 구현**:
- 토글 탭으로 Before/After 전환
- AnimatedNumber로 성과 지표 애니메이션
- Framer Motion으로 부드러운 전환 효과
- 2열 그리드 레이아웃 (기존 3열에서 변경)

**수정 파일**:
- `si-landing-v2/src/assets/data/portfolio.ts` (데이터 모델 전면 재구성)
- `si-landing-v2/src/components/Portfolio.tsx` (컴포넌트 전면 재작성)
- `si-landing-v2/src/components/ui/metric-card.tsx` (신규 생성)

---

## 구현 우선순위 및 일정

### 즉시 실행 (Phase 1)
1. Hero 섹션 카피 변경 (30분)
   - 헤드라인, 서브헤드라인, CTA 문구 교체
   - ShinyText, TextReveal 애니메이션 타이밍 조정

### 1주 이내 (Phase 2)
2. CTA 확언체 전환 (1-2시간)
   - 모든 섹션 CTA 문구 일괄 변경
   - 한정성 문구, 마이크로카피 개선
   - ContactForm 성공 메시지 개선

### 2주 이내 (Phase 3)
3. 포트폴리오 Before & After 구현 (4-6시간)
   - 데이터 모델 확장 및 스토리 작성
   - 토글 UI 컴포넌트 개발
   - AnimatedNumber 통합
   - 반응형 레이아웃 구현

---

## Critical Files

### Phase 1 (Hero 섹션)
- `si-landing-v2/src/components/Hero.tsx`

### Phase 2 (CTA 전환)
- `si-landing-v2/src/components/Hero.tsx`
- `si-landing-v2/src/components/ContactForm.tsx`
- `si-landing-v2/src/assets/data/targetContent.ts`
- `si-landing-v2/src/assets/data/servicePackages.ts`
- `si-landing-v2/src/components/AnyonService.tsx`

### Phase 3 (포트폴리오)
- `si-landing-v2/src/assets/data/portfolio.ts`
- `si-landing-v2/src/components/Portfolio.tsx`
- `si-landing-v2/src/components/ui/metric-card.tsx` (신규)
- `si-landing-v2/src/components/ui/animated-number.tsx` (참고)

---

## 리스크 및 대응

1. **지나친 위협으로 거부감**: 서브헤드라인에서 희망 메시지 강화
2. **긴 문구로 가독성 저하**: 모바일 폰트 크기 조정 및 줄바꿈 최적화
3. **Before/After 데이터 작성 부담**: 3개 프로젝트만 먼저 상세화, 나머지는 간략 버전
4. **성능 저하 우려**: 초기에는 간단한 애니메이션만, 점진적 개선

---

## 성과 측정

- Hero CTA 클릭률
- ContactForm 제출률
- 포트폴리오 섹션 체류 시간
- Before/After 토글 상호작용률
- 전체 전환율 변화

**A/B 테스트 권장**: Phase 1, 2 실행 후 2주간 기존 버전과 비교
