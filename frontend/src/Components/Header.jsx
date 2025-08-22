import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Header.css'; // opcional, para estilos personalizados

const Header = ({ toggleSidebar }) => {
    
    const navigate = useNavigate();
    function goToCreate() {
        navigate('/create');
    }
    function goToLogin() {
        navigate('/login');
    }
    function goToHomePage() {
          navigate('/');
    }

    return (
        <header className='header'>
            {/* Menu Icon */}
            <i className="fas fa-bars fa-lg menuIcon" onClick={toggleSidebar}></i>

            {/* Centered Title */}
            <div className="title" onClick={goToHomePage}>
                <div className='fas fa-home'></div>
                <div>Property Portal</div>
            </div>

            {/* Sign in | Sign up */}
            <div className='sign'>
                <a className="sign-item" onClick={goToLogin}>
                    <div>Login</div>
                    <i className="fas fa-sign-in-alt"></i>
                </a>
                <a className="sign-item" onClick={goToCreate}>
                    <div>Criar conta</div>
                    <i className="fas fa-user-plus"></i>
                </a>
            </div>
        </header>
    );
};

export default Header;
