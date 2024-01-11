const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;


// Configuração do banco de dados PostgreSQL
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'artigo71',
  port: 5432,
});

client.connect();

// Middleware CORS
app.use(cors());

// Rota para obter dados do banco de dados
app.get('/api/dados', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM premios');
    res.json(result.rows);
  } catch (error) {
    console.error('Erro ao obter dados do banco de dados', error);
    res.status(500).json({ error: 'Erro ao obter dados do banco de dados' });
  }
});

// Encerra a conexão do cliente PostgreSQL quando o aplicativo é encerrado
process.on('SIGINT', () => {
  client.end();
  process.exit();
});

app.listen(port, () => {
  //console.log(`Servidor está rodando na porta ${port}`);
});
