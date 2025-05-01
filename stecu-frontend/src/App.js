import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  return (
    <div className="bg-black text-white font-jakarta">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
      {/* About, Services, Projects, Contact will go here next */}
    </div>
  );
}

export default App;
