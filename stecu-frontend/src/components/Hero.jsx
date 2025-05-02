import { useNavigate } from "react-router-dom"; 

const Hero = () => {
  const navigate = useNavigate(); 

  return (
    <section className="relative h-[852px] text-white overflow-hidden">
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/Video Profil_OmahTI.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-customGray/40 to-customGray z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-[1440px] h-full mx-auto flex items-center px-10">
        <div className="text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Choose the Best, Because Your Business Deserves It
          </h1>
          <p className="mt-4 md:text-2xl text-gray-300">
            Join an experience that grows your voice and sharpens your mind.
          </p>
          <div className="flex gap-4 mt-6">
            <button
              className="bg-white text-black px-5 py-2 rounded shadow"
              onClick={() => navigate("/register")}
            >
              See Estimated Price
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
