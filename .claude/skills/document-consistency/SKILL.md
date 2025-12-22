---
name: document-consistency
description: This skill should be used when the user asks to "check document consistency", "validate documents", "verify planning docs", "check if documents match", "find inconsistencies", "compare documents", or after completing any startup workflow (PRD, UX, UI, TRD, Architecture, ERD). Validates consistency across all documents in anyon-docs/planning/ folder.
---

# Document Consistency Checker

Validate consistency across all planning documents in `anyon-docs/planning/` folder.

## Purpose

Ensure all planning documents maintain consistency in:
- Product name and description
- Feature lists and requirements
- Technology stack decisions
- User flows and screens
- Database entities and relationships
- API endpoints and data structures

## When to Use

1. After completing any startup workflow document
2. When user explicitly asks to check consistency
3. Before starting implementation phase
4. When modifying existing planning documents

## Validation Process

### Step 1: Discover All Documents

Scan `anyon-docs/planning/` for all `.md` and `.html` files:

```
anyon-docs/planning/
├── *.md files (PRD, TRD, Architecture, ERD, etc.)
├── ui-ux.html (UX wireframes)
└── any other planning documents
```

### Step 2: Extract Key Elements

From each document, extract:

| Element | Description |
|---------|-------------|
| Product Name | The official product/project name |
| Features | List of features/requirements |
| Tech Stack | Technologies, frameworks, libraries |
| Entities | Database tables, models, objects |
| Screens/Pages | UI screens and user flows |
| APIs | Endpoints, methods, data structures |
| Users/Roles | User types and permissions |

### Step 3: Cross-Document Validation

Check consistency across documents:

#### 3.1 Product Identity
- Product name must be identical across all documents
- Product description/purpose must align

#### 3.2 Feature Consistency
- Features in PRD must appear in UX wireframes
- UX screens must have corresponding TRD technical specs
- All features must have database support in ERD

#### 3.3 Technology Alignment
- TRD tech stack must match Architecture decisions
- Open-source recommendations must be consistent
- Version numbers should not conflict

#### 3.4 Data Model Consistency
- Entities in ERD must support all features
- API data structures must match ERD entities
- Field names and types must be consistent

#### 3.5 User Flow Consistency
- User roles defined in PRD must exist in Architecture auth
- Screens in UX must have routes in Architecture
- Permissions must be consistently applied

### Step 4: Report Results (Chat Only)

**IMPORTANT: Do NOT save report to file. Display in chat only.**

Present results directly in chat:

```
일관성 검사 완료!

**검사한 문서:** [count]개
**발견된 불일치:** [count]개
**상태:** PASS / FAIL

[If inconsistencies found:]
**불일치 항목:**

1. [Category]: [Issue]
   - [Document A]: [value]
   - [Document B]: [value]
   → [Fix recommendation]

2. ...

[If no inconsistencies:]
모든 문서가 일관성 있게 작성되었어요!
```

## Consistency Rules

### Critical (Must Fix)
- Product name mismatch
- Missing features in downstream documents
- Entity referenced but not defined in ERD
- API endpoint without corresponding feature

### Warning (Should Review)
- Terminology differences (e.g., "user" vs "member")
- Feature names slightly different
- Optional features not implemented

### Info (Optional)
- Additional features in downstream docs
- Extra fields in ERD not in requirements

## Output Format

**Chat only** - 결과는 채팅으로만 표시하고 별도 파일로 저장하지 않음.
불일치 발견 시 바로 수정 제안.

## Additional Resources

### Reference Files
- **`references/consistency-rules.md`** - Detailed validation rules and patterns

## Quick Validation Checklist

Before running full validation:

1. All documents exist in `anyon-docs/planning/`
2. Documents have proper structure (headers, sections)
3. Key elements are clearly labeled
4. No placeholder text remains

## Integration with Workflows

This skill integrates with startup workflows via `workflow.xml` CONSISTENCY-RULES.

When invoked after a workflow:
1. Read newly created document
2. Compare against existing documents
3. Flag any new inconsistencies
4. Suggest fixes before proceeding
