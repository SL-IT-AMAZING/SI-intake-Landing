# ANYON SI Company Landing Page

A premium, dark-themed single-page landing page for ANYON, showcasing our expertise in sustainable development and easy maintenance solutions.

## Features

- 🎨 **Dark Theme Design**: Premium, sophisticated dark theme with gradient accents
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Smooth Animations**: Scroll animations, hover effects, and animated counters
- 🎯 **Core Sections**:
  - Hero section with gradient animations
  - Trust indicators with animated counters
  - Core strengths with glass morphism cards
  - Portfolio with category filtering
  - Contact form with validation
  - Footer with company information

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite 6** - Build tool & dev server
- **Tailwind CSS 4** - Styling
- **Lucide React** - Icons

## Getting Started

### Installation

```bash
# Navigate to the project directory
cd si-landing

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

The site will be available at `http://localhost:3000`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
si-landing/
├── public/                 # Static assets (images, logos)
├── src/
│   ├── assets/
│   │   └── data/          # Data files (stats, portfolio)
│   ├── components/        # React components
│   │   ├── Hero.tsx
│   │   ├── TrustIndicators.tsx
│   │   ├── CoreStrengths.tsx
│   │   ├── Portfolio.tsx
│   │   ├── CTASection.tsx
│   │   └── Footer.tsx
│   ├── styles/            # Custom CSS
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Entry point
├── index.html             # HTML template
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Customization

### Update Content

- **Stats & Metrics**: Edit `src/assets/data/stats.ts`
- **Portfolio Projects**: Edit `src/assets/data/portfolio.ts`
- **Company Info**: Update contact details in `src/components/Footer.tsx`

### Update Colors

Colors are configured using Tailwind's utility classes. The main color scheme uses:
- Primary: Cyan (`cyan-400`, `cyan-500`)
- Secondary: Blue (`blue-500`, `blue-600`)
- Background: Slate (`slate-900`, `slate-950`)

### Add Images

Place your images in the `public/` folder and reference them with `/image-name.png`

## Performance

- Lazy loading for images
- Optimized animations (CSS transforms & opacity)
- Code splitting via Vite
- Minified production build

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Private - ANYON Internal Use Only

---

Built with ❤️ by ANYON Team
