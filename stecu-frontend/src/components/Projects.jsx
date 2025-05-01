const Projects = () => {
  const projects = [
    {
      name: 'Renjana Furniture',
      image: '/RENJANA.png',
      overlayText: 'Finest Addition for Your Furniture Collection',
      cta: 'See Our Collections'
    },
    {
      name: 'Tryout Ilmu Komputer UGM',
      image: '/TOBK.png',
      overlayText: 'Uji kemampuan & temukan bidang yang cocok untukmu!',
      cta: 'Explore Tryout'
    }
  ];

  return (
    <section id='projects' className="bg-customGray text-white py-20 px-6">
      <div className="text-center text-4xl font-bold mb-4">
        Our Latest <span className="text-orange-500">Projects</span>
      </div>
      <div className="text-center text-lg mb-8">
        We have worked on a variety of projects, showcasing our expertise and commitment to excellence.
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-6 w-max mx-auto px-4">
          {projects.map((project, i) => (
            <div
              key={i}
              className="min-w-[300px] md:min-w-[500px] bg-customGrayDark rounded-2xl shadow-lg overflow-hidden relative transition-transform hover:scale-105 hover:shadow-2xl duration-300"
            >
              {/* Background Image */}
              <img
                src={project.image}
                alt={project.name}
                className="h-64 w-full object-cover"
              />

              {/* Radial Gradient Overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent,_rgba(0,0,0,0.6))] z-10" />

              {/* Glass Text Box */}
              <div className="absolute bottom-0 left-0 w-full z-20 px-4 pb-4">
                <div className="rounded-xl bg-white/10 backdrop-blur-md p-3">
                  <p className="font-bold text-lg text-white">{project.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
