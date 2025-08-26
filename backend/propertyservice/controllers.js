const express = require("express");
const app = express();
const axios = require('axios');
app.use(express.json());
const properties = require('./properties');
//const { getAll, addNote, editNote } = require('./notes');

async function login (req, res) {
  const { email, password } = req.body;
  fixed_email = email.trim().toLowerCase();
  
  try{
    const result = await users.verifyLogin(fixed_email, password);
    const user = result.user;
    
    if (result.error) {
      return res.status(401).json({ message: result.error });
    }
    else{
      // Gerar um token JWT
      const token = jwt.sign(
        { id: user.id, name: user.name, email: user.email }, 
        process.env.JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      return res.status(200).json({
        message: 'Login bem-sucedido',
        user: result.user,
        token
      });
    }

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }

};

async function create(req, res) {
  const { email, name, password } = req.body;
  fixed_email = email.trim().toLowerCase();

  try {
    const result = await users.verifyCreateUser(fixed_email, name, password);

    // Se a função retornar um erro
    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    // Se o usuário for criado com sucesso, retorna os dados do usuário
    return res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: result.user
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }

};

// function getAllNotes(req, res) {
//   res.status(201).json( notes.getAll() );
// }

// function getNote(req, res) {
//   const { id } = req.params;
//   res.status(201).json( notes.getNoteById( id ) );
// }

// async function addNote(req, res) {
//   const { content } = req.body;
//   let newId = notes.addNote( content );
//   //envia para o barramento esse evento
//   try {
//     await axios.post('http://localhost:3003/eventoX', { newId });
//   } catch (error) {
//     console.log(error);
//   }
//   res.status(201).json( { message: "Note added" } );
// }

// function editNote(req, res) {
//   const { content } = req.body;
//   const { id } = req.params;
//   if( notes.editNote( id, content ) ){
//     res.status(201).json( { message: "Note updated" } );
//   } else {
//     res.status(404).json( { message: "Note not found" } );
//   }
// }

// function acao(req, res) {
//   console.log(req.body);
// }

module.exports = {
  login,
  create
};
