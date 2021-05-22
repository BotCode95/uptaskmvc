const express = require('express');
const routes = require('./routes')
const path = require('path');
const {body} = require('express-validator')
const app = express();


//helpers
const helpers = require('./helpers')

//Crear la conexion db
const db= require('./config/db');
//Importar el model
require('./models/Proyectos');
require('./models/Tareas');

db.sync()
    .then(() => console.log('Conectado al servidor'))
    .catch(() => console.log('Error en la conexion al servidor'));

// app.use(expressValidator())
app.use(express.static('public'));
app.set('view engine', 'pug');

app.set('views', path.join(__dirname, './views'));

app.use((req,res,next) => {
    //res.locals permite reutilizar una funcion en los demas archivos
    res.locals.year = 2021
    res.locals.vardump = helpers.vardump
    next()
})

app.use(express.urlencoded({extended: true}))
app.use('/', routes());

app.listen(3000);



