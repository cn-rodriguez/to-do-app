import { guardarDB, leerDB } from './helpers/guardarArchivo.js';
import { 
        inquirerMenu, 
        pausar, 
        leerInput, 
        listadoTareasBorrar,
        mostrarListadoChecklist, 
        confirmar,  } from './helpers/inquirer.js';
import { Tareas } from './models/tareas.js';
// const Tarea = require('../models/tarea')

// const { mostrarMenu, pausa } = require('./helpers/messages')

const main = async() => {
    
    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        // console.log(tareasDB);
        tareas.cargarTareasFromArray(tareasDB);
        
    }
    // await pausar();

    do {
        opt = await inquirerMenu();
        // console.log({opt})
        
        switch (opt) {
            case '1':
                const description = await leerInput('Descripcion:');
                tareas.crearTarea(description);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas();
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if (id !== '0') {
                    const ok = await confirmar('Estas seguro?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }
                }
                break;

            break;
        }

        guardarDB(tareas.listadoArr)
            
        await pausar()
    } while (opt !== '0');
}

main();