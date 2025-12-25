import { Brain, Users, GraduationCap, Unlock } from 'lucide-react';
import { aiDifferentiators } from '../assets/data/targetContent';
import LetterGlitch from './ui/LetterGlitch';
import { useInView } from '../hooks/useInView';
import { useMobile } from '../lib/device';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function AIDifferentiators() {
  const { ref, isInView } = useInView({ rootMargin: '100px' });
  const mobile = useMobile();
  const prefersReducedMotion = useReducedMotion();

  // 애니메이션 비활성화 조건: 모바일이거나 reduced motion 선호
  const showAnimations = !mobile && !prefersReducedMotion;

  return (
    <section ref={ref} className="pt-12 pb-20 sm:pt-20 sm:pb-32 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* LetterGlitch Background - 뷰포트에 있고 모바일/reduced motion이 아닐 때만 활성화 */}
      {showAnimations && (
        <div className="absolute inset-0 w-full h-full opacity-35">
          <LetterGlitch
            glitchColors={['#8B5CF6', '#A855F7', '#6366F1']}
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            isActive={isInView}
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              AI 자동화에 미친 팀
            </span>
            과 일하세요
          </h2>
          <p className="text-base sm:text-lg text-gray-400">
            다른 개발사들이 AI를 "공부할 때", 저희는 이미 하루 16시간씩 실전에서 테스트하고 써봤습니다.
          </p>
        </div>

        {/* Main Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
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

        {/* Guarantee Box */}
        <div className="mt-8 sm:mt-12 bg-gradient-to-br from-[#8B5CF6]/10 to-[#A855F7]/10 border-2 border-purple-500/50 rounded-2xl p-4 sm:p-6 md:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">
            ANYON 고객 특별 혜택
          </h3>
          <ul className="text-gray-300 space-y-2 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            <li>✓ <strong className="text-yellow-400">귀사 맞춤 AI 자동화 세팅법 제공</strong> (지속 업데이트)</li>
            <li>✓ <strong className="text-yellow-400">전문팀 내부 AI 활용법 공유</strong> (N8N 워크플로우, 프롬프트 등)</li>
            <li>✓ <strong className="text-yellow-400">24시간 내 빠른 응답 보장</strong> (AI + 사람의 하이브리드)</li>
            <li>✓ <strong className="text-yellow-400">ANYON 시스템으로 독립 운영</strong> (외주 의존도 0%)</li>
          </ul>
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
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-4 sm:p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all group">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="flex-shrink-0 p-2 sm:p-3 bg-gradient-to-br from-purple-900/30 to-transparent rounded-lg group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{title}</h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-3">{description}</p>
          <div className="inline-block px-2 sm:px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
            <span className="text-purple-300 font-bold text-xs sm:text-sm">{metric}</span>
          </div>
        </div>
      </div>
    </div>
  );
}


