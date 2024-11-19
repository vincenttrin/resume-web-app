import React from 'react';
import logo from './logo.svg';
import { ProfessionalExperience } from './pages/resume/Resume.js';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Resume from './pages/resume/Resume.js';
import ElectricalLines from './pages/electricalLines/ElectricalLines.js';
import NoPage from './pages/NoPage.js';

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Resume />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/electrical-lines" element={<ElectricalLines />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}