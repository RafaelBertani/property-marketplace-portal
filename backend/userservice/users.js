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
    
    return { user: { id: user.id, name: user.name, email: user.email, profile_pic: ""+user.profile_pic, role: user.role } };
    
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

const updatePassword = async (userId, currentPassword, newPassword) => {
  try {
    // 1. Busca usuário
    const queryUser = "SELECT password FROM users WHERE id = $1";
    const result = await pool.query(queryUser, [userId]);

    if (result.rows.length === 0) {
      return { success: false, message: "Usuário não encontrado." };
    }

    const hashedPassword = result.rows[0].password;

    // 2. Confere senha atual
    const isMatch = await bcrypt.compare(currentPassword, hashedPassword);
    if (!isMatch) {
      return { success: false, message: "Senha atual incorreta." };
    }

    // 3. Hash da nova senha
    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    // 4. Atualiza
    const updateQuery = "UPDATE users SET password = $1 WHERE id = $2";
    await pool.query(updateQuery, [hashedNewPassword, userId]);

    return { success: true, message: "Senha alterada com sucesso!" };
  } catch (err) {
    console.error("Erro no updatePassword:", err);
    return { success: false, message: "Erro ao atualizar senha." };
  }
}

const updateProfilePic = async (userId, profile_pic) => {
  try {
    const result = await pool.query(
      "UPDATE users SET profile_pic = $1 WHERE id = $2 RETURNING id",
      [profile_pic, userId]
    );
    return result.rowCount > 0;
  } catch (err) {
    throw err;
  }
}


module.exports = {
  getAllUsers,
  verifyLogin,
  verifyCreateUser,
  updatePassword,
  updateProfilePic
};
