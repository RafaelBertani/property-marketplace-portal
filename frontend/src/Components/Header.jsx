import React from 'react';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import './Header.css'; // opcional, para estilos personalizados

const Header = ({ toggleSidebar, isLogged }) => {
    
    const navigate = useNavigate();
    function goToProfile() {
        navigate('/profile');
    }
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
            {isLogged ?
                (<>
                    <div className="user-info" onClick={goToProfile}>
                        <span className="user-name">{localStorage.getItem('name')}</span>
                        <img
                            src={localStorage.getItem('profile_pic')=='null'?'/default.jpg':`data:image/jpeg;base64,${localStorage.getItem('profile_pic')}`}
                            alt="Perfil"
                            className="user-avatar"
                        />
                    </div>
                </>)
                :
                (<>
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
                </>)
            }
        </header>
    );
};

export default Header;
