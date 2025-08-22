import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // npm install react-router-dom
import axios from 'axios'; // npm install axios
import './HomeStyles.css';

function HomePage() {
  
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

  return (
    <div className="content-home">
      
    </div>
  );
}

export default HomePage;
