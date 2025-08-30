import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from '../Components/PropertyCard';
import '@fortawesome/fontawesome-free/css/all.css';
import "./ListingsPage.css";

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("id");

    const formatDate = (isoDate) => {
    const created = new Date(isoDate);
    const now = new Date();
    const diffDays = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return `${diffDays} dias`;
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://localhost:3002/properties/user/${userId}`);
        setListings(response.data);
      } catch (err) {
        console.error("Erro ao carregar listagens:", err);
        setError("Erro ao carregar suas propriedades.");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchListings();
    }
  }, [userId]);

  const handleDelete = async (propertyId) => {
    if (!window.confirm("Tem certeza que deseja excluir este anúncio?")) return;

    try {
      await axios.delete(`http://localhost:3002/properties/${propertyId}`);
      setListings((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (err) {
      console.error("Erro ao deletar anúncio:", err);
      alert("Erro ao excluir anúncio.");
    }
  };

  if (loading) {
    return <p className="loading">Carregando suas listagens...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (listings.length === 0) {
    return <p className="no-listings">Você ainda não cadastrou nenhuma propriedade.</p>;
  }

  return (
    <div className="my-listings">
      <h2>Minhas Propriedades</h2>
      <div className="listings-grid">
        {listings.map((property) => (
          <div key={property.id} className="listing-wrapper">
            <PropertyCard
              key={property.id}
              {...property}
              created_at={formatDate(property.created_at)}
            />
            <button className="delete-btn" onClick={() => handleDelete(property.id)}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListingsPage;