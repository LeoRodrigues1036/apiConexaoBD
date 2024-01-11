const { Pool } = require('pg');

const connectionString = 'postgresql://LeoRodrigues1036:************@ep-winter-cell-78315372.us-east-2.aws.neon.tech/BancoDeDados?sslmode=require';

const pool = new Pool({
  connectionString: connectionString,
});

// Agora você pode usar o objeto `pool` para realizar consultas.
pool.query('SELECT * FROM produtos', (err, res) => {
  if (err) {
    console.error('Erro ao executar a consulta', err);
  } else {
    console.log('Resultado da consulta:', res.rows);
  }
  // Encerrar a conexão após a consulta
  pool.end();
});