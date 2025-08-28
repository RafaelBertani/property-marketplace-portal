const { Pool } = require('pg');

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  user: 'postgres',
  password: 'db#1post',
  database: 'pmp'
});

module.exports = pool;
