//Variables y Selectores

const formulario = document.getElementById('agregar-gasto');
const gastosListado = document.querySelector('#gastos ul');


//Eventos

eventListeners();

function eventListeners() {
    document.addEventListener('DOMContentLoaded', preguntarPresupuesto);
    formulario.addEventListener('submit' , agregarGasto);
}
   

//Clases

/*Esta clase se encarga de administrar
un presupuesto. Almacena el presupuesto total,
el presupuesto restante y los gastos realizados. */

class Presupuesto {
    constructor (presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos =[];
    }

    nuevoGasto(gasto){
        this.gastos = [ ...this.gastos , gasto];
    }

}

/* pudo imprimir mensajes de alerta en la pantalla 
si se cometían errores al ingresar los datos. */

class UI {
    insertarPresupuesto (cantidad) {
        //? Extrayendo Valor.
    const { presupuesto, restante } = cantidad; 
    //? Agregamos al html
    document.querySelector('#total').textContent = cantidad.presupuesto;
    document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje , tipo) {
    //Crear el div 
    const divMensaje =  document.createElement('div') ; 
    divMensaje.classList.add ('text-center', 'alert') //? Alert es clase de Bootstrap.

    if (tipo === 'error'){
    divMensaje.classList.add ('alert-danger'); //? Alert-danger es clase de Bootstrap.
    } else {
    divMensaje.classList.add ('alert-success');//? Alert-success es clase de Bootstrap.
    }

    //*Mensaje  de error
    divMensaje.textContent = mensaje;

    //* INSERTAR EN EL HTML
    document.querySelector('.primario').insertBefore(divMensaje, formulario);

    //* QUITAR HTML
    setTimeout (() => {
        divMensaje.remove();
    }, 3000);

    }
}
//Instancias

const ui = new UI();
let presupuesto;


//Funciones

function preguntarPresupuesto() {
    const presupuestoUsuario = prompt("?Cual es tu presupuesto?");

console.log (Number (presupuestoUsuario));

    if (presupuestoUsuario === " " || presupuestoUsuario === null || isNaN(presupuestoUsuario) || presupuestoUsuario <= 0 ) {
    window.location.reload();
    }
  
    presupuesto = new Presupuesto(presupuestoUsuario);
    console.log(presupuesto);

    ui.insertarPresupuesto(presupuesto)
}




// Anade gastos

function agregarGasto(e) {
    e.preventDefault();


//! Leer datos del formulario
const nombre = document.querySelector('#gasto').value; 
const cantidad = Number( document.querySelector('#cantidad').value);



//! Validar 

if (nombre == '' || cantidad == '') {
    ui.imprimirAlerta('Ambos campos son obligatorios' , 'error');
    return;
} else if ((cantidad <= 0 || isNaN(cantidad))) {
ui.imprimirAlerta('Cantidad no válida', 'error')
return;
}
      



//! Generar un objeto con el gasto
const gasto = {nombre , cantidad, id: Date.now()}  //? Objeto Creado 

//! Añade un nuevo gasto
presupuesto.nuevoGasto(gasto);


//! Mensaje todo bien
ui.imprimirAlerta('Gasto agregados correctamente');


//! Reiniciar un formulario
formulario.reset()
} 