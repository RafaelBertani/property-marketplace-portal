const express = require('express');
const controllers = require('./controllers');
const multer = require('multer');
const upload = multer();
//const { getAllNotes, getNote, addNote, editNote, acao } = require('./controllers'); outra forma de fazer os imports das funções em controllers.js

const router = express.Router();

router.post('/filter', controllers.filter);
router.post('/like', controllers.like);
router.delete('/like', controllers.dislike);
router.post('/all', controllers.getAll);
router.post('/favorites', controllers.getFavorites);
router.get('/user/:id',controllers.listed);
router.delete('/:id',controllers.deleteProperty);
router.post('/list',upload.fields([
  { name: 'mainPhoto', maxCount: 1 },
  { name: 'secondaryPhotos', maxCount: 10 }
]),controllers.listProperty);

module.exports = router;
