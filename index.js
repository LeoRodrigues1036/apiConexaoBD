const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json()); // Habilita o uso de JSON no corpo das requisições

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

app.get('/api/dados', async (req, res) => {
  try {
    const client = await pool.connect();
    const response = await client.query('SELECT * FROM produtos');
    const produtos = response.rows;
    client.release();

    res.json(produtos);
  } catch (error) {
    console.error('Erro ao executar a consulta', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/dadosAlimentos', async (req, res) => {
  try {
    const client = await pool.connect();
    const response = await client.query("SELECT * FROM produtos WHERE categoria = 'Alimentos';");
    const produtos = response.rows;
    client.release();

    res.json(produtos);
  } catch (error) {
    console.error('Erro ao executar a consulta', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/dadosRoupas', async (req, res) => {
  try {
    const client = await pool.connect();
    const response = await client.query("SELECT * FROM produtos WHERE categoria = 'Roupas';");
    const produtos = response.rows;
    client.release();

    res.json(produtos);
  } catch (error) {
    console.error('Erro ao executar a consulta', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.get('/api/dadosEletronicos', async (req, res) => {
  try {
    const client = await pool.connect();
    const response = await client.query("SELECT * FROM produtos WHERE categoria = 'Eletronicos';");
    const produtos = response.rows;
    client.release();

    res.json(produtos);
  } catch (error) {
    console.error('Erro ao executar a consulta', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para inserir um novo produto
app.post('/api/inserir', async (req, res) => {
  const novoProduto = req.body; // Dados do novo produto vêm no corpo da requisição

  try {
    const client = await pool.connect();
    const query = 'INSERT INTO produtos (nome, descricao, preco, categoria, disponivel, imagem_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
    const values = [novoProduto.nome, novoProduto.descricao, novoProduto.preco, novoProduto.categoria, novoProduto.disponivel, novoProduto.imagem_url];
    const response = await client.query(query, values);
    const produtoInserido = response.rows[0];
    client.release();

    res.json(produtoInserido);
  } catch (error) {
    console.error('Erro ao inserir produto', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para editar um produto existente
app.put('/api/editar/:id', async (req, res) => {
  const produtoId = req.params.id;
  const dadosAtualizados = req.body; // Novos dados do produto vêm no corpo da requisição

  try {
    const client = await pool.connect();
    const query = 'UPDATE produtos SET nome = $1, descricao = $2, preco = $3, categoria = $4, disponivel = $5, imagem_url = $6 WHERE id = $7 RETURNING *';
    const values = [dadosAtualizados.nome, dadosAtualizados.descricao, dadosAtualizados.preco, dadosAtualizados.categoria, dadosAtualizados.disponivel, dadosAtualizados.imagem_url, produtoId];
    const response = await client.query(query, values);
    const produtoAtualizado = response.rows[0];
    client.release();

    res.json(produtoAtualizado);
  } catch (error) {
    console.error(`Erro ao editar produto com ID ${produtoId}`, error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Rota para deletar um produto
app.delete('/api/deletar/:id', async (req, res) => {
  const produtoId = req.params.id;

  try {
    const client = await pool.connect();
    const query = 'DELETE FROM produtos WHERE id = $1 RETURNING *';
    const values = [produtoId];
    const response = await client.query(query, values);
    const produtoDeletado = response.rows[0];
    client.release();

    res.json(produtoDeletado);
  } catch (error) {
    console.error(`Erro ao deletar produto com ID ${produtoId}`, error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando na porta ${port}`);
});
