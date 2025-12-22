# Quick Start Guide - ANYON Landing Page

## 🚀 Start Development Server

```bash
cd si-landing
npm install  # (already done)
npm run dev
```

The landing page will open automatically at **http://localhost:3000**

## 🎨 What You'll See

### 1. Hero Section
- Stunning gradient background with animations
- ANYON logo
- Main headline: "지속 가능한 개발, 쉬운 유지보수"
- Two CTA buttons (프로젝트 문의하기, 포트폴리오 보기)
- Trust badge showing 42% re-contract rate

### 2. Trust Indicators
- 4 animated counter cards showing:
  - 87+ Projects Completed
  - 42% Re-contract Rate (highlighted)
  - 3.8 years Average Maintenance Period
  - 98% Customer Satisfaction

### 3. Core Strengths
- 3 glass morphism cards with hover effects:
  - **쉬운 유지보수** (Easy Maintenance) - with maintain icon
  - **지속 가능한 개발** (Sustainable Development) - with MVP icon
  - **투명한 협업** (Transparent Collaboration) - with PRD icon

### 4. Portfolio
- Category filter (전체, 웹 애플리케이션, 모바일 앱, 백오피스 시스템, AI/데이터 솔루션)
- 6 project cards with:
  - Project images using existing ANYON icons
  - Technologies used
  - Brief descriptions
  - "자세히 보기" button

### 5. Contact Form
- Form fields:
  - Name (이름)
  - Company (회사명)
  - Email (이메일)
  - Project Type dropdown (프로젝트 유형)
  - Description textarea (간단한 설명)
- Submit button: "무료 상담 신청하기"
- Success message on submission

### 6. Footer
- Company logo and description
- Quick links
- Contact information
- Social media icons
- Scroll to top button (floating)

## 📱 Responsive Design

The landing page is fully responsive:
- **Desktop** (1920px): Full 3-column layouts
- **Laptop** (1366px): Optimized spacing
- **Tablet** (768px): 2-column layouts
- **Mobile** (375px): Single column stacking

## 🎭 Key Features

### Animations
- ✨ Gradient text animations in hero
- 🔢 Animated counters in trust indicators
- 🎨 Smooth hover effects on cards
- 📜 Scroll-triggered fade-in animations
- 💫 Glass morphism effects

### Color Scheme
- **Background**: Deep dark (#0f172a, #1e293b)
- **Primary**: Cyan (#06b6d4, #22d3ee)
- **Secondary**: Blue (#3b82f6)
- **Text**: White (#ffffff) and gray shades

### Typography
- **Font**: Inter (already loaded in project)
- **Sizes**: Responsive from text-sm to text-7xl

## 🛠️ Customization

### Change Content
Edit these files:
- `src/assets/data/stats.ts` - Metrics and strengths data
- `src/assets/data/portfolio.ts` - Portfolio projects

### Change Images
Images are in `public/` folder:
- `logo-anyon.png` - Main logo
- `maintain-tab-icon.png` - Maintenance icon
- `mvp-icon-Photoroom.png` - MVP icon
- `prd-icon-Photoroom.png` - PRD icon
- etc.

### Change Colors
Edit Tailwind classes in component files:
- `from-cyan-500 to-blue-500` - Primary gradient
- `bg-slate-950` - Dark background
- etc.

## 📦 Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

Preview the production build:
```bash
npm run preview
```

## ✅ Success!

Your ANYON SI company landing page is ready!

**Total Build Size**: ~230KB (gzipped: ~63KB)
**Performance**: Optimized with code splitting and lazy loading

---

Need help? Check the [README.md](README.md) for full documentation.
