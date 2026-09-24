const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(express.json());

// Health Check para el Load Balancer
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// API REST que consume un servicio REST externo (JSONPlaceholder)
app.get('/api/actividades', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5');
    res.json({
      servidor: process.env.HOSTNAME || "Instancia-EC2",
      version: "v1.0.0",
      estado: "Operativo",
      datos: response.data
    });
  } catch (error) {
    res.status(500).json({ error: "Error consultando la API externa" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});