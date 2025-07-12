const express = require('express');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



app.get('/sugestao', (req, res) => {
    const { nome, ingredientes } = req.query;
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-br"><head><meta charset="UTF-8"><title>Obrigado!</title><link rel="stylesheet" href="/css/style.css"></head>
        <body><div class="container">
            <h1>Obrigado pela sua sugestão!</h1>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Ingredientes:</strong> ${ingredientes}</p>
            <a href="/">Voltar</a>
        </div></body></html>
    `);
});


app.get('/contato', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'contato.html'));
});


app.post('/contato', (req, res) => {
    const { nome, email, assunto, mensagem } = req.body;
    res.status(200).send(`
        <!DOCTYPE html>
        <html lang="pt-br"><head><meta charset="UTF-8"><title>Mensagem Recebida</title><link rel="stylesheet" href="/css/style.css"></head>
        <body><div class="container">
            <h1>Mensagem Recebida, ${nome}!</h1>
            <p>Obrigado pelo seu contato.</p>
            <a href="/">Voltar</a>
        </div></body></html>
    `);
});


app.get('/api/lanches', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data', 'lanches.json'));
});


app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});


app.listen(PORT, () => {
    console.log(`Servidor da DevBurger rodando em http://localhost:${PORT}`);
});