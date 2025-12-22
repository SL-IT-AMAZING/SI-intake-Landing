---
name: Open Source Finder
description: 이미 만들어진 오픈소스 서비스, 솔루션, 템플릿을 찾고 추천할 때 사용. "비슷한 오픈소스 있어?", "이미 만들어진 거 없어?", "처음부터 만들어야 해?" 같은 요청에 활성화. 바퀴를 재발명하지 않도록 기존 오픈소스 프로젝트를 찾아드립니다.
version: 0.2.0
---

# Open Source Finder

이 스킬은 **이미 만들어진 오픈소스 서비스/솔루션/템플릿**을 찾아서 개발 시간을 단축시킵니다.

## 핵심 목적: 바퀴를 재발명하지 않기

**"처음부터 다 만들지 마세요. 이미 만들어진 게 있을 수 있어요!"**

예시:
- "Todo 앱 만들고 싶어요" → **오픈소스 Todo 앱** 찾기 (Todoist 클론, 태스크 매니저 등)
- "이커머스 만들고 싶어요" → **오픈소스 이커머스** 찾기 (Medusa, Saleor, Shopify 대안 등)
- "채팅 기능 필요해요" → **오픈소스 채팅 솔루션** 찾기 (Rocket.Chat, Mattermost 등)
- "대시보드 필요해요" → **오픈소스 Admin 템플릿** 찾기 (React Admin, Refine 등)

---

## When to Activate (언제 활성화)

다음과 같은 상황에서 이 스킬을 활성화:

1. **서비스/제품 기획 단계**
   - "XX 서비스 만들고 싶어요"
   - "XX 같은 앱 만들려면?"
   - "이미 만들어진 거 없나요?"

2. **특정 기능 구현 논의**
   - "채팅 기능 어떻게 구현하지?"
   - "결제 시스템 직접 만들어야 해?"
   - "CMS 기능이 필요한데..."

3. **벤치마킹/참고 서비스 찾기**
   - "인스타그램 같은 거 오픈소스 있어?"
   - "노션 대안 오픈소스?"
   - "Figma 클론 프로젝트 있나?"

4. **비용 절감/빠른 개발 필요**
   - "빨리 만들어야 하는데..."
   - "처음부터 만들 시간이 없어요"
   - "무료로 쓸 수 있는 거 없나요?"

---

## NOT This Skill (이 스킬이 아님)

다음은 이 스킬의 범위가 **아닙니다** (TRD 워크플로우에서 처리):

- React vs Vue 선택 → **TRD (기술 스택)**
- PostgreSQL vs MongoDB 선택 → **TRD (데이터베이스)**
- Vite vs Webpack 선택 → **TRD (빌드 도구)**
- Tailwind vs MUI 선택 → **TRD/UI (UI 라이브러리)**

**이 스킬은**: "이미 만들어진 완성된 솔루션/서비스/템플릿" 찾기

---

## Search Process (검색 프로세스)

### 1. 사용자 니즈 파악

대화에서 파악할 것:
- **만들고 싶은 것**: 어떤 서비스/기능?
- **핵심 기능**: 꼭 필요한 기능은?
- **기술 스택**: 이미 정해진 게 있나? (React? Python?)
- **라이선스**: 상업용? 오픈소스? 학습용?

### 2. 카테고리별 검색

#### 완성형 솔루션 (Self-hosted Services)

| 카테고리 | 검색 키워드 | 예시 |
|---------|-----------|------|
| 이커머스 | "open source ecommerce", "shopify alternative" | Medusa, Saleor, Vendure |
| CMS | "open source cms headless" | Strapi, Payload, Directus |
| 채팅/메시징 | "open source chat", "slack alternative" | Rocket.Chat, Mattermost, Zulip |
| CRM | "open source crm" | Twenty, Erxes, SuiteCRM |
| 프로젝트 관리 | "open source project management" | Plane, Focalboard, Taiga |
| 노트/문서 | "open source notion alternative" | AppFlowy, AFFiNE, Outline |
| 분석/대시보드 | "open source analytics" | Plausible, Umami, Metabase |
| 인보이스/회계 | "open source invoice" | Invoice Ninja, Crater |
| 이메일 | "open source email marketing" | Mautic, Listmonk |
| 포럼/커뮤니티 | "open source forum" | Discourse, Flarum |
| 예약/캘린더 | "open source booking" | Cal.com, Easy!Appointments |
| AI/LLM | "open source llm chat" | Open WebUI, LibreChat |

