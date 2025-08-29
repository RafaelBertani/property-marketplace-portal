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

module.exports = {
  filter,
  like,
  dislike,
  getAll,
  getFavorites
};
