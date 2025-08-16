import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Sidebar.css';

const Sidebar = ({ isOpen, toggleSidebar, isLogged }) => {
    
  return (
    <>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar} aria-label="Fechar menu">&times;</button>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            {isLogged ? (
              <>
                <li><a href="/profile">My profile</a></li>
                <li><a href="/favorites">My favorites</a></li>
                <li><a href="/history">My history</a></li>
                <li><a href="/leave">Leave</a></li>
              </>
            ) : (
              <>
                <li><a href="/signin">Sign in</a></li>
                <li><a href="/signup">Sign up</a></li>
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
