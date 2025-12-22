import { portfolioProjects } from '../assets/data/portfolio';

export function Portfolio() {
  return (
    <section id="portfolio" className="py-20 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            성공적인 프로젝트
          </h2>
          <p className="text-lg text-gray-400">
            다양한 산업에서 검증된 ANYON의 역량
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20 transition-all"
            >
              <div className="h-48 bg-gradient-to-br from-purple-900/20 to-transparent p-8 flex items-center justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-32 w-auto object-contain opacity-70 brightness-200"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
