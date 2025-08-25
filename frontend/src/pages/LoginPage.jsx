import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyles.css';
import axios from 'axios';

function LoginPage( {toggleLogged} ) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function goToHome() {
    navigate('/');
  }

  function handleGoogleLogin() {
    alert("this function is not implemented yet");
  }
  
  function handleAppleLogin() {
    alert("this function is not implemented yet");
  }

  function handleFacebookLogin() {
    alert("this function is not implemented yet");    
  }

  function handlePhoneLogin() {
    alert("this function is not implemented yet");    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/users/login', { email, password });
      localStorage.setItem('name', response.data.user.name);
      localStorage.setItem('email', response.data.user.email);
      localStorage.setItem('profile_pic',response.data.user.profile_pic);
      localStorage.setItem('role', response.data.user.role);

      if(response.status === 200){toggleLogged();}

      goToHome(); //navigate('/home');
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  }

  return (
    <div className="content-login">

        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Entrar</h2>
            <input
            type="email"
            className="login-input-field"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            className="login-input-field"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <button type="submit" className="login-button" style={{ display: "block", marginBottom: "10px" }}>Entrar</button>
            <button className="login-button" onClick={goToHome} style={{ display: "block", marginBottom: "10px" }}>Home</button>        
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>

        <div className="another-options">
          <h3>Ou entre com:</h3>
          <div className="buttons-box">
            <button type="button" className="option-button" onClick={handleGoogleLogin}>
              <i className="fab fa-google" style={{ marginRight: '8px' }}></i>
              Google
            </button>
            <button type="button" className="option-button" onClick={handleFacebookLogin}>
              <i className="fab fa-facebook" style={{ marginRight: '8px' }}></i>
              Facebook
            </button>
            <button type="button" className="option-button" onClick={handleAppleLogin}>
              <i className="fab fa-apple" style={{ marginRight: '8px' }}></i>
              Apple
            </button>
            <button type="button" className="option-button" onClick={handlePhoneLogin}>
              <i className="fas fa-phone" style={{ marginRight: '8px' }}></i>
              Número de Celular
            </button>
          </div>
        </div>

    </div>
  );
}

export default LoginPage;
