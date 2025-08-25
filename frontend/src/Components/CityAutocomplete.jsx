import React, { useEffect, useState } from 'react';

export default function CityAutocomplete({ onSelect }) {
  const [cities, setCities] = useState([]);
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    // Carrega cidades do IBGE uma vez
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/municipios')
      .then(res => res.json())
      .then(data => {
        // Salva só os nomes das cidades (ou pode guardar tudo)
        const cityNames = data.map(c => c.nome);
        setCities(cityNames);
      });
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length > 1) {
      const filtered = cities.filter(city =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 5)); // mostra até 5 sugestões
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (city) => {
    setInput(city);
    setSuggestions([]);
    if(onSelect) onSelect(city);
  };

  return (
    <div style={{ position: 'relative', width: '50%'}}>
      <input
        type="text"
        placeholder="Digite a cidade"
        value={input}
        onChange={handleChange}
      />
      {suggestions.length > 0 && (
        <ul style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: 'white',
          border: '1px solid #ccc',
          margin: 0,
          padding: 0,
          listStyle: 'none',
          maxHeight: '150px',
          overflowY: 'auto',
          zIndex: 1000,
        }}>
          {suggestions.map((city) => (
            <li
              key={city}
              onClick={() => handleSelect(city)}
              style={{ padding: '8px', cursor: 'pointer' }}
              onMouseDown={e => e.preventDefault()} // evita que o input perca foco antes do click
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
