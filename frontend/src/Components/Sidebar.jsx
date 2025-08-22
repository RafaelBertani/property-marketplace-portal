import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLogged }) => {
  
  const navigate = useNavigate();
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
                <li className="sidebar-item"><a href="/profile">My profile</a></li>
                <li className="sidebar-item"><a href="/favorites">My favorites</a></li>
                <li className="sidebar-item"><a href="/history">My history</a></li>
                <li className="sidebar-item"><a href="/leave">Leave</a></li>
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
