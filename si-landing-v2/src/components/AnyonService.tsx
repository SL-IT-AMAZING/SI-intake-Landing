import { Code2, Lightbulb, TrendingUp, Lock } from 'lucide-react';
import Hyperspeed from './ui/hyperspeed';
import { useState, useEffect } from 'react';
import { isMobile } from '../lib/device';

export function AnyonService() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <section className="py-12 pb-20 sm:py-20 sm:pb-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Hyperspeed Background - Desktop Only */}
      {mobile === false && (
        <div className="absolute inset-0">
          <Hyperspeed
            effectOptions={{
              distortion: 'turbulentDistortion',
              lanesPerRoad: 3,
              movingAwaySpeed: [30, 50],
              movingCloserSpeed: [-30, -50],
              colors: {
                roadColor: 0x080808,
                islandColor: 0x0a0a0a,
                background: 0x000000,
                shoulderLines: 0x131318,
                brokenLines: 0x131318,
                leftCars: [0x8B5CF6, 0xA855F7, 0xC084FC],
                rightCars: [0x17DB4E, 0x10B981, 0x34D399],
                sticks: 0x8B5CF6
              }
            }}
          />
        </div>
      )}
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            ANYON 시스템으로
            <br />
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              더 이상 개발사에 의존하지 마세요
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto">
            비개발자도 바이브코딩 가능한 혁신적인 플랫폼.
            <br />
            하루 16시간 AI만 연구하는 팀의 모든 노하우가 자동으로 적용됩니다.
          </p>
        </div>

        {/* Main Value Prop */}
        <div className="bg-gradient-to-br from-[#1A1A1A]/50 to-[#0A0A0A]/50 border border-purple-500/30 rounded-2xl p-4 sm:p-6 md:p-8 mb-8 sm:mb-12 shadow-lg shadow-purple-500/20 backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
                ANYON이 뭔가요?
              </h3>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                <strong className="text-purple-400">비개발자도 쉽게 바이브코딩을 할 수 있도록</strong> 가이드와 직관적인 UI/UX로 설계된 플랫폼입니다.
                <br /><br />
                전문팀이 매일 16시간 동안 AI 바이브코딩만 연구하며 쌓은 노하우, 스킬, 에이전트, 최신 트렌드가 <strong className="text-[#17DB4E]">자동으로 반영</strong>됩니다.
                <br /><br />
                Claude Code 스킬, N8N 워크플로우, 최신 오픈소스, 글로벌 고수들의 기법까지 — <strong className="text-purple-400">모든 지식이 축적된 살아있는 시스템</strong>입니다.
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                <div className="px-3 sm:px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm font-semibold">
                  ✓ 비개발자도 사용 가능
                </div>
                <div className="px-3 sm:px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-xs sm:text-sm font-semibold">
                  ✓ 16시간/일 노하우 자동 반영
                </div>
                <div className="px-3 sm:px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-xs sm:text-sm font-semibold">
                  ✓ 평생 자료 무료 제공 (지속 업데이트)
                </div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] rounded-xl p-4 sm:p-6 border border-white/10">
              <div className="space-y-4">
                <BenefitItem
                  icon={<Code2 className="w-6 h-6 text-purple-400" />}
                  text="Claude Code, N8N, RAG, Agent 등 최신 AI 기술 올인원"
                />
                <BenefitItem
                  icon={<Lightbulb className="w-6 h-6 text-yellow-400" />}
                  text="최신 트렌드 바이브코딩 기법 자동 통합"
                />
                <BenefitItem
                  icon={<TrendingUp className="w-6 h-6 text-green-400" />}
                  text="전문팀도 매일 사용 → 지속적으로 진화하는 시스템"
                />
                <BenefitItem
                  icon={<Lock className="w-6 h-6 text-blue-400" />}
                  text="귀사 전용 독립 운영 환경 제공 (외주 의존 0%)"
                />
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 px-4">
            <strong className="text-white">지금 도입하면 귀사 맞춤 AI 자동화 세팅법 + 최신 자료 평생 무료 제공 (지속 업데이트)</strong>
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3 sm:px-10 sm:py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold text-base sm:text-lg rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            ANYON 시스템 도입 문의하기 →
          </button>
        </div>
      </div>
    </section>
  );
}

interface BenefitItemProps {
  icon: React.ReactNode;
  text: string;
}

function BenefitItem({ icon, text }: BenefitItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 mt-1">{icon}</div>
      <p className="text-gray-300 text-sm leading-relaxed">{text}</p>
    </div>
  );
}

