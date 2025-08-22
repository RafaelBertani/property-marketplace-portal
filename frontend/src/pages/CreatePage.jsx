import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateStyles.css';

function CreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  function goToHome() {
    navigate('/');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if(password!=passwordRepeat){
      setError('As senhas não coincidem!');
      return;
    }

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
    <div className="content-create">

        <form className="create-form" onSubmit={handleSubmit}>
            <h2>Entrar</h2>
            <input
            type="text"
            placeholder="Nome"
            className="create-input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
            <input
            type="email"
            className="create-input-field"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            />
            <input
            type="password"
            className="create-input-field"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            />
            <input
            type="password"
            className="create-input-field"
            placeholder="Repita a senha"
            value={passwordRepeat}
            onChange={e => setPasswordRepeat(e.target.value)}
            required
            />
            <button type="submit" className="create-button" style={{ display: "block", marginBottom: "10px" }}>Entrar</button>
            <button className="create-button" onClick={goToHome} style={{ display: "block", marginBottom: "10px" }}>Home</button>        
            {error && <div style={{ color: "red", marginTop: 8 }}>{error}</div>}
        </form>

    </div>
  );
}

export default CreatePage;
