const agregarBtn = document.querySelector('#ag-tarea');
const form = document.querySelector('#barra-creadora');
const lista = document.querySelector('#barra')
const inputTarea = document.querySelector("#barra-text")
let tareas = [];

const renderTareas = () =>{
  lista.innerHTML ='';
  let completadas = 0; // Contador de tareas completadas
  tareas.forEach(tarea =>{
      const li= document.createElement('li');
      li.classList.add('list-item');
      li.id = tarea.id;
      li.innerHTML = `
          <svg class="x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          <h1>${tarea.tarea}</h1>
          <svg class="check" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
      `;
      if (tarea.completada) {
          li.classList.add('tachado');
          completadas++; // Incrementar el contador de tareas completadas
      }
      lista.append(li);
  });

  // Calcular tareas totales e incompletas
  const totalTareas = tareas.length;
  const incompletas = totalTareas - completadas;

  // Actualizar el texto de la información de tareas
  document.getElementById('info-tareas').innerHTML = `
      <h1>Total: ${totalTareas}</h1>
      <h2>Completadas: ${completadas}</h2>
      <h3>Pendientes: ${incompletas}</h3>
  `;
}

form.addEventListener('submit', e =>{
    e.preventDefault();
    const tareaTexto = inputTarea.value.trim();
    if (tareaTexto === '') {
        alert('Por favor, ingrese una tarea válida.');
        return;
    }

    const lastElement = tareas[tareas.length - 1];
    const newTarea = {
        id: lastElement ? lastElement.id + 1 : 1,
        tarea: inputTarea.value,
        completada: false // Añadir propiedad completada inicializada en falso
    };
    tareas = tareas.concat(newTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    renderTareas();
});

lista.addEventListener('click', e =>{
    const deleteBtn = e.target.closest('.x');
    const checkBtn = e.target.closest('.check');
    
    if (deleteBtn) {
        const id = Number(deleteBtn.parentElement.id);
        tareas = tareas.filter(tarea => tarea.id !== id);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        renderTareas();
    } else if (checkBtn) {
        const id = Number(checkBtn.parentElement.id);
        const tareaIndex = tareas.findIndex(tarea => tarea.id === id);
        if (tareaIndex !== -1) {
            tareas[tareaIndex].completada = !tareas[tareaIndex].completada; // Cambiar el estado de completada
            localStorage.setItem('tareas', JSON.stringify(tareas));
            renderTareas();
        }
    }
});

// Cargar tareas del localStorage al inicio
window.addEventListener('DOMContentLoaded', () => {
    const tareasGuardadas = localStorage.getItem('tareas');
    if (tareasGuardadas) {
        tareas = JSON.parse(tareasGuardadas);
        renderTareas();
    }
});
