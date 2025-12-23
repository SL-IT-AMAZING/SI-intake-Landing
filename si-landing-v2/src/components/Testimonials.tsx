import { Star, Quote } from 'lucide-react';
import LightPillar from './ui/LightPillar';
import { useState, useEffect } from 'react';
import { isMobile } from '../lib/device';

const testimonials = [
  {
    name: '김준호',
    role: '스타트업 대표',
    company: 'O2O 플랫폼',
    image: '👨‍💼',
    rating: 5,
    text: '개발자 채용하느라 3개월 낭비할 뻔했는데, ANYON 덕분에 1주일 만에 MVP 완성했습니다. 시리즈A 투자 받기 전날까지 개발해줘서 정말 감사해요. 진짜 1주일 걸렸습니다.',
    highlight: '1주일 만에 MVP 완성',
  },
  {
    name: '이서연',
    role: '운영팀 팀장',
    company: '마케팅 에이전시',
    image: '👩‍💼',
    rating: 5,
    text: '매일 클라이언트 리포트 만들다가 새벽 2시였는데, AI 자동화 도입 후 10분이면 끝납니다. 업무시간 80% 단축되고 클라이언트 3배 늘렸어요. 평생 AI 교육 무료라서 계속 업그레이드할 수 있어요.',
    highlight: '업무시간 80% 단축',
  },
  {
    name: '박민수',
    role: 'IT 담당',
    company: '제조업체',
    image: '👨‍💻',
    rating: 5,
    text: 'PoC 보고서만 3개월 작성하다가 ANYON 만나서 3일 만에 실제 작동하는 시스템 받았습니다. 임원진 설득하는데 딱 좋았어요. 지금은 전사 AI 자동화 플랫폼으로 확장 중입니다.',
    highlight: '3일 만에 PoC 완성',
  },
];

export function Testimonials() {
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setMobile(isMobile());
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* LightPillar Background - Desktop Only */}
      {mobile === false && (
        <div className="absolute inset-0 w-full h-full">
          <LightPillar
            topColor="#8B5CF6"
            bottomColor="#A855F7"
            intensity={0.3}
            rotationSpeed={0.2}
            glowAmount={0.003}
            pillarWidth={4.0}
            pillarHeight={0.3}
            noiseIntensity={0.3}
            pillarRotation={15}
            interactive={false}
            mixBlendMode="screen"
          />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              실제 고객들의 솔직한 이야기
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            ANYON과 함께한 고객사들의 성공 스토리를 확인하세요
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <StatCard number="95%" label="고객 재계약률" sublabel="만족도 최상" />
          <StatCard number="1주일" label="평균 구현 속도" sublabel="초고속 개발" />
          <StatCard number="300만원" label="월 평균 절감액" sublabel="ROI 3개월 회수" />
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/20 transition-all relative">
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 opacity-10">
        <Quote className="w-16 h-16 text-purple-400" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>

      {/* Highlight */}
      <div className="mb-4 inline-block px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full">
        <span className="text-purple-300 font-bold text-sm">{testimonial.highlight}</span>
      </div>

      {/* Text */}
      <p className="text-gray-300 mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-6 border-t border-white/10">
        <div className="text-4xl">{testimonial.image}</div>
        <div>
          <div className="font-semibold text-white">{testimonial.name}</div>
          <div className="text-sm text-gray-400">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  number: string;
  label: string;
  sublabel: string;
}

function StatCard({ number, label, sublabel }: StatCardProps) {
  return (
    <div className="text-center">
      <div className="text-4xl font-bold bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-white font-semibold mb-1">{label}</div>
      <div className="text-gray-500 text-sm">{sublabel}</div>
    </div>
  );
}
