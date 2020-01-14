const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

require('dotenv').config();

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(process.env.DATABASE_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connectedUsers = {};

io.on('connection', socket => {
    console.log('conected user',socket.id);

    const {user_id} = socket.handshake.query;

    connectedUsers[user_id] = socket.id;
});

// GET, POST, PUT, DELETE

// req.query == acessa query params (para filtros)
//req.params == acessar route params (para edicao e delite)
//req.body == acessar corpo da requisicao (para criacao e edicao)

app.use((req,res,next)=>{
    req.io =io;
    req.connectedUsers = connectedUsers;
    
    return next();
})

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname,'..','uploads')));
app.use(routes)



server.listen(3333);