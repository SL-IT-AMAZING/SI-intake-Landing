import { Hero } from './components/Hero';
import { TrustMetrics } from './components/TrustMetrics';
import { TargetSelector } from './components/TargetSelector';
import { AIDifferentiators } from './components/AIDifferentiators';
import { AnyonService } from './components/AnyonService';
import { ServicePackages } from './components/ServicePackages';
import { WhyAnyon } from './components/WhyAnyon';
import { Testimonials } from './components/Testimonials';
import { Portfolio } from './components/Portfolio';
import { FAQ } from './components/FAQ';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';
import './styles/main.css';

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Hero />
      <TrustMetrics />
      <TargetSelector />
      <AIDifferentiators />
      <AnyonService />
      <ServicePackages />
      <WhyAnyon />
      <Testimonials />
      <Portfolio />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
