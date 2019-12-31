const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const routes = require('./routes');
const path = require('path');
require('dotenv').config();

const app = express();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// GET, POST, PUT, DELETE

// req.query == acessa query params (para filtros)
//req.params == acessar route params (para edicao e delite)
//req.body == acessar corpo da requisicao (para criacao e edicao)

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes)



app.listen(3333);