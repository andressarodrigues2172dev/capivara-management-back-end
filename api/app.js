require('dotenv').config();
const express = require('express');
const app = express();
const capivaraRoutes = require('./routes/capivara.routes');
const cors = require('cors');

// Permitir apenas este domínio
app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configurar middleware para JSON
app.use(express.json());

// Usar rotas de capivaras
app.use('/api/capivaras', capivaraRoutes);

// Iniciar o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});

// Conectar ao banco de dados usando Sequelize
const sequelize = require('./config/db');

sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados bem-sucedida.');

    // Sincronizar modelos apenas uma vez, se necessário
    sequelize.sync({ force: false }) // Aqui você decide se quer forçar a recriação das tabelas
      .then(() => {
        console.log('Modelos sincronizados com sucesso.');
      })
      .catch(err => {
        console.error('Erro ao sincronizar os modelos:', err);
      });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
