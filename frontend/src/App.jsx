import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Tela1 from './pages/Tela1';
import Tela2 from './pages/Tela2';
import Tela3 from './pages/Tela3';
import './App.css'
import Header from './Components/Header';
import Footer from './Components/Footer';
import Sidebar from './Components/Sidebar';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [isLogged, setIsLogged] = useState(false);
  const toggleLogged = () => setIsLogged(prev => !prev);
  
  return (
    <div>
      <Header className="header" toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLogged={isLogged} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tela1" element={<Tela1 />} />
        <Route path="/tela2" element={<Tela2 />} />
        <Route path="/tela3" element={<Tela3 />} />
      </Routes>
      <Footer className='footer'/>
    </div>
  )
}

export default App
