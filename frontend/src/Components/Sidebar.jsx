import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLogged, toggleLogged }) => {
  
  const navigate = useNavigate();
  function goToLeave() {
    navigate('/');
    toggleSidebar();
    toggleLogged();
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('role');
  }
  function goToHistory() {
    navigate('/history');
    toggleSidebar();
  }
  function goToFavorites() {
    navigate('/favorites');
    toggleSidebar();
  }
  function goToProfile() {
    navigate('/profile');
    toggleSidebar();
  }
  function goToCreate() {
    navigate('/create');
    toggleSidebar();
  }
  function goToLogin() {
    navigate('/login');
    toggleSidebar();
  }
  function goToHomePage() {
    navigate('/');
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <nav>
          <ul className="sidebar-list">
            <li className="sidebar-item"><a onClick={goToHomePage}>Home</a></li>
            {isLogged ? (
              <>
                <li className="sidebar-item"><a onClick={goToProfile}>My profile</a></li>
                <li className="sidebar-item"><a onClick={goToFavorites}>My favorites</a></li>
                <li className="sidebar-item"><a onClick={goToHistory}>My history</a></li>
                <li className="sidebar-item"><a onClick={goToLeave}>Leave</a></li>
              </>
            ) : (
              <>
                <li className="sidebar-item"><a onClick={goToLogin}>Sign in</a></li>
                <li className="sidebar-item"><a onClick={goToCreate}>Sign up</a></li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Overlay para fechar clicando fora da sidebar */}
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Sidebar;
