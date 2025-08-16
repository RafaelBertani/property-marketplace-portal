import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './Header.css'; // opcional, para estilos personalizados

const Header = ({ toggleSidebar }) => {
    
    return (
        <header className='header'>
            {/* Menu Icon */}
            <i className="fas fa-bars fa-lg menuIcon" onClick={toggleSidebar}></i>

            {/* Centered Title */}
            <div className="title">
                <div className='fas fa-home'></div>
                <div>My Property Portal</div>
            </div>

            {/* Sign in | Sign up */}
            <div className='sign'>
                <a className="sign-item" href="/signin">
                    <div>Login</div>
                    <i className="fas fa-sign-in-alt"></i>
                </a>
                <a className="sign-item" href="/signup">
                    <div>Criar conta</div>
                    <i className="fas fa-user-plus"></i>
                </a>
            </div>
        </header>
    );
};

export default Header;
