# React Bits 활용 계획 - si-landing-v2

> 참고: https://www.reactbits.dev/get-started/index

---

## 현재 프로젝트 UI 컴포넌트 현황

| 파일 | 설명 |
|------|------|
| `ui/background-beams.tsx` | Hero 섹션 배경 빔 효과 |
| `ui/text-reveal.tsx` | 텍스트 나타나기 애니메이션 |
| `ui/floating-card.tsx` | 호버 시 떠오르는 카드 |
| `ui/animated-gradient-text.tsx` | 그라데이션 텍스트 |
| `ui/animated-number.tsx` | 숫자 카운트 애니메이션 |

---

## React Bits 추천 컴포넌트

### Priority 1: 즉시 적용 추천

#### 1. Shiny Text (Text Animations)
- **적용 위치**: Hero 섹션 헤드라인
- **효과**: 텍스트에 빛나는 반짝임 효과
- **URL**: https://www.reactbits.dev/text-animations/shiny-text
- **기대 효과**: 시선 집중, 프리미엄 느낌 강화

#### 2. Scroll Velocity (Text Animations)
- **적용 위치**: TrustMetrics 섹션 (클라이언트 로고/키워드)
- **효과**: 무한 스크롤 마퀴
- **URL**: https://www.reactbits.dev/text-animations/scroll-velocity
- **기대 효과**: 동적인 신뢰 지표 표현

#### 3. Tilted Card (Components)
- **적용 위치**: ServicePackages 카드
- **효과**: 마우스 따라 기울어지는 3D 카드
- **URL**: https://www.reactbits.dev/components/tilted-card
- **기대 효과**: 인터랙티브한 서비스 패키지 표현

---

### Priority 2: 섹션 차별화

#### 4. Aurora / Silk (Backgrounds)
- **적용 위치**: AIDifferentiators 또는 WhyAnyon 섹션
- **효과**: 부드러운 실크/오로라 배경
- **URL**:
  - https://www.reactbits.dev/backgrounds/aurora
  - https://www.reactbits.dev/backgrounds/silk
- **기대 효과**: 섹션별 시각적 차별화

#### 5. True Focus (Text Animations)
- **적용 위치**: 섹션 타이틀의 핵심 키워드
- **효과**: 특정 단어에 블러 해제 포커스
- **URL**: https://www.reactbits.dev/text-animations/true-focus
- **기대 효과**: "AI", "자동화" 등 핵심 단어 강조

#### 6. Glitch Text (Text Animations)
- **적용 위치**: 테크/AI 관련 섹션
- **효과**: 글리치(깨지는) 텍스트 효과
- **URL**: https://www.reactbits.dev/text-animations/glitch-text
- **기대 효과**: 테크 느낌 강화

---

### Priority 3: 인터랙션 강화

#### 7. Click Spark (Animations)
- **적용 위치**: CTA 버튼 (문의하기, 상담 신청)
- **효과**: 클릭 시 스파크 파티클
- **URL**: https://www.reactbits.dev/animations/click-spark
- **기대 효과**: 버튼 클릭 피드백 강화

#### 8. Splash Cursor / Blob Cursor (Animations)
- **적용 위치**: 전체 페이지
- **효과**: 커서 따라다니는 잉크/블롭 효과
- **URL**:
  - https://www.reactbits.dev/animations/splash-cursor
  - https://www.reactbits.dev/animations/blob-cursor
- **기대 효과**: 페이지 전체 인터랙티브 느낌

#### 9. Fade Content (Animations)
- **적용 위치**: 각 섹션 진입 시
- **효과**: 스크롤 시 콘텐츠 페이드 인
- **URL**: https://www.reactbits.dev/animations/fade-content
- **기대 효과**: 부드러운 섹션 전환

---

## 적용 매핑 테이블

| 섹션 | 현재 | 추천 추가 |
|------|------|----------|
| **Hero** | BackgroundBeams, TextReveal, FloatingCard | + Shiny Text |
| **TrustMetrics** | AnimatedNumber | + Scroll Velocity |
| **AIDifferentiators** | - | + Aurora/Silk, True Focus |
| **AnyonService** | - | + Glitch Text |
| **ServicePackages** | - | + Tilted Card |
| **WhyAnyon** | - | + Silk, Fade Content |
| **Portfolio** | - | + Fade Content |
| **ContactForm** | - | + Click Spark |
| **전체** | - | + Blob Cursor (선택) |

---

## 구현 순서 제안

1. **Shiny Text** - Hero 헤드라인 (가장 눈에 띄는 효과)
2. **Tilted Card** - ServicePackages (인터랙션 강화)
3. **Scroll Velocity** - TrustMetrics (동적 마퀴)
4. **Click Spark** - CTA 버튼 (전환율 향상)
5. **Aurora/Silk** - 배경 차별화 (선택)

---

## 설치 방법

React Bits 컴포넌트는 복사-붙여넣기 방식:
1. 원하는 컴포넌트 페이지 방문
2. 코드 복사
3. `src/components/ui/` 폴더에 파일 생성
4. 필요한 의존성 설치 (주로 framer-motion)

```bash
# 이미 설치된 의존성 확인
npm list framer-motion
```

---

## 주의사항

- **성능**: 너무 많은 애니메이션은 성능 저하 유발
- **모바일**: 일부 커서 효과는 모바일에서 비활성화 필요
- **접근성**: 애니메이션 과다 시 `prefers-reduced-motion` 고려
- **일관성**: 브랜드 컬러(#8B5CF6, #A855F7)와 조화 확인
