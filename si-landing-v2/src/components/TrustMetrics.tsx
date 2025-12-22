import { trustMetrics } from '../assets/data/servicePackages';

export function TrustMetrics() {
  return (
    <section className="py-12 bg-[#0A0A0A] border-y border-white/10 overflow-hidden">
      <div className="relative">
        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 20s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>

        <div className="flex animate-scroll">
          {/* First set */}
          {trustMetrics.map((metric, idx) => (
            <div key={`first-${idx}`} className="flex-shrink-0 px-4 sm:px-8 md:px-12 text-center min-w-[180px] sm:min-w-[220px] md:min-w-[250px]">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                    metric.highlight
                      ? 'text-[#17DB4E]'
                      : 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent'
                  }`}
                >
                  {metric.value}{metric.suffix}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-[10px] sm:text-xs text-gray-400">{metric.sublabel}</div>
            </div>
          ))}
          {/* Second set for seamless loop */}
          {trustMetrics.map((metric, idx) => (
            <div key={`second-${idx}`} className="flex-shrink-0 px-4 sm:px-8 md:px-12 text-center min-w-[180px] sm:min-w-[220px] md:min-w-[250px]">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
                    metric.highlight
                      ? 'text-[#17DB4E]'
                      : 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent'
                  }`}
                >
                  {metric.value}{metric.suffix}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-white">{metric.label}</div>
              <div className="text-[10px] sm:text-xs text-gray-400">{metric.sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