#### 기능 모듈 (Plug & Play Features)

| 기능 | 검색 키워드 | 예시 |
|-----|-----------|------|
| 인증 시스템 | "open source auth", "keycloak alternative" | Keycloak, Authentik, Logto |
| 파일 관리 | "open source file manager" | FileBrowser, Nextcloud |
| 실시간 협업 | "open source collaborative editing" | Yjs, Liveblocks alternative |
| 검색 엔진 | "open source search" | Meilisearch, Typesense |
| 알림 시스템 | "open source notification" | Novu, Apprise |
| 폼 빌더 | "open source form builder" | Formbricks, Typebot |
| URL 단축 | "open source url shortener" | Dub, Shlink |
| 이미지 처리 | "open source image processing" | imgproxy, Thumbor |

#### 템플릿/보일러플레이트 (Starter Kits)

| 유형 | 검색 키워드 | 예시 |
|-----|-----------|------|
| SaaS 템플릿 | "open source saas starter", "saas boilerplate" | Shipfast alternative, SaaS UI |
| Admin 대시보드 | "open source admin dashboard react" | React Admin, Refine, Tremor |
| 랜딩 페이지 | "open source landing page template" | 다양한 Tailwind 템플릿 |
| 블로그 | "open source blog", "gatsby blog starter" | Ghost, Astro Blog |
| 포트폴리오 | "open source portfolio template" | 다양한 Next.js 템플릿 |

### 3. WebSearch로 검색

```
검색 쿼리 패턴:
- "open source {서비스유형} 2025"
- "self hosted {서비스유형} alternative"
- "best open source {기능} github"
- "{유명서비스} open source alternative"
- "awesome self-hosted {카테고리}"
```

### 4. 평가 및 필터링

각 오픈소스 프로젝트에 대해:
- **GitHub Stars**: 최소 1,000+ (검증된 프로젝트)
- **최근 활동**: 6개월 내 커밋
- **라이선스**: MIT/Apache 2.0 우선 (상업용이면)
- **문서화**: 설치 가이드, API 문서 존재
- **커뮤니티**: Discord/Slack 활성도

`references/evaluation-criteria.md` 참조

---

## Presentation Format (발표 형식)

### 비개발자 친화적 설명 원칙

**모든 설명에 적용:**
1. **비유 필수**: 기술 용어 대신 일상 비유 사용
2. **한마디 설명**: 복잡한 기능도 한 문장으로
3. **이모지 활용**: 시각적 구분 도움
4. **실생활 예시**: "이런 상황에서 쓰는 거예요"

**좋은 예시:**
- ❌ "REST API로 데이터를 CRUD합니다"
- ✅ "엑셀처럼 데이터를 추가/수정/삭제할 수 있어요"

- ❌ "WebSocket 기반 실시간 통신"
- ✅ "카카오톡처럼 바로바로 메시지가 와요"

- ❌ "OAuth 2.0 인증 지원"
- ✅ "구글/카카오 계정으로 로그인 가능해요"

### 한 번에 보여주기 (완성형 + 기능 선택)

완성형 솔루션과 기능 선택 목록을 **한 화면에 함께** 제시:

