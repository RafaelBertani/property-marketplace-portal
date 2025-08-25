import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // npm install react-router-dom
import axios from 'axios'; // npm install axios
import './HomeStyles.css';
import MapView from '../Components/MapView';
import PropertyFilter from '../Components/PropertyFilter';

function HomePage() {

  const [view, setView] = useState('filter');
  
  const handleFilterChange = (filters) => {
    console.log('Filtros selecionados:', filters);

  };
  
  return (
    <div className="content-home">
      <img src='/back.jpg' className='back-home' />
      <div className="view-toggle">
      <button
        onClick={() => setView('filter')}
        style={{
          backgroundColor: view === 'filter' ? '#0056b3' : '#007bff',
        }}
      >
        Ver Filtros
      </button>
      <button
        onClick={() => setView('map')}
        style={{
          backgroundColor: view === 'map' ? '#0056b3' : '#007bff',
        }}
      >
        Ver Mapa
      </button>
    </div>
    <div className={view === 'map' ? 'main-container-map' : 'main-container-filter'}>
        {view === 'map' && <MapView />}
        {view === 'filter' && <PropertyFilter onFilterChange={handleFilterChange} />}
      </div>
    </div>
  );
}

export default HomePage;
