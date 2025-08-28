const express = require("express");
const app = express();
const axios = require('axios');
app.use(express.json());
const properties = require('./properties');

async function filter (req, res) {
  const { filters } = req.body;
  
  try{
    const result = await properties.applyFilters(filters);

    return res.status(200).json({
        message: 'Busca bem sucedida',
        properties: result
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }

};

module.exports = {
  filter
};
