const {where} = require('sequelize');
const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas')
exports.proyectosHome = async (req,res) => {
    const proyectos = await Proyectos.findAll()

    res.render('index', {
        nombrePagina : 'Proyectos',
        proyectos
    })
}

exports.formularioProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    })
}

exports.nuevoProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();

    const {nombre} = req.body;
    let errores = [];
    if(!nombre) {
        errores.push({'texto': 'Agregar un nombre al Proyecto'});
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        let proyectoCreado = await Proyectos.create({nombre})
        console.log(proyectoCreado)
        res.redirect('/');
    }
}

exports.proyectoPorUrl = async (req,res, next) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where: {
            url: req.params.url
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);

    const tareas = await Tareas.findAll({
        where: {
            proyectoId: proyecto.id
        },
        include: [
            { model: Proyectos}
        ]
    })

    console.log(tareas)

    if(!proyecto) {
        return next();
    }
    
    res.render('tareas', {
        nombrePagina: 'Tareas del Proyecto',
        proyecto,
        proyectos,
        tareas
    })
}

exports.formularioEditar = async (req,res) => {
    const proyectosPromise = Proyectos.findAll();
    const proyectoPromise = Proyectos.findOne({
        where :{
            id: req.params.id
        }
    });

    const [proyectos, proyecto] = await Promise.all([proyectosPromise, proyectoPromise]);
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto
    })
}

exports.actualizarProyecto = async (req,res) => {
    const proyectos = await Proyectos.findAll();
    console.log(req.body);

    const {nombre} = req.body;
    let errores = [];
    if(!nombre) {
        errores.push({'texto': 'Agregar un nombre al Proyecto'});
    }

    if(errores.length > 0){
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos
        })
    } else {
        await Proyectos.update(
            {nombre : nombre},
            {where: {
                id: req.params.id
                }
            }
        )
        res.redirect('/');
    }
}

exports.eliminarProyecto = async(req,res,next) => {
    console.log(req.params);
    const {urlProyecto} = req.query;

    const resultado = await Proyectos.destroy({where: {url: urlProyecto}});

    if(!resultado){
        return next();
    }
    
    res.status(200).send('Proyecto eliminado correctamente')
}