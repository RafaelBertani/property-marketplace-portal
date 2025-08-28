const pool = require('./database/databaseConfig');

async function applyFilters(filters) {
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
      ) AS main_image
    FROM properties p
    WHERE 1=1
  `;
  const values = [];
  let count = 1;

  if (city) {
    query += ` AND city ILIKE $${count++}`;
    values.push(`%${city}%`);
  }

  if (constructionYear) {
    query += ` AND construction_year = $${count++}`;
    values.push(constructionYear);
  }

  if (minPrice) {
    query += ` AND price >= $${count++}`;
    values.push(minPrice);
  }

  if (maxPrice) {
    query += ` AND price <= $${count++}`;
    values.push(maxPrice);
  }

  if (minSize) {
    query += ` AND area_sq_m >= $${count++}`;
    values.push(minSize);
  }

  if (maxSize) {
    query += ` AND area_sq_m <= $${count++}`;
    values.push(maxSize);
  }

  if (minBedrooms) {
    query += ` AND bedrooms >= $${count++}`;
    values.push(minBedrooms);
  }

  if (maxBedrooms) {
    query += ` AND bedrooms <= $${count++}`;
    values.push(maxBedrooms);
  }

  if (minBathrooms) {
    query += ` AND bathrooms >= $${count++}`;
    values.push(minBathrooms);
  }

  if (maxBathrooms) {
    query += ` AND bathrooms <= $${count++}`;
    values.push(maxBathrooms);
  }

  if (parkingSpaces) {
    query += ` AND parking_spaces >= $${count++}`;
    values.push(parkingSpaces);
  }

  if (transactionType) {
    query += ` AND purpose = $${count++}`;
    values.push(transactionType.charAt(0).toUpperCase() + transactionType.slice(1));
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

module.exports = {
  applyFilters
};
