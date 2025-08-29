const express = require('express');
const controllers = require('./controllers');
//const { getAllNotes, getNote, addNote, editNote, acao } = require('./controllers'); outra forma de fazer os imports das funções em controllers.js

const router = express.Router();

router.post('/filter', controllers.filter);
router.post('/like', controllers.like);
router.delete('/like', controllers.dislike);
router.post('/all', controllers.getAll);
router.post('/favorites', controllers.getFavorites);

module.exports = router;
