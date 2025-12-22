import { useState } from 'react';
import { Send, CheckCircle2, Zap, Clock, Gift } from 'lucide-react';
import FloatingLines from './ui/FloatingLines';

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          projectType: formData.projectType,
          message: formData.message,
          subject: `[ANYON 문의] ${formData.name} - ${formData.projectType}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          company: '',
          email: '',
          phone: '',
          projectType: '',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('문의 전송에 실패했습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('문의 전송 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-12 sm:py-20 bg-gradient-to-b from-[#0A0A0A] to-[#1A1A1A] relative overflow-hidden">
      {/* FloatingLines Background */}
      <div className="absolute inset-0 w-full h-full opacity-40">
        <FloatingLines
          linesGradient={['#8B5CF6', '#A855F7', '#6366F1']}
          enabledWaves={['middle', 'bottom']}
          lineCount={[12, 15]}
          lineDistance={[6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          mixBlendMode="screen"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-full text-white text-xs sm:text-sm font-semibold mb-4">
            이번 달 선착순 5팀 한정
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text text-transparent">
              1주일 안에 결과
            </span>
            를 만나보세요
          </h2>
          <p className="text-base sm:text-lg text-gray-400 mb-4 sm:mb-6">
            무료 진단으로 우리 회사 자동화 가능 업무를 확인하세요.
            <br />
            <strong className="text-white">평균 24시간 내 답변, 협의 1~3회면 개발 시작</strong>
          </p>

          {/* Benefits 강조 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <BenefitBadge
              icon={<Clock className="w-5 h-5 text-purple-400" />}
              text="24시간 내 답변"
            />
            <BenefitBadge
              icon={<Zap className="w-5 h-5 text-green-400" />}
              text="평균 구현 1주일"
            />
            <BenefitBadge
              icon={<Gift className="w-5 h-5 text-yellow-400" />}
              text="평생 AI 자료 무료"
            />
          </div>
        </div>

        {/* Form */}
        <div className="bg-[#1A1A1A] rounded-2xl p-4 sm:p-6 md:p-8 border-2 border-purple-500/30 shadow-lg shadow-purple-500/20">
          {submitted ? (
            <div className="text-center py-8 sm:py-12">
              <div className="inline-block p-3 sm:p-4 bg-green-500/20 rounded-full mb-4">
                <CheckCircle2 className="w-12 h-12 sm:w-16 sm:h-16 text-[#17DB4E]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                ✓ 문의가 접수되었습니다!
              </h3>
              <p className="text-sm sm:text-base text-gray-400 mb-6">
                담당자가 <strong className="text-white">24시간 내</strong>에 연락드립니다.
                <br />
                그동안 ANYON의 성공 사례를 확인해보세요!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2 bg-white/5 text-white rounded-full hover:bg-white/10 transition-all"
              >
                다른 문의하기
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                    이름 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                    placeholder="홍길동"
                  />
                </div>

                <div>
                  <label htmlFor="company" className="block text-sm font-semibold text-white mb-2">
                    회사명
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                    placeholder="(주)ANYON"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                    이메일 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-white mb-2">
                    연락처
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-gray-500"
                    placeholder="010-1234-5678"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold text-white mb-2">
                  프로젝트 유형 <span className="text-red-400">*</span>
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  required
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="" className="bg-[#1A1A1A]">선택해주세요</option>
                  <option value="mvp" className="bg-[#1A1A1A]">MVP 개발 (1주일 출시)</option>
                  <option value="automation" className="bg-[#1A1A1A]">업무 자동화 (월 300만원 절감)</option>
                  <option value="poc" className="bg-[#1A1A1A]">AI PoC (3일 완성)</option>
                  <option value="custom" className="bg-[#1A1A1A]">맞춤형 솔루션 (상담 필요)</option>
                  <option value="consulting" className="bg-[#1A1A1A]">AI 자동화 컨설팅</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                  프로젝트 설명 <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none placeholder-gray-500"
                  placeholder="예: 매일 엑셀 수작업으로 데이터 정리하는데 3시간 걸립니다. 이걸 자동화하고 싶어요."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold text-base sm:text-lg rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all transform hover:scale-105"
              >
                우리 회사 자동화 가능 업무 무료 진단받기
                <Send className="w-5 h-5" />
              </button>

              <p className="text-center text-sm sm:text-base text-gray-400 mt-4">
                문의 시 <strong className="text-purple-400">귀사 맞춤 AI 자동화 세팅법 설계 + 전문팀 내부 자료</strong> 평생 무료 (지속 업데이트)
                <br />
                <span className="text-xs sm:text-sm text-gray-500">5분만 투자하면 월 300만원 절감 가능한지 알 수 있습니다</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

interface BenefitBadgeProps {
  icon: React.ReactNode;
  text: string;
}

function BenefitBadge({ icon, text }: BenefitBadgeProps) {
  return (
    <div className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-white/5 border border-white/10 rounded-full">
      {icon}
      <span className="text-xs sm:text-sm font-semibold text-gray-300">{text}</span>
    </div>
  );
}
