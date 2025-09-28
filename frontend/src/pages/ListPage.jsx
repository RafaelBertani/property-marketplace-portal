import React, { useState } from 'react';
import axios from 'axios';
import './ListPage.css';
import { useNavigate } from 'react-router-dom';

export default function ListPage() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    purpose: 'Buy',
    type: 'Apartment',
    title: '',
    price: '',
    area_sq_m: '',
    city: '',
    address: '',
    bedrooms: '',
    bathrooms: '',
    parking_spaces: '',
    construction_year: '',
    description: '',
    mainPhoto: null,
    secondaryPhotos: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'mainPhoto') {
      setFormData((prev) => ({ ...prev, mainPhoto: files[0] }));
    } else if (name === 'secondaryPhotos') {
      setFormData((prev) => ({
        ...prev,
        secondaryPhotos: Array.from(files)
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'secondaryPhotos') {
        formData.secondaryPhotos.forEach((file) =>
          formDataToSend.append('secondaryPhotos', file)
        );
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    // adicionar o user_id
    formDataToSend.append('user_id', localStorage.getItem('id'));

    try {
      const response = await axios.post(
        'http://localhost:3002/properties/list',
        formDataToSend,
        {
          headers: { 'Content-Type': 'multipart/form-data' }
        }
      );
      alert('Anúncio criado com sucesso', response.data);
      navigate('/');
    } catch (error) {
      console.error('Erro criar anúncio:', error);
    }
  };

  return (
    <div className="list-page">
      <h2>Criar Anúncio</h2>
      <form className="form-container" onSubmit={handleSubmit}>

        {/* Tipo de operação */}
        <div className="form-group">
          <label>Tipo de operação:</label>
          <select
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
          >
            <option value="Buy">Venda</option>
            <option value="Rent">Aluguel</option>
          </select>
        </div>

        {/* Tipo de imóvel */}
        <div className="form-group">
          <label>Tipo de imóvel:</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="Apartment">Apartamento</option>
            <option value="House">Casa</option>
            <option value="Land">Terreno</option>
            <option value="Commercial">Comercial</option>
            <option value="Other">Outro</option>
          </select>
        </div>

        {/* Título */}
        <div className="form-group">
          <label>Título do anúncio:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Preço */}
        <div className="form-group">
          <label>Preço (R$):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Tamanho */}
        <div className="form-group">
          <label>Tamanho (m²):</label>
          <input
            type="number"
            name="area_sq_m"
            value={formData.area_sq_m}
            onChange={handleChange}
          />
        </div>

        {/* Cidade */}
        <div className="form-group">
          <label>Cidade:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        {/* Endereço */}
        <div className="form-group">
          <label>Endereço:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        {/* Quartos */}
        <div className="form-group">
          <label>Quartos:</label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
        </div>

        {/* Banheiros */}
        <div className="form-group">
          <label>Banheiros:</label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
          />
        </div>

        {/* Vagas */}
        <div className="form-group">
          <label>Vagas de garagem:</label>
          <input
            type="number"
            name="parking_spaces"
            value={formData.parking_spaces}
            onChange={handleChange}
          />
        </div>

        {/* Ano construção */}
        <div className="form-group">
          <label>Ano de construção:</label>
          <input
            type="number"
            name="construction_year"
            value={formData.construction_year}
            onChange={handleChange}
          />
        </div>

        {/* Foto principal */}
        <div className="form-group">
          <label>Foto principal:</label>
          <input
            type="file"
            name="mainPhoto"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        {/* Fotos secundárias */}
        <div className="form-group">
          <label>Fotos secundárias:</label>
          <input
            type="file"
            name="secondaryPhotos"
            accept="image/*"
            multiple
            onChange={handleChange}
          />
        </div>

        {/* Descrição */}
        <div className="form-group" style={{ gridColumn: "span 2" }}>
          <label>Descrição:</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        {/* Botão */}
        <button type="submit" className="submit-button">
          Criar Anúncio
        </button>
      </form>
    </div>
  );
}
