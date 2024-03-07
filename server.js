const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve os arquivos estáticos gerados pelo Angular
app.use(express.static(path.join(__dirname, 'dist/financas-angular/browser')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/financas-angular/browser/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
