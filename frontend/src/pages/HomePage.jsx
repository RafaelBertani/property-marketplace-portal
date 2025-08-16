import { useState, useEffect } from 'react';
// npm install react-router-dom
import { useNavigate } from 'react-router-dom';
// npm install axios
import axios from 'axios';
//import './PageStyles.css';

function HomePage() {
  //const [lockStatus, setLockStatus] = useState('Fechada');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchStatus() {
    //   try {
    //     const resp = await axios.get(`http://localhost:3003/status?code=${localStorage.getItem('code')}`);
    //     setLockStatus(resp.data.status);
    //   } catch {
    //     setLockStatus('Desconhecido');
    //   }
    }
    fetchStatus();
  }, []);

  function goToTela1() {
    navigate('/tela1');
  }

  function goToTela2() {
    navigate('/tela2');
  }

  function goToTela3() {
    navigate('/tela3');
  }  

  return (
    <div className="page">
      {/* <div style={{
        marginBottom: '30px',
        fontWeight: 'bold',
        fontSize: '1.3rem'
      }}>
        Status da Fechadura:{" "}
        <span style={{ color: lockStatus === 'Aberta' ? 'green' : 'red' }}>
          {lockStatus}
        </span>
      </div> */}
      {/* <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        maxWidth: '300px',  
        margin: '0 auto'
        }}>
        <button className="page-button" onClick={goToTela1}>Tela1</button>
      </div>
      <button className="page-button" onClick={goToTela2}>Tela2</button>
      <button className="page-button" onClick={goToTela3}>Tela3</button> */}
    </div>
  );
}

export default HomePage;
