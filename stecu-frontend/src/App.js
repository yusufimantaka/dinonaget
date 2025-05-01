import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ClientRegistrationForm from './pages/ClientRegistrationForm'; 
import ProjectIntakeForm from './pages/ProjectIntakeForm';
import Estimation from './pages/Estimation';

function LandingPage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="bg-black text-white font-jakarta">
        <Navbar /> {/* Navbar now always rendered */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<ClientRegistrationForm />} />
          <Route path="/project" element={<ProjectIntakeForm />} />
          <Route path="/estimate" element={<Estimation />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
