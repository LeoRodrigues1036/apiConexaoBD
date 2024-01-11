const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 3000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao executar a consulta', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Outras rotas podem ser adicionadas conforme necessário

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
