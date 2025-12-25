import { useState } from 'react';
import { targetContents, type TargetType } from '../assets/data/targetContent';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { useMobile } from '../lib/device';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function TargetSelector() {
  const [selectedTarget, setSelectedTarget] = useState<TargetType>('startup');
  const mobile = useMobile();
  const prefersReducedMotion = useReducedMotion();
  const currentContent = targetContents.find((t) => t.id === selectedTarget)!;

  // 애니메이션 비활성화 조건: 모바일이거나 reduced motion 선호
  const disableAnimations = mobile || prefersReducedMotion;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section className="py-12 sm:py-20 bg-[#0A0A0A] mt-12 sm:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 타겟 선택 탭 */}
        <div className="mb-16">
          <p className="text-center text-gray-400 mb-6 text-lg font-semibold">
            당신의 비즈니스 스테이지를 선택하세요
          </p>
          {/* 모바일: 3-2 레이아웃, 데스크톱: 가로 배치 */}
          <div className="hidden sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
            {targetContents.map((target, idx) => (
              <motion.button
                key={target.id}
                onClick={() => setSelectedTarget(target.id)}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all ${
                  selectedTarget === target.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                whileHover={!disableAnimations ? { scale: 1.05 } : {}}
                whileTap={!disableAnimations ? { scale: 0.95 } : {}}
                initial={!disableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={!disableAnimations ? { delay: idx * 0.1 } : {}}
              >
                {target.icon && (
                  <img
                    src={target.icon}
                    alt={target.label}
                    className={`w-16 h-16 md:w-20 md:h-20 object-contain transition-all ${
                      selectedTarget === target.id
                        ? 'brightness-0'
                        : 'brightness-0 invert'
                    }`}
                  />
                )}
                <span className={`text-base ${selectedTarget === target.id ? 'text-black' : ''}`}>{target.label}</span>
              </motion.button>
            ))}
          </div>
          {/* 모바일 레이아웃 */}
          <div className="sm:hidden space-y-3">
            {/* 첫 번째 행: 3개 */}
            <div className="flex justify-center gap-2">
              {targetContents.slice(0, 3).map((target, idx) => (
                <motion.button
                  key={target.id}
                  onClick={() => setSelectedTarget(target.id)}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl font-semibold transition-all ${
                    selectedTarget === target.id
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-lg shadow-purple-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  whileHover={!disableAnimations ? { scale: 1.05 } : {}}
                  whileTap={!disableAnimations ? { scale: 0.95 } : {}}
                  initial={!disableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={!disableAnimations ? { delay: idx * 0.1 } : {}}
                >
                  {target.icon && (
                    <img
                      src={target.icon}
                      alt={target.label}
                      className={`w-12 h-12 object-contain transition-all ${
                        selectedTarget === target.id
                          ? 'brightness-0 invert'
                          : 'brightness-0 invert'
                      }`}
                    />
                  )}
                  <span className={`text-sm ${selectedTarget === target.id ? 'text-white' : ''}`}>{target.label}</span>
                </motion.button>
              ))}
            </div>
            {/* 두 번째 행: 2개 */}
            <div className="flex justify-center gap-2">
              {targetContents.slice(3, 5).map((target, idx) => (
                <motion.button
                  key={target.id}
                  onClick={() => setSelectedTarget(target.id)}
                  className={`flex flex-col items-center gap-2 px-4 py-3 rounded-2xl font-semibold transition-all ${
                    selectedTarget === target.id
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-lg shadow-purple-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                  }`}
                  whileHover={!disableAnimations ? { scale: 1.05 } : {}}
                  whileTap={!disableAnimations ? { scale: 0.95 } : {}}
                  initial={!disableAnimations ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={!disableAnimations ? { delay: (idx + 3) * 0.1 } : {}}
                >
                  {target.icon && (
                    <img
                      src={target.icon}
                      alt={target.label}
                      className={`w-12 h-12 object-contain transition-all ${
                        selectedTarget === target.id
                          ? 'brightness-0 invert'
                          : 'brightness-0 invert'
                      }`}
                    />
                  )}
                  <span className={`text-sm ${selectedTarget === target.id ? 'text-white' : ''}`}>{target.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* 선택된 타겟 콘텐츠 */}
        <motion.div
          key={selectedTarget}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          {/* 헤드라인 */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 whitespace-pre-line">
              {currentContent.heroTitle}
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto">
              {currentContent.heroSubtitle}
            </p>
          </div>

          {/* Pain Points & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Pain Points */}
            <div className="bg-[#1A1A1A] border border-red-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-red-400 mb-6">
                이런 고민 하고 계신가요?
              </h3>
              <ul className="space-y-4">
                {currentContent.painPoints.map((pain, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-red-400 text-xl flex-shrink-0 mt-1">•</span>
                    <span className="text-gray-300 text-sm">{pain}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-[#1A1A1A] border border-green-500/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-green-400 mb-6">
                ANYON이 해결해드립니다
              </h3>
              <ul className="space-y-4">
                {currentContent.solutions.map((solution, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-sm">{solution}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <motion.button
              onClick={() => scrollToSection('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentContent.cta}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
