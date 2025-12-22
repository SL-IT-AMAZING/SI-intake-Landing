import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: '정말 1주일이면 되나요?',
    answer: '협의 1~3회 완료 후 평균 7일입니다. 프로젝트 규모에 따라 최단 3일 기록도 있습니다. AI 바이브코딩으로 일반 개발 대비 3배 빠른 속도를 자랑합니다.',
  },
  {
    question: '비개발자도 유지보수 가능한가요?',
    answer: 'ANYON 시스템은 클릭 몇 번으로 수정 가능합니다. 비개발자도 쉽게 이해할 수 있도록 직관적인 UI/UX로 설계되었으며, 평생 무료 교육 영상과 매주 업데이트되는 가이드를 제공합니다.',
  },
  {
    question: '다른 외주사랑 뭐가 다른가요?',
    answer: '전문팀이 매일 16시간씩 직접 쓰는 AI 도구를 그대로 드립니다. 외주사는 납품 후 끝이지만, ANYON은 평생 맞춤 AI 자동화 세팅법 + 최신 자료 업데이트를 제공합니다. 개발 완료 후에도 계속 성장할 수 있습니다.',
  },
  {
    question: '가격은 어떻게 되나요?',
    answer: '프로젝트별 맞춤 견적으로 불필요한 비용 없이 딱 필요한 만큼만 투자하실 수 있습니다. 무료 상담 시 귀사에 맞는 정확한 견적과 ROI 분석을 제공해드립니다.',
  },
  {
    question: '어떤 기술 스택을 사용하나요?',
    answer: 'Claude Code, N8N, RAG, AI Agent, LangChain, OpenAI API, Vector DB 등 최신 AI 기술을 실전 투입합니다. 전문팀이 매일 테스트하고 검증한 기술만 사용하므로 안정성이 보장됩니다.',
  },
  {
    question: '이번 달 선착순 5팀이 진짜인가요?',
    answer: '네, 맞습니다. 전문팀은 품질을 위해 동시에 5개 프로젝트만 진행합니다. 이번 달 슬롯이 차면 다음 달로 대기해야 하므로, 빠른 시작을 원하신다면 지금 바로 문의해주세요.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full text-white text-sm font-semibold mb-4">
            💬 자주 묻는 질문
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            궁금한 점이 있으신가요?
          </h2>
          <p className="text-lg text-gray-400">
            고객님들이 가장 많이 물어보시는 질문들을 모았습니다
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden hover:border-purple-500/30 transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-purple-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6">
                  <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            더 궁금한 점이 있으신가요?
          </p>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
          >
            1:1 무료 상담 받기 →
          </button>
        </div>
      </div>
    </section>
  );
}