```markdown
처음부터 다 만들기 전에, 오픈소스를 찾아봤어요!

💡 **오픈소스란?** 누군가 이미 만들어서 무료로 공개한 프로그램이에요.
레시피를 공개한 것처럼, 그대로 쓰거나 입맛에 맞게 수정할 수 있어요.

---

## 1️⃣ 완성형 오픈소스 (전체 서비스)

비슷한 서비스가 이미 만들어져 있어요! 이걸 가져다 쓰면 개발 시간을 크게 줄일 수 있어요.

**1. [프로젝트명]** ⭐ XX,XXXk (XX,XXX명이 좋아요 누름)
- 💬 한마디: [일상적 비유로 설명. 예: "인스타그램을 직접 운영할 수 있게 해주는 프로그램"]
- ✨ 이런 게 돼요: [비개발자가 이해할 수 있는 기능 설명]
- 🛠️ 만든 기술: [React, Node.js 등] ← 나중에 개발자가 참고할 정보
- 📜 라이선스: [MIT] 👉 [비유로 설명: "무료 레시피처럼 마음대로 써도 돼요"]
- 🔗 구경하기: [GitHub URL]

**2. [프로젝트명]** ⭐ XX,XXXk
- ...

**3. [프로젝트명]** ⭐ XX,XXXk
- ...

---

## 2️⃣ 기능별로 조합하기

완성형이 맘에 안 들면, 레고 블록처럼 기능별로 조합할 수도 있어요!

**만들고 싶은 기능들:**
a. [기능1] - [비개발자도 이해할 수 있는 설명]
b. [기능2] - [예: "회원가입하고 로그인하는 기능"]
c. [기능3] - [예: "사진 올리고 공유하는 기능"]
d. [기능4] - [예: "검색해서 빠르게 찾는 기능"]
e. [기능5] - [예: "알림 보내주는 기능"]

**라이브러리 찾아볼 기능 선택** (여러 개 가능):
- 위 목록에서 선택: a, c, d
- 직접 입력도 OK: "결제", "알림", "소셜 로그인" 등

💡 **라이브러리란?** 특정 기능을 미리 만들어둔 도구 상자예요.
예: 로그인 기능을 처음부터 만들지 않고, 로그인 라이브러리를 가져다 쓰면 돼요.

---

**선택:**
- 완성형 선택: 번호 (1, 2, 3)
- 기능별 조합: 알파벳 (a, b, c...) 또는 직접 입력
- 더 찾기: "더 찾아줘"
- 오픈소스 없이: "처음부터"
```

### 기능 선택 후 라이브러리 검색 결과

```markdown
## 🧩 기능별 라이브러리 검색 결과

선택하신 기능들에 대해 이미 만들어진 도구들을 찾아봤어요!

### 📦 [선택한 기능1: 예-로그인] 라이브러리

**1. [라이브러리명]** ⭐ XXk (XX,XXX명이 좋아요 누름)
- 💬 한마디: [비유로 설명. 예: "건물 출입증 시스템이에요. 누가 들어오는지 자동으로 관리해줘요"]
- ✨ 이런 게 돼요: [비개발자 언어로. 예: "이메일 로그인, 구글/카카오 로그인, 비밀번호 찾기 다 돼요"]
- 📜 라이선스: MIT 👉 무료로 맘껏 써도 돼요

**2. [라이브러리명]** ⭐ XXk
- 💬 한마디: ...
- ✨ 이런 게 돼요: ...
- 📜 라이선스: ...

**3. 직접 개발**
- 💬 한마디: 처음부터 직접 만들어요
- ⏰ 시간: 더 오래 걸리지만 100% 원하는 대로 만들 수 있어요

### 📦 [선택한 기능2: 예-검색] 라이브러리

**1. [라이브러리명]** ⭐ XXk
- 💬 한마디: [예: "네이버 검색처럼 빠르게 찾아주는 도구예요"]
- ...

---

각 기능별로 번호 선택해주세요 (예: 1, 2):
💡 번호만 쓰면 돼요: "1, 2" 또는 "로그인은 1번, 검색은 2번"
```

### 상세 정보 템플릿 (선택 후)

```markdown
## [프로젝트명] 상세 정보

### 한마디로
> [비유로 설명. 예: "Shopify를 직접 운영할 수 있게 해주는 오픈소스예요"]

### 이 프로젝트가 해결하는 문제
[어떤 문제를 해결하는지 설명]

### 핵심 기능
- [기능 1]
- [기능 2]
- [기능 3]

### 기술 스택
- Frontend: [React, Vue 등]
- Backend: [Node.js, Python 등]
- Database: [PostgreSQL, MongoDB 등]

### 라이선스
**[MIT/Apache/GPL]**
- 상업용: [OK/주의/불가]
- 수정 후 재배포: [OK/조건부]
- [비유로 설명]

### 장점
- [장점 1]
- [장점 2]

### 단점/고려사항
- [단점 1]
- [단점 2]

### 시작하기
```bash
# 설치 명령어
[설치 명령어]
```

### 링크
- GitHub: [URL]
- 공식 문서: [URL]
- 데모: [URL]
- 커뮤니티: [Discord/Slack URL]
```

---

## License Explanation (라이선스 설명)

