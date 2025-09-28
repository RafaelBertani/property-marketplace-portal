const pool = require('./database/databaseConfig');
const multer = require("multer");

async function applyFilters(userId, filters = {}) {
  const {
    city,
    constructionYear,
    maxBathrooms,
    maxBedrooms,
    maxPrice,
    maxSize,
    minBathrooms,
    minBedrooms,
    minPrice,
    minSize,
    parkingSpaces,
    transactionType,
    types,
  } = filters;

  let query = `
    SELECT 
      p.*,
      (
        SELECT pi.image_data
        FROM property_images pi
        WHERE pi.property_id = p.id
          AND pi.image_name = 'main'
        LIMIT 1
      ) AS main_image,
      EXISTS (
        SELECT 1
        FROM property_likes pl
        WHERE pl.property_id = p.id AND pl.user_id = $1
      ) AS is_liked
    FROM properties p
    WHERE 1=1
  `;

  const values = [userId || 0]; // $1 sempre é userId
  let count = 2; // próximos começam no $2

  if (city) {
    query += ` AND city ILIKE $${count}`;
    values.push(`%${city}%`);
    count++;
  }

  if (constructionYear) {
    query += ` AND construction_year = $${count}`;
    values.push(constructionYear);
    count++;
  }

  if (minPrice) {
    query += ` AND price >= $${count}`;
    values.push(minPrice);
    count++;
  }

  if (maxPrice) {
    query += ` AND price <= $${count}`;
    values.push(maxPrice);
    count++;
  }

  if (minSize) {
    query += ` AND area_sq_m >= $${count}`;
    values.push(minSize);
    count++;
  }

  if (maxSize) {
    query += ` AND area_sq_m <= $${count}`;
    values.push(maxSize);
    count++;
  }

  if (minBedrooms) {
    query += ` AND bedrooms >= $${count}`;
    values.push(minBedrooms);
    count++;
  }

  if (maxBedrooms) {
    query += ` AND bedrooms <= $${count}`;
    values.push(maxBedrooms);
    count++;
  }

  if (minBathrooms) {
    query += ` AND bathrooms >= $${count}`;
    values.push(minBathrooms);
    count++;
  }

  if (maxBathrooms) {
    query += ` AND bathrooms <= $${count}`;
    values.push(maxBathrooms);
    count++;
  }

  if (parkingSpaces) {
    query += ` AND parking_spaces >= $${count}`;
    values.push(parkingSpaces);
    count++;
  }

  if (transactionType) {
    query += ` AND purpose = $${count}`;
    values.push(transactionType.charAt(0).toUpperCase() + transactionType.slice(1));
    count++;
  }

  if (types && types.length > 0) {
    const typePlaceholders = types.map((_, i) => `$${count + i}`);
    query += ` AND type IN (${typePlaceholders.join(', ')})`;
    values.push(...types);
    count += types.length;
  }

  query += ` ORDER BY likes DESC, created_at DESC`;

  try {
    const result = await pool.query(query, values);
    const rows = result.rows.map(row => ({
      ...row,
      is_liked: row.is_liked,
      main_image: row.main_image 
        ? row.main_image.toString('base64') 
        : null
    }));

    return rows;
  } catch (error) {
    console.error('Erro ao buscar propriedades:', error);
    throw error;
  }
}

async function addLike(userId, propertyId) {
  try {
    // Verifica se o like já existe
    const result = await pool.query(
      'SELECT 1 FROM property_likes WHERE user_id = $1 AND property_id = $2',
      [userId, propertyId]
    );

    if (result.rowCount > 0) {
      throw new Error('Você já curtiu esta propriedade.');
    }

    // Adiciona o like na tabela
    await pool.query(
      'INSERT INTO property_likes (user_id, property_id) VALUES ($1, $2)',
      [userId, propertyId]
    );

    // Incrementa o contador de likes da propriedade
    await pool.query(
      'UPDATE properties SET likes = likes + 1 WHERE id = $1',
      [propertyId]
    );

  } catch (error) {
    console.error('Erro em addLike:', error);
    throw error;
  }
}

