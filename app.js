require('dotenv').config();
const express = require('express');
const userRoute = require('./routes/userRoute');
const db = require('./models/dbConfig');
const bodyParser = require('body-parser');

const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(userRoute);

app.set('view engine','ejs');
app.set('views','IHM');


//le serveur a l'attente des requetes
app.listen(3000,()=>{
    console.log(`le port 3000 pret a vous ecouter`);
})