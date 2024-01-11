const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.query('SELECT * FROM sua_tabela', (err, res) => {
  if (err) {
    console.error('Erro ao executar a consulta', err);
  } else {
    console.log('Resultado da consulta:', res.rows);
  }
  // Encerrar a conexão após a consulta
  pool.end();
});
