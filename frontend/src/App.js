
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Schedule from './pages/ScheduledEmails';
import PrivacyPolicy from './components/PrivacyPolicy';   
import TermsOfService from './components/TermsOfService'; 


const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />  
        <Route path="/terms" element={<TermsOfService />} />        
      </Routes>
    </>
  );
};

export default App;


