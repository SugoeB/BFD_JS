const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('app GET')
});

app.post('/', (req, res) => {
    res.send('app POST')
});

app.delete('/', (req, res) => {
    res.send('app DELETE')
});

app.listen(PORT, () => {
    console.log(`app aberto na porta ${PORT}`)
});
