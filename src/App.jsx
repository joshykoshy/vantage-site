import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Manifesto from './pages/Manifesto';
import VantageVO1 from './pages/VantageVO1';
import Contact from './pages/Contact';
import Narrator from './pages/Narrator';
import NarratorPro from './pages/NarratorPro';
import { useEffect } from 'react';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="bg-vantage-black min-h-screen text-white selection:bg-vantage-silver selection:text-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manifesto" element={<Manifesto />} />
          <Route path="/vantage-vo1" element={<VantageVO1 />} />
          <Route path="/narrator" element={<Narrator />} />
          <Route path="/narrator-pro" element={<NarratorPro />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
