import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [active, setActive] = useState('about');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'services', 'projects'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActive(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setActive(id);
  };

  return (
    <div className="w-full flex justify-center mt-4 fixed top-0 z-50">
      <nav className="flex items-center justify-between w-[90%] px-6 py-3 bg-customGray text-white rounded-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="OmahTI" className="h-8 w-8 object-contain" />
          <span className="font-semibold text-lg">OmahTI</span>
        </div>
        <div className="flex items-center gap-6 text-sm">
          {['about', 'services', 'projects'].map((section) => (
            <button
              key={section}
              onClick={() => handleNavClick(section)}
              className={`capitalize hover:underline transition-all ${
                active === section ? 'font-bold' : 'font-medium'
              }`}
            >
              {section}
            </button>
          ))}
          <button
            onClick={() => navigate('/register')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
          >
            Register as Client
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
