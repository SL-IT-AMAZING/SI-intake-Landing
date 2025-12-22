import { Wrench, RefreshCw, Users } from 'lucide-react';
import { coreStrengths } from '../assets/data/stats';

const iconMap = {
  wrench: Wrench,
  'refresh-cw': RefreshCw,
  users: Users,
};

export function CoreStrengths() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.1),transparent_50%)]"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            왜 <span className="text-cyan-400">ANYON</span>인가?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            단순한 개발을 넘어, 장기적으로 함께 성장하는 파트너
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreStrengths.map((strength, index) => (
            <StrengthCard key={strength.id} strength={strength} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface StrengthCardProps {
  strength: typeof coreStrengths[0];
  index: number;
}

function StrengthCard({ strength, index }: StrengthCardProps) {
  const Icon = iconMap[strength.icon as keyof typeof iconMap];

  return (
    <div
      className="group relative h-full"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Glass Morphism Card */}
      <div className="relative h-full rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-gray-700/50 p-8 transition-all duration-500 hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105">
        {/* Icon Container */}
        <div className="mb-6 relative">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full group-hover:bg-cyan-500/30 transition-all duration-500"></div>
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
            <Icon className="w-10 h-10 text-cyan-400" />
          </div>
        </div>

        {/* Image Preview */}
        <div className="mb-6 overflow-hidden rounded-xl border border-gray-700/50">
          <img
            src={strength.image}
            alt={strength.title}
            className="w-full h-32 object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-500"
          />
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{strength.title}</h3>
          <p className="text-sm text-cyan-400 mb-4 font-medium">{strength.subtitle}</p>
          <p className="text-gray-400 mb-6 leading-relaxed">{strength.description}</p>

          {/* Metrics */}
          <div className="space-y-3 pt-6 border-t border-gray-700/50">
            {strength.metrics.map((metric, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-sm text-gray-400">{metric.label}</span>
                <span className="text-sm font-semibold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full">
                  {metric.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 via-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/20 group-hover:via-blue-500/20 group-hover:to-cyan-500/20 transition-all duration-500 pointer-events-none"></div>
      </div>

      {/* Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500 -z-10"></div>
    </div>
  );
}
