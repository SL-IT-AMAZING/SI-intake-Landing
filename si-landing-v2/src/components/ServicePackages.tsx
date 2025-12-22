import { Check, TrendingUp } from 'lucide-react';
import { servicePackages } from '../assets/data/servicePackages';
import { TextReveal } from './ui/text-reveal';

export function ServicePackages() {
  return (
    <section id="services" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TextReveal>
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full text-white text-sm font-semibold mb-4">
              우리가 하는 일
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              당신의 비즈니스에 맞는
              <br />
              <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
                AI 자동화 솔루션
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              협의 미팅 1~3회만 거치면 바로 개발 시작.
              <br />
              평균 구현 기간 1주일, 빠른 ROI 보장.
            </p>
          </div>
        </TextReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicePackages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </div>

        {/* 문의 유도 메시지 */}
        <div className="mt-12 text-center">
          <p className="text-base text-gray-400 mb-4">
            <strong className="text-white">지금 문의하시면</strong> 귀사 맞춤 AI 자동화 세팅법 설계 + 전문팀 내부 자료 평생 무료 제공 (지속 업데이트)
          </p>
          <p className="text-base text-gray-500">
            협의 미팅 1~3회만 거치면 바로 개발 시작. 평균 7일이면 완성됩니다.
          </p>
        </div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  package: typeof servicePackages[0];
}

function PackageCard({ package: pkg }: PackageCardProps) {
  return (
    <div
      className={`relative bg-[#1A1A1A] rounded-2xl p-8 transition-all ${pkg.popular
          ? 'border-2 border-purple-500 shadow-lg shadow-purple-500/20 scale-105'
          : 'border border-white/10 hover:border-purple-500/50 hover:scale-105'
        }`}
    >
      {/* Popular Badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
            인기
          </span>
        </div>
      )}

      {/* Package Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{pkg.name}</h3>
        <p className="text-sm text-purple-400 mb-4 font-semibold">{pkg.subtitle}</p>
        <p className="text-gray-300 mb-4 min-h-[48px]">{pkg.description}</p>
      </div>

      {/* ROI Badge */}
      <div className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2 justify-center">
        <TrendingUp className="w-4 h-4 text-green-400" />
        <span className="text-green-400 font-bold text-sm">{pkg.roi}</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8">
        {pkg.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <Check className="w-5 h-5 text-[#17DB4E] flex-shrink-0 mt-0.5" />
            <span className="text-gray-300 text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA Button */}
      <button
        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        className={`w-full py-4 rounded-full font-bold transition-all transform hover:scale-105 ${pkg.popular
            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white hover:shadow-lg hover:shadow-purple-500/50'
            : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
          }`}
      >
        {pkg.cta} →
      </button>
    </div>
  );
}
