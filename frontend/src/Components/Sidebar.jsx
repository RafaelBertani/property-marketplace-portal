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
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('profile_pic');
    localStorage.removeItem('role');
  }
  function goToList() {
    navigate('/list');
    toggleSidebar();
  }
  function goToListings() {
    navigate('/listings');
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
    toggleSidebar();
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={toggleSidebar}>&times;</button>
        <nav>
          <ul className="sidebar-list">
            <li className="sidebar-item">
              <a onClick={goToHomePage}>
                <i className="fas fa-home" style={{ marginRight: '8px' }}></i> Home
              </a>
            </li>
            {isLogged ? (
              <>
                <li className="sidebar-item">
                  <a onClick={goToProfile}>
                    <i className="fas fa-user" style={{ marginRight: '8px' }}></i> My profile
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={goToFavorites}>
                    <i className="fas fa-heart" style={{ marginRight: '8px' }}></i> My favorites
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={goToListings}>
                    <i className="fas fa-list" style={{ marginRight: '8px' }}></i> My listings
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={goToList}>
                    <i className="fas fa-plus-square" style={{ marginRight: '8px' }}></i> List a property
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={goToLeave}>
                    <i className="fas fa-sign-out-alt" style={{ marginRight: '8px' }}></i> Leave
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="sidebar-item">
                  <a onClick={goToLogin}>
                    <i className="fas fa-sign-in-alt" style={{ marginRight: '8px' }}></i> Sign in
                  </a>
                </li>
                <li className="sidebar-item">
                  <a onClick={goToCreate}>
                    <i className="fas fa-user-plus" style={{ marginRight: '8px' }}></i> Sign up
                  </a>
                </li>
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
