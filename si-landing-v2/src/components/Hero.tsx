import { ArrowRight, Zap, Clock, TrendingUp } from 'lucide-react';
import { BackgroundBeams } from './ui/background-beams';
import { TextReveal } from './ui/text-reveal';
import { FloatingCard } from './ui/floating-card';
import { ShinyText } from './ui/shiny-text';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative bg-[#0A0A0A] overflow-hidden min-h-screen flex items-center">
        {/* Background Beams Effect */}
        <BackgroundBeams className="opacity-30" />

        {/* Purple gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-600/10"></div>

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-[#A855F7] to-[#8B5CF6] rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.25, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          {/* Logo */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src="/logo-anyon.png"
              alt="ANYON"
              className="h-12 sm:h-14 w-auto mx-auto brightness-0 invert"
            />
          </motion.div>

          {/* Main Headline - 고정 메시지 */}
          <div className="text-center max-w-4xl mx-auto mb-12">
            <TextReveal>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight whitespace-pre-line">
                <ShinyText>
                  월 300만원 인건비 절감,{'\n'}AI가 반복 업무 70% 자동화
                </ShinyText>
              </h1>
            </TextReveal>

            <TextReveal delay={0.2}>
              <p className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                개발자 구하느라 3개월 낭비하지 마세요.{' '}
                <strong className="text-white">1주일이면 완성</strong>됩니다.
                <br />
                <strong className="text-purple-400">평생 AI 자동화 세팅법 자료 제공 (지속 업데이트)</strong>
              </p>
            </TextReveal>

            {/* CTA Button - 고정 */}
            <TextReveal delay={0.4}>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                회사/개인 자동화 가능 업무 무료 진단받기
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <p className="text-sm text-gray-500 mt-3">
                이번 달 선착순 5팀 한정 (5분 소요)
              </p>
            </TextReveal>
          </div>

          {/* 3 Core Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">
            <FloatingCard delay={0.1}>
              <MetricCard
                icon={<Clock className="w-8 h-8 text-[#8B5CF6]" />}
                title="평균 구현 속도"
                value="1주일"
                description="협의 1~3회, 구현 7일"
              />
            </FloatingCard>
            <FloatingCard delay={0.2}>
              <MetricCard
                icon={<Zap className="w-8 h-8 text-[#17DB4E]" />}
                title="업무 자동화율"
                value="70%"
                description="반복 업무 평균 70% 자동화"
              />
            </FloatingCard>
            <FloatingCard delay={0.3}>
              <MetricCard
                icon={<TrendingUp className="w-8 h-8 text-[#A855F7]" />}
                title="고객 재계약률"
                value="95%"
                description="AI 교육·유지보수 만족도 최상"
              />
            </FloatingCard>
          </div>
        </div>
      </section>
    </>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  description: string;
}

function MetricCard({ icon, title, value, description }: MetricCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-xl p-6 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all h-full">
      <div className="mb-4">{icon}</div>
      <div className="text-sm text-gray-400 mb-1">{title}</div>
      <div className="text-3xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent mb-1">
        {value}
      </div>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  );
}
