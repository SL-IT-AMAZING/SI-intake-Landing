import { Hero } from './components/Hero';
import { TrustMetrics } from './components/TrustMetrics';
import { TargetSelector } from './components/TargetSelector';
import { AIDifferentiators } from './components/AIDifferentiators';
import { AnyonService } from './components/AnyonService';
import { ServicePackages } from './components/ServicePackages';
import { Testimonials } from './components/Testimonials';
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
      <Testimonials />
      <FAQ />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default App;
