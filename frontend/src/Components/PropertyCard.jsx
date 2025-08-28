import React from 'react';
import './PropertyCard.css'; // estilos separados

const PropertyCard = ({
  type,
  title,
  price,
  area_sq_m,
  city,
  address,
  bedrooms,
  bathrooms,
  parking_spaces,
  construction_year,
  created_at,
  main_image,
}) => {

  // Se não tiver imagem (null), cai no fallback "missing.jpg"
  const imageSrc = main_image
    ? `data:image/jpeg;base64,${main_image}`
    : '/missing.jpg';

  return (
    <div className="property-card">
      
      <img className="property-image" src={imageSrc} alt={title} />
      <div className='property-details'>
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
