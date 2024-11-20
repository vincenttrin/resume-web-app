import React from 'react';
// import { ProfessionalExperience } from './pages/resume/Resume.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resume from './pages/resume/Resume.js';
import ElectricalLines from './pages/electricalLines/ElectricalLines.js';
import NoPage from './pages/NoPage.js';
import GridGame  from './pages/gridGame/gridGame.js';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Resume />} />
          <Route path="/resume-web-app" element={<Resume />} />
          <Route path="/electrical-lines" element={<ElectricalLines />} />
          <Route path="/grid-game" element={<GridGame />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}