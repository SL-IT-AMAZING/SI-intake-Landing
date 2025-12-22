import { trustMetrics } from '../assets/data/servicePackages';
import { AnimatedNumber } from './ui/animated-number';
import { ScrollVelocity } from './ui/scroll-velocity';

export function TrustMetrics() {
  // Split metrics into 2 rows for bidirectional scrolling
  const row1Metrics = [trustMetrics[0], trustMetrics[1]];
  const row2Metrics = [trustMetrics[2], trustMetrics[3]];

  return (
    <section className="py-16 bg-[#0A0A0A] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Row 1: Scroll right */}
        <ScrollVelocity velocity={20} itemGap="gap-24">
          {row1Metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </ScrollVelocity>

        {/* Row 2: Scroll left */}
        <ScrollVelocity velocity={-15} itemGap="gap-24">
          {row2Metrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </ScrollVelocity>
      </div>
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
