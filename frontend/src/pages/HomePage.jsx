import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // npm install react-router-dom
import axios from 'axios'; // npm install axios
import './HomeStyles.css';
import MapView from '../Components/MapView';

function HomePage() {

  return (
    <div className="content-home">
      <img src='/back.jpg' className='back-home' />
      <div className='mapview-container'> <MapView /> </div>
    </div>
  );
}

export default HomePage;
