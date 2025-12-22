import { ArrowRight } from 'lucide-react';
import { BackgroundBeams } from './ui/background-beams';
import { TextReveal } from './ui/text-reveal';
import { ShinyText } from './ui/shiny-text';
import { motion } from 'framer-motion';

export function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <section className="relative bg-[#0A0A0A] overflow-hidden py-20 flex items-center">
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

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
        </div>
      </section>
    </>
  );
}
