const { Pool } = require('pg');

// Configura tu conexión
const pool = new Pool({
  user: 'postgres',         // por ejemplo: postgres
  host: 'localhost',          // o IP del servidor
  database: 'DocuTrack-App',        // nombre de la base de datos
  password: '',    // tu contraseña 
  port: 5432,                 // puerto por defecto de PostgreSQL
});

module.exports = pool;