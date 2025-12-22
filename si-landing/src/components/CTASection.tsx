import { useState } from 'react';
import { Send, CheckCircle2, Mail, Building2, User, FileText } from 'lucide-react';

export function CTASection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    projectType: '',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally send the form data to your backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_70%)]"></div>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            프로젝트 성공의 <span className="text-cyan-400">첫 걸음</span>
          </h2>
          <p className="text-gray-400 text-lg mb-2">유지보수 걱정 없는 개발, ANYON과 함께하세요</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>평균 24시간 내 답변</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur-xl opacity-20"></div>
          <div className="relative bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 sm:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-2">문의가 접수되었습니다!</h3>
                <p className="text-gray-400">24시간 이내에 연락드리겠습니다.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Company Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      이름
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="홍길동"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      회사명
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                      placeholder="(주)회사명"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    이메일
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {/* Project Type */}
                <div>
                  <label htmlFor="projectType" className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    프로젝트 유형
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  >
                    <option value="">선택해주세요</option>
                    <option value="web">웹 애플리케이션</option>
                    <option value="mobile">모바일 앱</option>
                    <option value="backoffice">백오피스 시스템</option>
                    <option value="ai">AI/데이터 솔루션</option>
                    <option value="maintenance">유지보수 의뢰</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-2">
                    간단한 설명
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                    placeholder="프로젝트에 대해 간단히 설명해주세요..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold text-white shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span className="flex items-center justify-center gap-2">
                    무료 상담 신청하기
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>

                <p className="text-center text-sm text-gray-500">
                  개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
