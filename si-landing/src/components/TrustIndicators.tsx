import { useEffect, useRef, useState } from 'react';
import { trustMetrics } from '../assets/data/stats';

export function TrustIndicators() {
  return (
    <section id="trust-indicators" className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            신뢰할 수 있는 <span className="text-cyan-400">파트너</span>
          </h2>
          <p className="text-gray-400 text-lg">숫자로 증명하는 ANYON의 실력</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface MetricCardProps {
  metric: typeof trustMetrics[0];
}

function MetricCard({ metric }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = metric.value / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCount(increment * currentStep);
      } else {
        setCount(metric.value);
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, metric.value]);

  const displayValue = count.toFixed(metric.value % 1 !== 0 ? 1 : 0);

  return (
    <div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 p-[1px] transition-all duration-300 hover:scale-105 ${
        metric.highlight ? 'ring-2 ring-green-500/50' : ''
      }`}
    >
      <div className="relative h-full rounded-2xl bg-gray-900 p-8">
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}></div>

        {/* Highlight Badge */}
        {metric.highlight && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full border border-green-500/30">
              주목
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <div className="flex items-baseline gap-1 mb-2">
            <span className={`text-4xl sm:text-5xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
              {displayValue}
            </span>
            <span className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
              {metric.suffix}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-white mb-1">{metric.label}</h3>
          <p className="text-sm text-gray-400">{metric.description}</p>
        </div>

        {/* Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500`}></div>
      </div>
    </div>
  );
}
