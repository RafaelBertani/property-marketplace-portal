import React, { useState } from 'react';
import './PropertyFilter.css';

const propertyTypes = [
  'Apartamento',
  'Casa',
  'Terreno',
  'Comercial',
  'Kitnet',
  'Outro'
];

export default function PropertyFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    types: [],
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    hasYard: false,
  });

  const handleTypeToggle = (type) => {
    const updatedTypes = filters.types.includes(type)
      ? filters.types.filter((t) => t !== type)
      : [...filters.types, type];

    updateFilters({ types: updatedTypes });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFilters({ [name]: value });
  };

  const handleCheckboxChange = (e) => {
    updateFilters({ hasYard: e.target.checked });
  };

  const updateFilters = (updatedPart) => {
    const updated = { ...filters, ...updatedPart };
    setFilters(updated);
    onFilterChange(updated); // envia para o pai
  };

  return (
    <div className="property-filter">
      <div className="filter-group">
        <label>Tipo do imóvel:</label>
        <div className="property-types">
          {propertyTypes.map((type) => (
            <button
              key={type}
              className={`filter-button ${filters.types.includes(type) ? 'active' : ''}`}
              onClick={() => handleTypeToggle(type)}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Preço (R$):</label>
        <div className="input-range">
          <input
            type="number"
            name="minPrice"
            placeholder="Mínimo"
            min="0"
            step="10000"
            value={filters.minPrice}
            onChange={handleInputChange}
          />
          <span>—</span>
          <input
            type="number"
            name="maxPrice"
            placeholder="Máximo"
            min="0"
            value={filters.maxPrice}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Tamanho (m²):</label>
        <div className="input-range">
          <input
            type="number"
            name="minSize"
            placeholder="Mínimo"
            value={filters.minSize}
            onChange={handleInputChange}
          />
          <span>—</span>
          <input
            type="number"
            name="maxSize"
            placeholder="Máximo"
            value={filters.maxSize}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="filter-group">
        <label>
          <input
            type="checkbox"
            checked={filters.hasYard}
            onChange={handleCheckboxChange}
          />
          Com quintal
        </label>
      </div>
    </div>
  );
}
