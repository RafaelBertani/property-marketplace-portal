const express = require("express");
const app = express();
const axios = require('axios');
app.use(express.json());
const properties = require('./properties');

async function filter (req, res) {
  const { id, filters } = req.body;
  
  try{
    const result = await properties.applyFilters(id, filters || {});
    return res.status(200).json({
        message: 'Busca bem sucedida',
        properties: result
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }

};

async function like(req, res) {
  const { userId, propertyId } = req.body;

  try {
    await properties.addLike(userId, propertyId);

    return res.status(201).json({
      message: 'Like adicionado com sucesso!',
    });

  } catch (error) {
    console.error(error);
    
    if (error.message === 'Você já curtiu esta propriedade.') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

async function dislike(req, res) {
  const { userId, propertyId } = req.body;

  try {
    await properties.removeLike(userId, propertyId);

    return res.status(200).json({
      message: 'Like removido com sucesso!',
    });

  } catch (error) {
    console.error(error);
    
    if (error.message === 'Você não curtiu esta propriedade.') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

async function getAll(req, res) {
  
  try {
    const result = await properties.findAll();

    return res.status(200).json({
      message: 'Sucesso',
      properties: result
    });

  } catch (error) {
    console.error(error);
    
    if (error.message === 'Erro') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Erro no servidor' });
  }

}

async function getFavorites(req, res) {

  const { userId } = req.body;

  try{
    const result = await properties.allFavorites(userId);

    return res.status(200).json({
        message: 'Busca bem sucedida',
        properties: result
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }

}

async function listed(req, res) {
  const { id } = req.params;

  try {
    const listings = await properties.getMyListing(id); // chama a função do repository
    return res.json(listings);
  } catch (error) {
    console.error("Erro ao buscar listagens:", error);
    return res.status(500).json({ error: "Erro ao carregar suas listagens." });
  }
};

async function deleteProperty(req, res) {
  try {
    const { id } = req.params; // id da propriedade enviada na rota

    if (!id) {
      return res.status(400).json({ error: "ID da propriedade é obrigatório" });
    }

    const result = await properties.removeProperty(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Propriedade não encontrada" });
    }

    return res.status(200).json({ message: "Propriedade removida com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar propriedade:", error);
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
};

async function listProperty(req, res) {
  try {
    const data = {
      user_id: req.body.user_id,
      type: req.body.type,
      purpose: req.body.purpose,
      title: req.body.title,
      price: req.body.price,
      area_sq_m: req.body.area_sq_m,
      city: req.body.city,
      address: req.body.address,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      parking_spaces: req.body.parking_spaces,
      construction_year: req.body.construction_year,
    };

    const mainPhoto = req.files['mainPhoto'] ? req.files['mainPhoto'][0] : null;
    const secondaryPhotos = req.files['secondaryPhotos'] || [];

    const propertyId = await properties.addNewProperty(data, mainPhoto, secondaryPhotos);

    res.status(201).json({ success: true, propertyId });
  } catch (err) {
    console.error("Error listing property:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  filter,
  like,
  dislike,
  getAll,
  getFavorites,
  listed,
  deleteProperty,
  listProperty
};
