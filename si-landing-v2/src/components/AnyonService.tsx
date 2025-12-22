import { Rocket, Code2, Lightbulb, TrendingUp, Lock, Zap } from 'lucide-react';

export function AnyonService() {
  return (
    <section className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            ANYON 시스템으로
            <br />
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              더 이상 개발사에 의존하지 마세요
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            비개발자도 바이브코딩 가능한 혁신적인 플랫폼.
            <br />
            하루 16시간 AI만 연구하는 팀의 모든 노하우가 자동으로 적용됩니다.
          </p>
        </div>

        {/* Main Value Prop */}
        <div className="bg-gradient-to-br from-[#1A1A1A] to-[#0A0A0A] border border-purple-500/30 rounded-2xl p-8 mb-12 shadow-lg shadow-purple-500/20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                ANYON이 뭔가요?
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                <strong className="text-purple-400">비개발자도 쉽게 바이브코딩을 할 수 있도록</strong> 가이드와 직관적인 UI/UX로 설계된 플랫폼입니다.
                <br /><br />
                전문팀이 매일 16시간 동안 AI 바이브코딩만 연구하며 쌓은 노하우, 스킬, 에이전트, 최신 트렌드가 <strong className="text-[#17DB4E]">자동으로 반영</strong>됩니다.
                <br /><br />
                Claude Code 스킬, N8N 워크플로우, 최신 오픈소스, 글로벌 고수들의 기법까지 — <strong className="text-purple-400">모든 지식이 축적된 살아있는 시스템</strong>입니다.
              </p>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
                  ✓ 비개발자도 사용 가능
                </div>
                <div className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm font-semibold">
                  ✓ 16시간/일 노하우 자동 반영
                </div>
                <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold">
                  ✓ 평생 자료 무료 제공 (지속 업데이트)
                </div>
              </div>
            </div>
            <div className="bg-[#0A0A0A] rounded-xl p-6 border border-white/10">
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

        {/* 3 Key Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<Rocket className="w-10 h-10 text-purple-400" />}
            title="개발 속도 3배 향상"
            description="바이브코딩 자동화로 1주일이면 충분. MVP부터 복잡한 자동화 시스템까지."
            highlight="평균 구현 기간 1주일"
          />
          <FeatureCard
            icon={<Zap className="w-10 h-10 text-green-400" />}
            title="업무 효율 극대화"
            description="반복 업무 70% 자동화 달성. 팀원들은 핵심 업무에만 집중 가능."
            highlight="월 인건비 300만원 절감"
          />
          <FeatureCard
            icon={<TrendingUp className="w-10 h-10 text-blue-400" />}
            title="매출 성장 가속화"
            description="시간과 비용 절감으로 비즈니스 확장에 집중. 실제 고객사 매출 평균 200% 증가."
            highlight="ROI 3개월 이내 회수"
          />
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-6">
            <strong className="text-white">지금 도입하면 귀사 맞춤 AI 자동화 세팅법 + 최신 자료 평생 무료 제공 (지속 업데이트)</strong>
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
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

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}

function FeatureCard({ icon, title, description, highlight }: FeatureCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="pt-4 border-t border-white/10">
        <span className="text-purple-400 font-bold text-sm">{highlight}</span>
      </div>
    </div>
  );
}