오픈소스 추천 시 **반드시** 라이선스를 비개발자도 이해하기 쉽게 설명:

### MIT License
> "무료 레시피예요. 마음대로 쓰고, 팔고, 수정해도 돼요. '이 레시피 원래 여기서 왔어요'라고 출처만 밝히면 끝!"

**상업용: OK**

### Apache 2.0
> "MIT랑 비슷한데, 특허 보호까지 해줘요. 대기업 오픈소스에 많아요."

**상업용: OK**

### GPL
> "무료로 쓸 수 있지만, 이걸로 만든 서비스도 오픈소스로 공개해야 해요."

**상업용: 주의! 코드 공개 필요**

### AGPL
> "GPL보다 더 엄격해요. 서버에서 돌리기만 해도 코드 공개해야 해요."

**상업용: 매우 주의!**

### BSL (Business Source License)
> "일정 기간 후에 오픈소스가 되는 라이선스예요. 그 전엔 제한이 있어요."

**상업용: 조건 확인 필요**

---

## Auto-Recording (자동 기록)

선택 확정 시 `anyon-docs/planning/open-source.md`에 기록:

**CRITICAL: 채택한 솔루션만 기록! 다음은 절대 기록하지 말 것:**
- ❌ "검토했지만 선택하지 않은 솔루션" 섹션
- ❌ "미채택 사유", "미선택 사유"
- ❌ "향후 검토 대상" 섹션
- ❌ 선택하지 않은 대안들

### 기록 템플릿

```markdown
---
document_type: Open Source Solutions Registry
created_date: {{date}}
project_name: {{project_name}}
---

# 채택한 오픈소스 솔루션

이 문서는 프로젝트에서 활용하기로 한 오픈소스 서비스/솔루션들을 정리합니다.

---

## 핵심 솔루션

| 용도 | 솔루션명 | 역할 | 라이선스 | Stars | 링크 |
|-----|---------|------|---------|-------|------|
| [용도] | [이름] | [한마디 설명] | [라이선스] | [stars] | [링크] |

```

### 기록 시점

- 사용자가 "이걸로 할게요", "이거 쓸게요" 확정 시
- 워크플로우에서 솔루션이 결정되었을 때

---

## Storytelling Templates (스토리텔링 템플릿)

### 이커머스 오픈소스
> "[Medusa]는 Shopify를 직접 운영할 수 있게 해주는 오픈소스예요. Shopify 수수료 안 내고, 내 서버에서 내 쇼핑몰을 100% 제어할 수 있어요."

### CMS 오픈소스
> "[Strapi]는 콘텐츠 창고 관리자예요. 블로그 글, 상품 정보, 이미지 등을 쉽게 관리하고, 어떤 화면에서든 가져다 쓸 수 있게 해줘요."

### 채팅 오픈소스
> "[Rocket.Chat]은 회사 전용 카카오톡을 만들어주는 오픈소스예요. Slack 쓰기 부담되면 직접 운영할 수 있어요."

### Admin 대시보드
> "[React Admin]은 관리자 화면 레고 블록이에요. 이미 만들어진 조각들을 조립만 하면 멋진 관리자 페이지가 완성돼요."

### 인증 시스템
> "[Keycloak]은 건물 경비실 전체 시스템이에요. 로그인, 회원가입, 소셜 로그인, 권한 관리를 한 번에 해결해줘요."

---

## Language Guidelines (언어 가이드)

### 피해야 할 표현 → 사용할 표현

| 피하기 | 사용하기 |
|-------|---------|
| Self-hosted | 직접 운영하는, 내 서버에서 돌리는 |
| Headless | 화면 없이 데이터만 주는 |
| Boilerplate | 시작 템플릿, 기본 틀 |
| SaaS | 구독형 서비스 |
| Fork | 복사해서 내 걸로 만들기 |
| Deploy | 인터넷에 올리기, 배포 |
| Repository | 코드 저장소 |

### 톤
- 친근하게, 대화하듯이
- "~해요", "~이에요" 체 사용
- 추천은 명확하게, 하지만 선택은 사용자에게
- 장단점 균형 있게 설명

---

## Reference Files

- **`references/evaluation-criteria.md`** - 오픈소스 평가 기준
- **`references/search-strategies.md`** - 검색 전략 및 유용한 리소스
