const express = require('express');
const controllers = require('./controllers');
//const { getAllNotes, getNote, addNote, editNote, acao } = require('./controllers'); outra forma de fazer os imports das funções em controllers.js

const router = express.Router();

router.post('/login',controllers.login);
router.post('/create',controllers.create);


// router.get('/', controllers.getAllNotes); //router.get('/', getAllNotes);
// router.get('/:id', controllers.getNote);
// router.post('/add-note', controllers.addNote);
// router.post('/edit-note/:id', controllers.editNote);
// router.post('/eventoX', controllers.acao)

module.exports = router;
