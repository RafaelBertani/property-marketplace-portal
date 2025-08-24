const pool = require('./database/databaseConfig');
const bcrypt = require('bcrypt');

const getAllUsers = async() => {
  const res = await pool.query('SELECT * FROM users');
  return res.rows;
};

const verifyLogin = async (email, password) => {
  const query = 'SELECT id, name, email, profile_pic, role, password FROM users WHERE email = $1';
  const values = [email];

  try {
    const res = await pool.query(query, values);

    if (res.rows.length === 0) {
      return { error: 'Email não encontrado' };
    }

    const user = res.rows[0];

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return { error: 'Senha incorreta' };
    }

    return { user: { id: user.id, name: user.name, email: user.email, profile_pic: user.profile_pic, role: user.role } };
    
  } catch (error) {
    console.error(error);
    return { error: 'Erro no servidor' };
  }
};

const verifyCreateUser = async (email, name, password) => {
  const checkQuery = 'SELECT * FROM users WHERE email = $1';
  const checkValues = [email];

  try {
    const checkRes = await pool.query(checkQuery, checkValues);

    // Se o email já estiver registrado
    if (checkRes.rows.length > 0) {
      return { error: 'Email já registrado' };
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Se o email não existir, cria o novo usuário
    const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, profile_pic, role';
    const role = 'USER';

    const insertValues = [name, email, hashedPassword, role];

    const insertRes = await pool.query(insertQuery, insertValues);

    // Retorna os dados do usuário criado
    const newUser = insertRes.rows[0];

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profile_pic: newUser.profile_pic,
        role: newUser.role
      }
    };

  } catch (error) {
    console.error(error);
    return { error: 'Erro no servidor' };
  }
  
};

const verifyCreateAdm = async (email, name, password) => {
  const checkQuery = 'SELECT * FROM users WHERE email = $1';
  const checkValues = [email];

  try {
    const checkRes = await pool.query(checkQuery, checkValues);

    // Se o email já estiver registrado
    if (checkRes.rows.length > 0) {
      return { error: 'Email já registrado' };
    }

    // Criptografa a senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(password, 10);

    // Se o email não existir, cria o novo usuário
    const insertQuery = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, profile_pic, role';
    const role = 'ADM';

    const insertValues = [name, email, hashedPassword, role];

    const insertRes = await pool.query(insertQuery, insertValues);

    // Retorna os dados do usuário criado
    const newUser = insertRes.rows[0];

    return {
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        profile_pic: newUser.profile_pic,
        role: newUser.role
      }
    };

  } catch (error) {
    console.error(error);
    return { error: 'Erro no servidor' };
  }
  
};

module.exports = {
  getAllUsers,
  verifyLogin,
  verifyCreateUser
};
