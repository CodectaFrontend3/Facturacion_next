const express = require('express');
const path = require('path');
const app = express();
const puerto = 3000;

app.use(express.static(path.join(__dirname, 'src', 'public')));

// Ruta del Login
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'login.html'));
});

// NUEVA RUTA: Inicio (Dashboard)
app.get('/inicio', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'public', 'inicio.html'));
});

// Redirección por defecto
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(puerto, () => {
  console.log(`Servidor listo. Entra a http://localhost:${puerto}/login`);
});