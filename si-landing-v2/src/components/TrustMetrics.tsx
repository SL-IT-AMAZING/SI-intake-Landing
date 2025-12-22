import { trustMetrics } from '../assets/data/servicePackages';
import { AnimatedNumber } from './ui/animated-number';
import { LogoLoop } from './ui/logo-loop';

export function TrustMetrics() {
  // Convert all metrics to LogoLoop items in one row
  const allItems = trustMetrics.map((metric) => ({
    node: <MetricCard metric={metric} />
  }));

  return (
    <section className="py-12 bg-[#0A0A0A] border-y border-white/10">
      <LogoLoop
        logos={allItems}
        speed={50}
        direction="left"
        gap={96}
        logoHeight={80}
        pauseOnHover={true}
      />
    </section>
  );
}

interface MetricCardProps {
  metric: typeof trustMetrics[0];
}

function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="text-center min-w-[250px]">
      <div className="flex items-baseline justify-center gap-1 mb-2">
        <span
          className={`text-4xl font-bold ${
            metric.highlight
              ? 'text-[#17DB4E]'
              : 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent'
          }`}
        >
          <AnimatedNumber value={metric.value} suffix={metric.suffix} duration={2} />
        </span>
      </div>
      <div className="text-sm font-semibold text-white">{metric.label}</div>
      <div className="text-xs text-gray-400">{metric.sublabel}</div>
    </div>
  );
}
