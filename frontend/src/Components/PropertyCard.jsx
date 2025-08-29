import React from 'react';
import './PropertyCard.css';
import '@fortawesome/fontawesome-free/css/all.css';

const PropertyCard = ({
  is_liked,
  id,
  type, title, price, area_sq_m, city, address,
  bedrooms, bathrooms, parking_spaces, construction_year,
  created_at, main_image,
  onToggleFavorite
}) => {
  const handleLike = async () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      alert('Você precisa estar logado para favoritar.');
      return;
    }

    try {
      await onToggleFavorite?.(id, !is_liked);
    } catch (e) {
      console.error('Falha ao atualizar favorito:', e);
    }
  };

  const imageSrc = main_image ? `data:image/jpeg;base64,${main_image}` : '/missing.jpg';

  return (
    <div className="property-card">
      <div className="image-container">
        <img className="property-image" src={imageSrc} alt={title} />
        <button className="like-btn" onClick={handleLike}>
          <i className={`fa-heart ${is_liked ? 'fas liked' : 'far'}`}></i>
        </button>
      </div>
      <div className="property-details">
        <p className="property-type">{type}</p>
        <p className="property-title">{title}</p>
        <p className="property-price">R$ {price}</p>
        <p className="property-location">{address}, {city}</p>
        <div className="property-info">
          <span>{area_sq_m} m²</span>
          <span>{bedrooms} quartos</span>
          <span>{bathrooms} banheiros</span>
          <span>{parking_spaces} vagas</span>
          <span>Construído em {construction_year}</span>
        </div>
        <p className="property-listed">Listado há {created_at}</p>
      </div>
    </div>
  );
};

export default PropertyCard;
