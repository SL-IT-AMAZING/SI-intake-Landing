import { Wrench, Shield, MessageSquare } from 'lucide-react';
import { whyAnyon } from '../assets/data/servicePackages';

const iconMap = {
  Wrench,
  Shield,
  MessageSquare,
};

export function WhyAnyon() {
  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            왜 ANYON인가?
          </h2>
          <p className="text-lg text-gray-400">
            단순한 개발을 넘어, 장기적으로 함께 성장하는 파트너
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whyAnyon.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <div
                key={item.id}
                className="bg-[#1A1A1A] rounded-xl p-8 hover:shadow-lg hover:shadow-purple-500/20 transition-all border border-white/10 hover:border-purple-500/50"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-[#8B5CF6]/20 to-[#A855F7]/20 rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#A855F7]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
