import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-gray-400 py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <img src="/logo-anyon.png" alt="ANYON" className="h-10 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-gray-500 mb-4">
              지속 가능한 개발과 쉬운 유지보수를 제공하는
              <br />
              신뢰할 수 있는 IT 파트너입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#services" className="hover:text-purple-400 transition-colors">
                  서비스
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-purple-400 transition-colors">
                  문의하기
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>slit.amazing@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} ANYON. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
