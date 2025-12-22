import { useState } from 'react';
import { targetContents, type TargetType } from '../assets/data/targetContent';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

export function TargetSelector() {
  const [selectedTarget, setSelectedTarget] = useState<TargetType>('startup');
  const currentContent = targetContents.find((t) => t.id === selectedTarget)!;

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 bg-[#0A0A0A] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 타겟 선택 탭 */}
        <div className="mb-16">
          <p className="text-center text-gray-400 mb-6 text-lg font-semibold">
            당신의 비즈니스 스테이지를 선택하세요
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {targetContents.map((target, idx) => (
              <motion.button
                key={target.id}
                onClick={() => setSelectedTarget(target.id)}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-2xl font-semibold transition-all ${
                  selectedTarget === target.id
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] shadow-lg shadow-purple-500/50'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {target.icon && (
                  <img
                    src={target.icon}
                    alt={target.label}
                    className={`w-20 h-20 object-contain transition-all ${
                      selectedTarget === target.id
                        ? 'brightness-0'
                        : 'brightness-0 invert'
                    }`}
                  />
                )}
                <span className={selectedTarget === target.id ? 'text-black' : ''}>{target.label}</span>
              </motion.button>
            ))}
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
