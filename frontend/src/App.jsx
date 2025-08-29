import { Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreatePage from './pages/CreatePage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';
import './App.css'
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css' //npm install bootstrap

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [isLogged, setIsLogged] = useState(false);
  const toggleLogged = () => setIsLogged(prev => !prev);
  
  return (
    <div>
      <Header className="header" toggleSidebar={toggleSidebar} isLogged={isLogged} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} isLogged={isLogged} toggleLogged={toggleLogged} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage toggleLogged={toggleLogged} />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}

export default App
