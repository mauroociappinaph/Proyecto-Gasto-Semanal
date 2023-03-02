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

class Presupuesto {
    constructor (presupuesto) {
        this.presupuesto = Number(presupuesto);
        this.restante = Number(presupuesto);
        this.gastos =[];
    }
}

class UI {
    insertarPresupuesto (cantidad) {

        //? Extrayendo Valor.

    const {presupuesto , restante} = cantidad;

    //? Agregamos al html


    document.querySelector('#total').textContent = cantidad.presupuesto;
    document.querySelector('#restante').textContent = cantidad.restante;
    }

    imprimirAlerta(mensaje , tipo) {
    //Crear el div 
    const divMensaje =  document.createElement('div') ; 
    divMensaje.className.add ('text-center', 'alert')
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


// Leer datos del formulario
const nombre = document.querySelector('#gasto').value; 
const cantidad = document.querySelector('#cantidad').value; 

//Validar 

if (nombre === ' ' || cantidad === '') {
    ui.imprimirAlerta('Ambos campos son obligatorios' , 'error');
}
}