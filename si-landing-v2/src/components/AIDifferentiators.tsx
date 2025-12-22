import { Brain, Users, GraduationCap, Unlock } from 'lucide-react';
import { aiDifferentiators } from '../assets/data/targetContent';

export function AIDifferentiators() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full text-white text-sm font-semibold mb-4">
            왜 ANYON인가?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              AI 자동화에 미친 팀
            </span>
            과 일하세요
          </h2>
          <p className="text-lg text-gray-400">
            다른 개발사들이 AI를 "공부할 때", 저희는 이미 하루 16시간씩 실전에서 테스트하고 써봤습니다.
          </p>
        </div>

        {/* Main Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {aiDifferentiators.map((item, idx) => {
            const icons = [
              <Brain className="w-10 h-10 text-purple-400" />,
              <Users className="w-10 h-10 text-green-400" />,
              <GraduationCap className="w-10 h-10 text-blue-400" />,
              <Unlock className="w-10 h-10 text-yellow-400" />,
            ];
            return (
              <DifferentiatorCard
                key={idx}
                icon={icons[idx]}
                title={item.title}
                description={item.description}
                metric={item.metric}
              />
            );
          })}
        </div>

        {/* Tech Stack Showcase */}
        <div className="bg-[#1A1A1A] border border-purple-500/30 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            우리가 매일 사용하는 AI 기술 스택
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TechBadge name="Claude Code" color="purple" />
            <TechBadge name="N8N" color="green" />
            <TechBadge name="RAG 시스템" color="blue" />
            <TechBadge name="AI Agent" color="purple" />
            <TechBadge name="LangChain" color="green" />
            <TechBadge name="OpenAI API" color="blue" />
            <TechBadge name="Vector DB" color="purple" />
            <TechBadge name="Automation" color="green" />
          </div>
        </div>

        {/* Guarantee Box */}
        <div className="mt-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A855F7]/10 border-2 border-purple-500/50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">
            ANYON 고객 특별 혜택
          </h3>
          <ul className="text-gray-300 space-y-2 max-w-2xl mx-auto mb-6">
            <li>✓ <strong className="text-purple-400">귀사 맞춤 AI 자동화 세팅법 제공</strong> (지속 업데이트)</li>
            <li>✓ <strong className="text-green-400">전문팀 내부 AI 활용법 공유</strong> (N8N 워크플로우, 프롬프트 등)</li>
            <li>✓ <strong className="text-blue-400">24시간 내 빠른 응답 보장</strong> (AI + 사람의 하이브리드)</li>
            <li>✓ <strong className="text-yellow-400">ANYON 시스템으로 독립 운영</strong> (외주 의존도 0%)</li>
          </ul>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-10 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold text-lg rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            지금 바로 무료 상담 받기 →
          </button>
        </div>
      </div>
    </section>
  );
}

interface DifferentiatorCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
}

function DifferentiatorCard({ icon, title, description, metric }: DifferentiatorCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-purple-900/30 to-transparent rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-sm mb-3">{description}</p>
          <div className="inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-300 font-bold text-sm">{metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TechBadgeProps {
  name: string;
  color: 'purple' | 'green' | 'blue';
}

function TechBadge({ name, color }: TechBadgeProps) {
  const colors = {
    purple: 'bg-purple-500/20 border-purple-500/30 text-purple-300',
    green: 'bg-green-500/20 border-green-500/30 text-green-300',
    blue: 'bg-blue-500/20 border-blue-500/30 text-blue-300',
  };

  return (
    <div className={`px-4 py-3 ${colors[color]} border rounded-lg text-center font-semibold text-sm hover:scale-105 transition-transform`}>
      {name}
    </div>
  );
}

