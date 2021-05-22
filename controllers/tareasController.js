const Tareas = require('../models/Tareas');
const Proyectos = require('../models/Proyectos');

exports.agregarTarea = async (req,res,next) => {
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});

    console.log(proyecto)
    console.log(req.body);

    const {tarea} = req.body;
    //estado 0 = incompleto
    const estado = 0;
    const proyectoId = proyecto.id;

    const resultado = await Tareas.create({tarea, estado, proyectoId});

    if(!resultado){
        return next()
    }

    res.redirect(`/proyectos/${req.params.url}`);
}

exports.cambiarEstadoTarea = async (req,res, next) =>{
    // console.log(req.params);
    const {id} = req.params;

    const tarea = await Tareas.findOne({
        where: {id}
    })

    let estado = 0;
    if(tarea.estado === estado) {
        estado = 1;
    }
    tarea.estado = estado;

    const resultado = await tarea.save();

    if(!resultado) return next;

    res.send('Cambio de estado');
}