import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PageStyles.css';

function Tela3() {
  const navigate = useNavigate();
  const [locks, setLocks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      // try {
      //   const resp = await axios.post('http://localhost:3003/locks', { email: localStorage.getItem('email') });
      //   setLocks(resp.data.list);
      // } catch {
      //   setLocks([]);
      //   alert('Erro ao buscar fechaduras.');
      // }
      setLoading(false);
    }
    fetchStatus();
  }, []);

  const handleNavigate = (registrationCode) => {
    localStorage.setItem('code', registrationCode);
    navigate(`/home/${registrationCode}`);
  };

  // function handleLogout() {
  //   localStorage.removeItem('user');
  //   localStorage.removeItem('code');
  //   navigate('/');
  // }
  

  function goToTela1() {
    navigate('/tela1');
  }

  function goToTela2() {
    navigate('/tela2');
  }

  function goToHome() {
    navigate('/');
  }  

  return (
    <div className="page">

        <button className="page-button" onClick={goToTela1}>Tela1</button>
        <button className="page-button" onClick={goToTela2}>Tela2</button>
        <button className="page-button" onClick={goToHome}>Home</button>

        {loading ? (
          <p>Carregando...</p>
        ) : locks.length === 0 ? (
          <p>nada ainda.</p>
        ) : (
          <div className="locks-grid-container">
            {locks.map((lock, idx) => (
              <div key={idx} className="lock-card lock-card-modern">
                <div className="lock-icon-card">
                  <span role="img" aria-label="cadeado" style={{ fontSize: 40 }}>
                    {lock.isAdmin ? "🔑" : "👤"}
                  </span>
                </div>
                <div style={{ flex: 1, color: '#3B3B3B' }}>
                  <div><b>Nome:</b> {lock.lockName}</div>
                  <div><b>Função:</b> {lock.isAdmin ? <span className="badge-admin">Admin</span> : <span className="badge-guest">Convidado</span>}</div>
                </div>
                <button className="enter-lock-btn" onClick={() => handleNavigate(lock.registrationCode)}>Entrar</button>
              </div>
            ))}
          </div>
        )}

    </div>
  );
}

export default Tela3;