async function removeLike(userId, propertyId) {
  try {
    // Verifica se o like existe
    const result = await pool.query(
      'SELECT 1 FROM property_likes WHERE user_id = $1 AND property_id = $2',
      [userId, propertyId]
    );

    if (result.rowCount === 0) {
      throw new Error('Você não curtiu esta propriedade.');
    }

    // Remove o like da tabela
    await pool.query(
      'DELETE FROM property_likes WHERE user_id = $1 AND property_id = $2',
      [userId, propertyId]
    );

    // Decrementa o contador de likes da propriedade
    await pool.query(
      'UPDATE properties SET likes = GREATEST(likes - 1, 0) WHERE id = $1',
      [propertyId]
    );

  } catch (error) {
    console.error('Erro em removeLike:', error);
    throw error;
  }
}

async function findAll() {
  try {
    const query = `
      SELECT 
        id,
        type,
        title,
        price,
        area_sq_m,
        city,
        address,
        bedrooms,
        bathrooms,
        parking_spaces,
        construction_year,
        latitude,
        longitude,
        created_at
      FROM properties
      ORDER BY created_at DESC;
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar propriedades:", error);
    throw new Error("Erro");
  }
}

async function allFavorites(userId) {
  const query = `
    SELECT 
      p.*,
      (
        SELECT pi.image_data
        FROM property_images pi
        WHERE pi.property_id = p.id
          AND pi.image_name = 'main'
        LIMIT 1
      ) AS main_image,
      TRUE AS is_liked
    FROM properties p
    INNER JOIN property_likes pl ON pl.property_id = p.id
    WHERE pl.user_id = $1
    ORDER BY p.created_at DESC
  `;

  try {
    const result = await pool.query(query, [userId]);

    const rows = result.rows.map(row => ({
      ...row,
      is_liked: true, // sempre true porque já é favorito
      main_image: row.main_image 
        ? row.main_image.toString('base64') 
        : null
    }));

    return rows;
  } catch (error) {
    console.error('Erro ao buscar favoritos:', error);
    throw error;
  }
}

async function getMyListing(userId) {
  try {
    const query = `
      SELECT 
        id,
        type,
        title,
        price,
        area_sq_m,
        city,
        address,
        bedrooms,
        bathrooms,
        parking_spaces,
        construction_year,
        created_at
      FROM properties
      WHERE user_id = $1
      ORDER BY created_at DESC;
    `;

    const { rows } = await pool.query(query, [userId]);
    return rows;
  } catch (error) {
    console.error("Erro no getMyListing:", error);
    throw error;
  }
};

async function removeProperty(propertyId) {
    const query = "DELETE FROM properties WHERE id = $1";
    return await pool.query(query, [propertyId]);
};

async function addNewProperty(data, mainPhoto, secondaryPhotos) {
  const client = await pool.connect(); // <-- corrigido

  try {
    await client.query("BEGIN");

    const insertProperty = `
      INSERT INTO properties 
        (user_id, type, purpose, title, price, area_sq_m, city, address, bedrooms, bathrooms, parking_spaces, construction_year) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      RETURNING id
    `;
    const result = await client.query(insertProperty, [
      data.user_id,
      data.type,
      data.purpose,
      data.title,
      data.price,
      data.area_sq_m,
      data.city,
      data.address,
      data.bedrooms,
      data.bathrooms,
      data.parking_spaces,
      data.construction_year,
    ]);

    const propertyId = result.rows[0].id;

    // foto principal
    if (mainPhoto) {
      await client.query(
        "INSERT INTO property_images (property_id, image_data, is_main) VALUES ($1, $2, true)",
        [propertyId, mainPhoto.buffer]
      );
    }

    // fotos secundárias
    if (secondaryPhotos && secondaryPhotos.length > 0) {
      for (const photo of secondaryPhotos) {
        await client.query(
          "INSERT INTO property_images (property_id, image_data, is_main) VALUES ($1, $2, false)",
          [propertyId, photo.buffer]
        );
      }
    }

    await client.query("COMMIT");
    return propertyId;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  applyFilters,
  addLike,
  removeLike,
  findAll,
  allFavorites,
  getMyListing,
  removeProperty,
  addNewProperty
};
