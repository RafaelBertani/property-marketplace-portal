import { useState, useEffect } from 'react';
import axios from 'axios';
import PropertyCard from '../Components/PropertyCard';
import './FavoritesPage.css';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (isoDate) => {
    const created = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return `${diffDays} dias`;
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const userId = localStorage.getItem('id');
      if (!userId) return;

      try {
        const response = await axios.post(
          'http://localhost:3002/properties/favorites',
          { userId }
        );
        setFavorites(response.data.properties);
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  const handleToggleFavorite = async (propertyId, isLiked) => {
    const userId = localStorage.getItem('id');
    if (!userId) return;

    try {
      if (isLiked) {
        await axios.post('http://localhost:3002/properties/like', { userId, propertyId });
      } else {
        await axios.delete('http://localhost:3002/properties/like', {
          data: { userId, propertyId }
        });
      }

      // Atualiza a lista local removendo ou atualizando o is_liked
      setFavorites((prev) =>
        prev.map((p) =>
          p.id === propertyId ? { ...p, is_liked: isLiked } : p
        )
      );
    } catch (error) {
      console.error('Erro ao atualizar favorito:', error);
    }
  };

  if (loading) return <p>Loading favorites...</p>;

  if (favorites.length === 0) return <p>No favorite properties found.</p>;

  return (
    <div className="favorites-page">
      <h2>My Favorite Properties</h2>
      <div className="property-list">
        {favorites.map((property) => (
          <PropertyCard
            key={property.id}
            {...property}
            created_at={formatDate(property.created_at)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
