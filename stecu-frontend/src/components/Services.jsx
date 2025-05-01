const Services = () => {
    const serviceItems = [
      {
        title: 'Data Science',
        icon: '/DSAI.png', // Update this path to match your icons
        desc: 'We build smart solutions using analytics, automation, and machine learning to turn data into action.'
      },
      {
        title: 'Mobile Apps',
        icon: '/MOBAPPS.png',
        desc: 'Mobile development from concept to deployment — intuitive UI, strong backend, cross-platform support.'
      },
      {
        title: 'Game Development',
        icon: '/GAMEDEV.png',
        desc: 'Game development from concept to deployment — intuitive UI, strong backend, cross-platform support.'
      },
      {
        title: 'UI/UX Design',
        icon: '/Group 20038.png',
        desc: 'We craft digital experiences that are intuitive, beautiful, and aligned with your audience’s needs.'
      }
    ];
  
    return (
      <section id='services' className="bg-customGray text-white py-20 px-6">
        <div className="max-w-[1440px] mx-auto space-y-16">
          {/* Top Section */}
          <div className="text-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                Our <span className="text-orange-500">Services</span>
              </h3>
              <p className="text-gray-300 text-sm md:text-base max-w-[600px] mx-auto mb-6">
                We offer a wide range of services to help you achieve your digital goals. From data science to mobile app development, we have the expertise to bring your ideas to life.
              </p>
            </div>
          </div>
  
          {/* Service Cards Section */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {serviceItems.map((item, index) => (
              <div key={index} className="bg-customGrayDark p-20 rounded-xl text-center hover:bg-customGrayLight transition-all shadow-lg">
                <img src={item.icon} alt={item.title} className="mx-auto mb-10 h-20 invert brightness-200" />
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-300 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default Services;
  