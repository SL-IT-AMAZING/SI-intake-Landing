import { Github, Mail, Phone, MapPin, ChevronUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-slate-950 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <img
              src="/logo-anyon.png"
              alt="ANYON Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-4 max-w-md">
              지속 가능한 개발과 쉬운 유지보수를 제공하는 SI 전문 기업입니다.
              <br />
              고객의 성공이 곧 저희의 성공입니다.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="mailto:contact@anyon.dev"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/anyon"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#trust-indicators"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  회사 소개
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  포트폴리오
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                >
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>02-1234-5678</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>contact@anyon.dev</span>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-cyan-400" />
                <span>
                  서울특별시 강남구
                  <br />
                  테헤란로 123
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ANYON. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-cyan-400 transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              이용약관
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/60 transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Scroll to top"
      >
        <ChevronUp className="w-6 h-6 text-white group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
}
