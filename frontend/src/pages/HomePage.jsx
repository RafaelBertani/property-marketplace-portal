import { useState } from 'react';
import axios from 'axios';
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
      const response = await axios.post('http://localhost:3002/properties/filter', { 
        id: localStorage.getItem('id'), 
        filters 
      });
      setProperties(response.data.properties);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    }
  };

  const handleToggleFavorite = async (propertyId, isLiked) => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert('Você precisa estar logado para favoritar uma propriedade.');
      return;
    }

    try {
      if (isLiked) {
        await axios.post('http://localhost:3002/properties/like', { userId, propertyId });
      } else {
        await axios.delete('http://localhost:3002/properties/like', {
          data: { userId, propertyId }
        });
      }

      // 🔑 Atualiza o estado local para refletir a mudança
      setProperties((prev) =>
        prev.map((p) =>
          p.id === propertyId ? { ...p, is_liked: isLiked } : p
        )
      );

    } catch (error) {
      console.error("Erro ao atualizar favorito:", error);
    }
  };

  const loadMap = async () => {
    const response = await axios.post('http://localhost:3002/properties/all');
    setProperties(response.data.properties);
    setView('map');
  };

  return (
    <div className="content-home">
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
          onClick={loadMap}
          style={{
            backgroundColor: view === 'map' ? '#0056b3' : '#007bff',
          }}
        >
          Ver Mapa
        </button>
      </div>

      <div className={view === 'map' ? 'main-container-map' : 'main-container-filter'}>
        {view === 'map' && <MapView properties={properties} />}
        {view === 'filter' && <PropertyFilter onFilterChange={handleFilterChange} />}
      </div>

      {view === 'filter' && showResults && (
        <div className='property-list'>
          {properties.length === 0 ? (
            <p>Nenhum imóvel encontrado.</p>
          ) : (
            properties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                created_at={formatDate(property.created_at)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))
          )}
        </div>
      )}

      <div className='end'><span></span></div>
    </div>
  );
}

export default HomePage;
