# Document Consistency Rules

Detailed validation rules for checking consistency across planning documents.

## Document Hierarchy

```
PRD (Product Requirements)
  ↓
UX Design (ui-ux.html)
  ↓
UI Design Guide
  ↓
TRD (Technical Requirements)
  ↓
Architecture
  ↓
ERD (Entity Relationship)
```

Each downstream document must be consistent with all upstream documents.

## Extraction Patterns

### PRD Elements

```markdown
Look for:
- # Product Name / 제품명
- ## Features / 기능 / 요구사항
- ## User Stories / 사용자 스토리
- ## MVP Scope / MVP 범위
- 사용자 유형 / User Types / Roles
```

### UX Elements (ui-ux.html)

```html
Look for:
- <title> or <h1> for product name
- data-screen="screen-name" attributes
- navigation links and flows
- form fields and inputs
- button labels and actions
```

### UI Design Guide Elements

```markdown
Look for:
- Component library references
- Color palette definitions
- Typography specifications
- Recommended UI frameworks
```

### TRD Elements

```markdown
Look for:
- ## Tech Stack / 기술 스택
- ## APIs / API 명세
- ## Authentication / 인증
- ## Database / 데이터베이스
- Open-source recommendations
```

### Architecture Elements

```markdown
Look for:
- ## System Architecture / 시스템 아키텍처
- ## Services / 서비스
- ## Data Flow / 데이터 흐름
- ## Security / 보안
- ## Deployment / 배포
```

### ERD Elements

```markdown
Look for:
- ## Entities / 엔티티
- ## Tables / 테이블
- ## Relationships / 관계
- Field definitions (name, type, constraints)
- Foreign key references
```

## Validation Rules by Category

### 1. Product Identity Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| PI-001 | Product name must be identical | CRITICAL |
| PI-002 | Product description must align | WARNING |
| PI-003 | Target users must be consistent | WARNING |

### 2. Feature Consistency Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| FC-001 | PRD feature must exist in UX | CRITICAL |
| FC-002 | UX screen must have TRD spec | CRITICAL |
| FC-003 | Feature must have ERD support | CRITICAL |
| FC-004 | Feature names should match | WARNING |
| FC-005 | Feature descriptions should align | INFO |

### 3. Technology Stack Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| TS-001 | TRD tech must match Architecture | CRITICAL |
| TS-002 | Version numbers must not conflict | WARNING |
| TS-003 | Open-source choices must align | WARNING |
| TS-004 | Framework consistency | CRITICAL |

### 4. Data Model Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| DM-001 | Referenced entity must exist in ERD | CRITICAL |
| DM-002 | Field names must be consistent | WARNING |
| DM-003 | Field types must be compatible | CRITICAL |
| DM-004 | Relationships must be defined | WARNING |

### 5. API Consistency Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| API-001 | Endpoint must have feature backing | CRITICAL |
| API-002 | Request/response must match ERD | WARNING |
| API-003 | Auth requirements must align | CRITICAL |

### 6. User Flow Rules

| Rule ID | Description | Severity |
|---------|-------------|----------|
| UF-001 | User roles in PRD must exist in Auth | CRITICAL |
| UF-002 | Screens must have routes | WARNING |
| UF-003 | Permissions must be consistent | CRITICAL |

## Comparison Matrix

When validating, create this matrix:

| Element | PRD | UX | UI | TRD | Arch | ERD | Status |
|---------|-----|----|----|-----|------|-----|--------|
| Product Name | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ | OK |
| Feature A | ✓ | ✓ | - | ✓ | ✓ | ✓ | OK |
| Feature B | ✓ | ✗ | - | - | - | - | FAIL |
| Entity X | - | - | - | ✓ | ✓ | ✓ | OK |

Legend:
- ✓ = Present and consistent
- ✗ = Missing or inconsistent
- `-` = Not applicable for this document

## Common Inconsistency Patterns

### Pattern 1: Missing Feature in Downstream
```
PRD defines "User Authentication"
UX has login screen
TRD missing auth specification
→ CRITICAL: Add auth spec to TRD
```

### Pattern 2: Terminology Mismatch
```
PRD: "User"
UX: "Member"
ERD: "users" table
→ WARNING: Standardize terminology
```

### Pattern 3: Tech Stack Conflict
```
TRD: PostgreSQL 15
Architecture: PostgreSQL 14
→ WARNING: Align version numbers
```

### Pattern 4: Missing Entity
```
API returns "order.items"
ERD has no "order_items" table
→ CRITICAL: Add entity to ERD
```

### Pattern 5: Orphan Screen
```
UX has "Settings" screen
PRD has no settings feature
→ INFO: Document feature or remove screen
```

## Report Template

```markdown
# Consistency Check Report

**Generated**: [timestamp]
**Documents Checked**: [list]

## Summary

| Severity | Count |
|----------|-------|
| CRITICAL | X |
| WARNING | Y |
| INFO | Z |

**Overall Status**: PASS / FAIL

## Critical Issues

### [Rule ID]: [Brief Description]
- **Location**: [Document A] vs [Document B]
- **Expected**: [what should be there]
- **Found**: [what was found or missing]
- **Fix**: [recommended action]

## Warnings

[Similar format]

## Information

[Similar format]

## Recommendations

1. [Priority action 1]
2. [Priority action 2]
3. [Priority action 3]

## Document Coverage Matrix

[Matrix table as shown above]
```

## Automated Checks

For each document pair, run these checks:

### PRD → UX
- Every PRD feature has a corresponding screen
- User types are represented in flows
- MVP scope items are all wireframed

### UX → TRD
- Every screen has technical specifications
- Form fields have validation rules
- API calls are documented

### TRD → Architecture
- Tech stack decisions are implemented
- API structure matches architecture
- Auth mechanisms are consistent

### Architecture → ERD
- Every service has data store
- Relationships support features
- Indexes match query patterns

### Cross-Document (All)
- Product name consistency
- Terminology alignment
- Version number consistency
