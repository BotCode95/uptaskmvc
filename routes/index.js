const express = require('express');
const router = express.Router();

const {body} = require('express-validator');

const proyectosController = require('../controllers/proyectosController');
const tareasController = require('../controllers/tareasController');

module.exports = function() {
    router.get('/', proyectosController.proyectosHome);
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post('/nuevo-proyecto', 
                body('nombre').not().isEmpty().trim().escape(),
                proyectosController.nuevoProyecto)

    //listar proyectos
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl)

    //Actualizar proyecto
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)

    router.post('/nuevo-proyecto/:id', 
                body('nombre').not().isEmpty().trim().escape(),
                proyectosController.actualizarProyecto)


    router.delete('/proyectos/:url', proyectosController.eliminarProyecto)


    //routes tareas

    router.post('/proyectos/:url', tareasController.agregarTarea)

    router.patch('/tareas/:id', tareasController.cambiarEstadoTarea)

    return router;
}
