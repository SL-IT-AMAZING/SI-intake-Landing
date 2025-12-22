import { Hero } from './components/Hero';
import { TrustIndicators } from './components/TrustIndicators';
import { CoreStrengths } from './components/CoreStrengths';
import { Portfolio } from './components/Portfolio';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import './styles/landing.css';

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Hero />
      <TrustIndicators />
      <CoreStrengths />
      <Portfolio />
      <CTASection />
      <Footer />
    </div>
  );
}

export default App;
