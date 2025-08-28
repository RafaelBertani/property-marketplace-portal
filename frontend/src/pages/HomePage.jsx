import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom'; // npm install react-router-dom
import axios from 'axios'; // npm install axios
import './HomeStyles.css';
import MapView from '../Components/MapView';
import PropertyFilter from '../Components/PropertyFilter';
import PropertyCard from '../Components/PropertyCard';

function HomePage() {

  const [view, setView] = useState('filter');  
  const [properties, setProperties] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const formatDate = (isoDate) => {
    const created = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return `${diffDays} dias`;
  };

  const handleFilterChange = async (filters) => {
    setShowResults(true);
    
    try {
      const response = await axios.post('http://localhost:3002/properties/filter', { filters });
      console.log(response.data.properties);
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    }

    console.log('Filtros selecionados:', filters);
  };
  
  return (
    <div className="content-home">

      {/*<img src='/back.jpg' className='back-home' />*/}
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

      {view === 'filter' && showResults && (
        <div className='property-list'>
          {properties.length === 0 ? (
            <p>Nenhum imóvel encontrado.</p>
          ) : (
            properties.map((property, index) => (
              <PropertyCard
                key={index}
                type={property.type}
                title={property.title}
                price={property.price}
                area_sq_m={property.area_sq_m}
                city={property.city}
                address={property.address}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                parking_spaces={property.parking_spaces}
                construction_year={property.construction_year}
                created_at={formatDate(property.created_at)}
              />
            ))
          )}
        </div>
      )};


    </div>
    
  );
}

export default HomePage;
