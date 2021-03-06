import axios from "axios";

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
    tareas.addEventListener('click', e => {
        if(e.target.classList.contains('fa-check-circle')){
            const icono = e.target;
            const idTarea = icono.parentElement.parentElement.dataset.tarea;

            console.log(idTarea)

            const url = `${location.origin}/tareas/${idTarea}`;

            axios.patch(url, {idTarea})
            .then(function(response){
                if(response.status === 200) {
                    icono.classList.toggle('completo');
                }
            })
        }
    })
}

export default tareas;