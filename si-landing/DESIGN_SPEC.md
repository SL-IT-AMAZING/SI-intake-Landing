# ANYON Landing Page - Design Specification

## 🎨 Design Philosophy

**Theme**: Premium Dark Mode
**Inspiration**: 똑똑한개발자, 웨본 (High-end SI companies)
**Core Message**: "지속 가능한 개발, 쉬운 유지보수"

## 🌈 Color Palette

### Primary Colors
```css
--cyan-400: #22d3ee    /* Primary accent */
--cyan-500: #06b6d4    /* Primary dark */
--blue-500: #3b82f6    /* Secondary accent */
--blue-600: #2563eb    /* Secondary dark */
```

### Background Colors
```css
--slate-950: #020617   /* Deepest background */
--slate-900: #0f172a   /* Section background */
--slate-800: #1e293b   /* Card background */
--slate-700: #334155   /* Border color */
```

### Text Colors
```css
--white: #ffffff       /* Primary text */
--gray-100: #f5f5f5    /* Secondary headings */
--gray-300: #d1d5db    /* Subheadings */
--gray-400: #9ca3af    /* Body text */
--gray-500: #6b7280    /* Muted text */
```

### Accent Colors
```css
--green-500: #22c55e   /* Success/highlight */
--yellow-500: #eab308  /* Featured badge */
--orange-500: #f97316  /* Featured gradient */
```

## 📐 Layout Structure

### Section Spacing
- **Vertical Padding**: `py-20` to `py-24` (5-6rem)
- **Max Width**: `max-w-7xl` (1280px)
- **Horizontal Padding**: `px-4 sm:px-6 lg:px-8`

### Grid Layouts
- **Hero**: Single column, centered
- **Trust Indicators**: 1/2/4 columns (mobile/tablet/desktop)
- **Core Strengths**: 1/3 columns (mobile/desktop)
- **Portfolio**: 1/2/3 columns (mobile/tablet/desktop)
- **Contact**: Single column form

## 🎭 Component Styles

### Cards

#### Standard Card
```css
background: linear-gradient(to-br, #1e293b, #0f172a)
border: 1px solid #334155
border-radius: 16px (rounded-2xl)
padding: 32px (p-8)
```

#### Glass Morphism Card
```css
background: rgba(17, 24, 39, 0.7)
backdrop-filter: blur(10px)
border: 1px solid rgba(107, 114, 128, 0.5)
border-radius: 16px
```

#### Hover Effects
- `scale-105` - Slight scale up
- `shadow-2xl shadow-cyan-500/20` - Glowing shadow
- `border-cyan-500/50` - Accent border

### Buttons

#### Primary CTA
```css
background: linear-gradient(to-right, #06b6d4, #3b82f6)
color: white
padding: 16px 32px (px-8 py-4)
border-radius: 8px
box-shadow: 0 20px 50px rgba(6, 182, 212, 0.5)
hover: scale-105, shadow-xl
```

#### Secondary Button
```css
border: 2px solid #4b5563
background: transparent
color: #d1d5db
hover: background: rgba(31, 41, 55, 0.5)
```

### Typography

#### Headings
- **H1 (Hero)**: `text-5xl sm:text-6xl lg:text-7xl font-bold`
- **H2 (Section)**: `text-3xl sm:text-4xl font-bold`
- **H3 (Card Title)**: `text-xl sm:text-2xl font-bold`

#### Body Text
- **Large**: `text-lg sm:text-xl` (Subheadings)
- **Medium**: `text-base` (Body)
- **Small**: `text-sm` (Labels, captions)

#### Font Weights
- **Bold**: 700 (Headlines)
- **Semibold**: 600 (Subheadings)
- **Medium**: 500 (Labels)
- **Normal**: 400 (Body)
- **Light**: 300 (Large hero text)

## ✨ Animations

### Hero Section
```css
@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
/* Applied to main headline */
```

### Background Orbs
```css
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}
/* 8s duration */

@keyframes pulse-slower {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.4; }
}
/* 12s duration */
```

### Counter Animation
- Duration: 2000ms
- Easing: Linear steps (60 steps)
- Trigger: Intersection Observer (30% threshold)

### Hover Transitions
```css
transition: all 0.3s ease
/* Scale, shadow, border, background */
```

### Scroll Animations
- Fade in up: `opacity 0 → 1`, `translateY(30px) → 0`
- Duration: 600ms
- Easing: ease-out

## 🖼️ Asset Usage

### Icons (Lucide React)
- **Hero**: `ArrowRight`, `ChevronDown`
- **Strengths**: `Wrench`, `RefreshCw`, `Users`
- **Portfolio**: `ExternalLink`
- **Contact**: `Send`, `CheckCircle2`, `Mail`, `Building2`, `User`, `FileText`
- **Footer**: `Github`, `Mail`, `Phone`, `MapPin`, `ChevronUp`

### Images
All images are in `/public/`:
- `logo-anyon.png` - Company logo (h-16 ~ h-20)
- `maintain-tab-icon.png` - Maintenance strength
- `mvp-icon-Photoroom.png` - Sustainable development
- `prd-icon-Photoroom.png` - Transparent collaboration
- `architecture-icon.png` - Portfolio item
- `design-icon.png` - Portfolio item
- `erd-icon.png` - Portfolio item
- etc.

Image treatment:
- `opacity-60 group-hover:opacity-80` - Opacity transition
- `group-hover:scale-110` - Zoom on hover
- `object-cover` - Maintain aspect ratio

## 📱 Responsive Breakpoints

### Tailwind Breakpoints Used
```css
sm: 640px   /* Tablets */
md: 768px   /* Small laptops */
lg: 1024px  /* Desktops */
xl: 1280px  /* Large desktops */
```

### Layout Changes

#### Mobile (<640px)
- Single column layouts
- Stacked buttons
- Smaller text sizes
- Reduced padding

#### Tablet (640-1024px)
- 2-column grids
- Medium text sizes
- Balanced spacing

#### Desktop (>1024px)
- 3-4 column grids
- Full-size components
- Maximum spacing

## 🎯 Interactive Elements

### Smooth Scrolling
- `scroll-behavior: smooth` on html
- Scroll to section buttons in Hero
- Anchor links in navigation

### Form States
```css
Focus: border-cyan-500, ring-2 ring-cyan-500/20
Disabled: opacity-50, pointer-events-none
Success: CheckCircle2 icon, green theme
```

### Hover States
- Cards: Scale + glow effect
- Buttons: Scale + shadow increase
- Links: Color change to cyan-400

## 🔧 Technical Specs

### Performance
- **First Contentful Paint**: <1s
- **Time to Interactive**: <2s
- **Total Bundle Size**: ~230KB
- **Gzipped**: ~63KB

### Accessibility
- Semantic HTML5 elements
- ARIA labels on buttons
- Focus visible states
- Color contrast WCAG AA compliant

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties
- Backdrop filter (with fallback)

---

## 📋 Design Checklist

✅ Dark theme with premium feel
✅ Gradient accents and animations
✅ Glass morphism effects
✅ Smooth scroll behavior
✅ Hover effects on all interactive elements
✅ Responsive typography
✅ Mobile-first approach
✅ Optimized images
✅ Accessible forms
✅ Performance optimized

---

**Design System Version**: 1.0
**Last Updated**: 2025-12-20
**Designer**: ANYON Team
