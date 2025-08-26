import React, { useState } from 'react';
import './PropertyFilter.css';
import CityAutocomplete from './CityAutocomplete';

const propertyTypes = [
  'Apartamento',
  'Casa',
  'Terreno',
  'Comercial',
  'Outro'
];

export default function PropertyFilter({ onFilterChange }) {
  const [filters, setFilters] = useState({
    transactionType: 'buy',
    types: [],
    minPrice: '',
    maxPrice: '',
    minSize: '',
    maxSize: '',
    hasYard: false,
    minBedrooms: '',
    maxBedrooms: '',
    minBathrooms: '',
    maxBathrooms: '',
    parkingSpaces: '',
    constructionYear: '',
    city: '',
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

  const handleTransactionChange = (type) => {
    updateFilters({ transactionType: type });
  };

  const updateFilters = (updatedPart) => {
    const updated = { ...filters, ...updatedPart };
    setFilters(updated);
    onFilterChange(updated);
  };

  const search = () => {
    onFilterChange(filters);
    //procurar
  }

  return (
    <div className="property-filter">

      {/* Tipo de transação */}
      <div className="filter-group">
        <h4 style={{ color: 'white' }}>O que deseja?</h4>
        <div className="transaction-type">
          <button
            className={`filter-button ${filters.transactionType === 'buy' ? 'active' : ''}`}
            onClick={() => handleTransactionChange('buy')}
          >
            Comprar
          </button>
          <button
            className={`filter-button ${filters.transactionType === 'rent' ? 'active' : ''}`}
            onClick={() => handleTransactionChange('rent')}
          >
            Alugar
          </button>
        </div>
      </div>

      {/* Cidade */}
      <div className="filter-group city-group">
        <CityAutocomplete onSelect={(city) => updateFilters({ city })} />
      </div>

      {/* Linha com Tipo do imóvel */}
      <div className="filter-group property-types-group">
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

      {/* Grid com 6 colunas na mesma linha */}
      <div className="filter-grid">
        {/* Preço */}
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
              step="10000"
              value={filters.maxPrice}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Tamanho */}
        <div className="filter-group">
          <label>Tamanho (m²):</label>
          <div className="input-range">
            <input
              type="number"
              name="minSize"
              placeholder="Mínimo"
              step="10"
              value={filters.minSize}
              onChange={handleInputChange}
            />
            <span>—</span>
            <input
              type="number"
              name="maxSize"
              placeholder="Máximo"
              step="10"
              value={filters.maxSize}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Quartos */}
        <div className="filter-group">
          <label>Quartos:</label>
          <div className="input-range">
            <input
              type="number"
              name="minBedrooms"
              placeholder="Mínimo"
              min="0"
              value={filters.minBedrooms}
              onChange={handleInputChange}
            />
            <span>—</span>
            <input
              type="number"
              name="maxBedrooms"
              placeholder="Máximo"
              min="0"
              value={filters.maxBedrooms}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Banheiros */}
        <div className="filter-group">
          <label>Banheiros:</label>
          <div className="input-range">
            <input
              type="number"
              name="minBathrooms"
              placeholder="Mínimo"
              min="0"
              value={filters.minBathrooms}
              onChange={handleInputChange}
            />
            <span>—</span>
            <input
              type="number"
              name="maxBathrooms"
              placeholder="Máximo"
              min="0"
              value={filters.maxBathrooms}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Vagas na garagem */}
        <div className="filter-group">
          <label>Vagas na garagem:</label>
          <input
            type="number"
            name="parkingSpaces"
            min="0"
            placeholder="0"
            value={filters.parkingSpaces}
            onChange={handleInputChange}
          />
        </div>

        {/* Ano de construção */}
        <div className="filter-group">
          <label>Ano de construção:</label>
          <input
            type="number"
            name="constructionYear"
            placeholder="Ex: 2005"
            min="1900"
            max={new Date().getFullYear()}
            value={filters.constructionYear}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="filter-group search-button-wrapper">
        <button className="search-button" onClick={search}>
          Buscar
        </button>
      </div>

    </div>
  );
}
