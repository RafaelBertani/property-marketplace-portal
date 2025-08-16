import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

function Tela1() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function goToHome() {
    navigate('/');
  }

  function goToTela2() {
    navigate('/tela2');
  }

  function goToTela3() {
    navigate('/tela3');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    try {
    //   const response = await axios.post('http://localhost:3001/users/login', { email, password });
    //   localStorage.setItem('user', response.data.name);
    //   localStorage.setItem('email', response.data.email);
    //   navigate('/home');
    } catch (err) {
      setError('Email ou senha inválidos.');
    }
  }

  return (
    <div className="page">
        <button className="page-button" onClick={goToHome}>Home</button>
        <button className="page-button" onClick={goToTela2}>Tela2</button>
        <button className="page-button" onClick={goToTela3}>Tela3</button>

        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Entrar</h2>
            <input
            type="text"
            placeholder="Nome"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            className="input-field"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <button type="submit" className="login-button">Entrar</button>
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>

    </div>
  );
}

export default Tela1;
