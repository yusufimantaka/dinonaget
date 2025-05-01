const About = () => {
    return (
      <section id='about' className="bg-customGray text-white py-20 px-6">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column */}
          <div>
            <h2 className="text-white text-sm font-semibold mb-2">
            <span className="text-orange-500">About</span> Us
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              The <span className="text-orange-500">biggest</span> IT student organization in UGM.
            </h3>
            <p className="text-gray-300 mb-8">
              We’re more than just an organization — we’re a dynamic space for members to innovate, collaborate, and make real impact.
            </p>
            <div className="flex gap-8">
              <div>
                <p className="text-3xl font-bold text-orange-500">100++</p>
                <p className="text-sm text-gray-400">Projects</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-500">100%</p>
                <p className="text-sm text-gray-400">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-orange-500">10Y</p>
                <p className="text-sm text-gray-400">Experience</p>
              </div>
            </div>
          </div>
  
          {/* Right Column */}
          <div className="h-64 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
            <img src="/OTI.png" alt="OmahTI Logo" className="h-full w-full object-cover rounded-lg" />
          </div>
        </div>
      </section>
    );
  };
  
  export default About;
  