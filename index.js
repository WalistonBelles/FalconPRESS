const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./database/database');

// View Engine
app.set('view engine', 'ejs');

// Static
app.use(express.static('public'));

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Database
connection
    .authenticate()
    .then(() =>{
      console.log('Conexão realizada com sucesso!');  
    }).catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    res.send("Bem vindo ao site");
});

app.listen(3000, () => {
    console.log("O servidor está rodando!");
});