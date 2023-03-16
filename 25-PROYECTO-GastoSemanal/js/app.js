//Variables y Selectores

const formulario = document.getElementById("agregar-gasto");
const gastosListado = document.querySelector("#gastos ul");

//Eventos

eventListeners();

function eventListeners() {
  document.addEventListener("DOMContentLoaded", preguntarPresupuesto);
  formulario.addEventListener("submit", agregarGasto);
}

//Clases

/*Esta clase se encarga de administrar
un presupuesto. Almacena el presupuesto total,
el presupuesto restante y los gastos realizados. */

class Presupuesto {
  constructor(presupuesto) {
    this.presupuesto = Number(presupuesto);
    this.restante = Number(presupuesto);
    this.gastos = [];
  }

  nuevoGasto(gasto) {
    this.gastos = [...this.gastos, gasto];
    this.calcularRestante();
  }

  calcularRestante(){
    const gastado = this.gastos.reduce((total , gasto) =>  total + gasto.cantidad , 0 ); 
    this.restante = this.presupuesto - gastado;

    console.log(this.restante);
 
  }
}

/* pudo imprimir mensajes de alerta en la pantalla 
si se cometían errores al ingresar los datos. */

class UI {
  insertarPresupuesto(cantidad) {
    //? Extrayendo Valor.
    const { presupuesto, restante } = cantidad;
    //? Agregamos al html
    document.querySelector("#total").textContent = cantidad.presupuesto;
    document.querySelector("#restante").textContent = cantidad.restante;
  }

  imprimirAlerta(mensaje, tipo) {
    //Crear el div
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("text-center", "alert"); //? Alert es clase de Bootstrap.

    if (tipo === "error") {
      divMensaje.classList.add("alert-danger"); //? Alert-danger es clase de Bootstrap.
    } else {
      divMensaje.classList.add("alert-success"); //? Alert-success es clase de Bootstrap.
    }

    //?Mensaje  de error
    divMensaje.textContent = mensaje;

    //? INSERTAR EN EL HTML
    document.querySelector(".primario").insertBefore(divMensaje, formulario);

    //? QUITAR HTML
    setTimeout(() => {
      divMensaje.remove();
    }, 3000);
  }

  agregarGastoListado(gastos) {
this.limpiarHTML(); //! Elimina el HTML previo

    //! Iterar sobre gastos
    gastos.forEach((gasto) => {
      const { cantidad, nombre, id } = gasto;

      //! Crear un li
      const nuevoGasto = document.createElement("li");
      nuevoGasto.className =
        " list-group-item d-flex justify-content-between align-items-center";
      nuevoGasto.dataset.id = id;

      console.log(nuevoGasto);
      //! Agregar al HTML del gasto
        nuevoGasto.innerHTML = `${nombre} <span class="badge badge-primary badge-pill">$ ${cantidad} </span>`

      //! Botones para borra el gasto
    const btnBorrar = document.createElement("button");
    btnBorrar.classList.add("btn" , "btn-danger" , "borrar-gasto" );
        btnBorrar.innerHTML = "Borrar &times;"
    nuevoGasto.appendChild(btnBorrar);
      //! Agregar el HTML

      gastosListado.appendChild(nuevoGasto);
    });
  }
  limpiarHTML(){
    while (gastosListado.firstChild) {
        gastosListado.removeChild(gastosListado.firstChild);
    }
  };
  actualizarRestante(restante){
    document.querySelector("#restante").textContent = restante;
  }

  comprobarPresupuesto(presupuestoObj){
  const {presupuesto , restante } = presupuestoObj;
  const restanteDiv = document.querySelector(".restante");
  //! Comprobar 25% 
if ((presupuesto / 4) > restante) {
    restanteDiv.classList.remove ("alert-success" , "alert-warning");
    restanteDiv.classList.add ("alert-danger");

    
} else if ((presupuesto /2 ) > restante ){
  restanteDiv.classList.remove ("alert-success");
  restanteDiv.classList.add ("alert-warning");
}

//! Si el total es  0 o menor  
if (restante <= 0) {
  ui.imprimirAlerta ("El presupuesto se ha agotado" , "error");

  
  formulario.querySelector('button[type="submit"]').disabled = true;

}

}

}
//Instancias

const ui = new UI();
let presupuesto;

//Funciones

function preguntarPresupuesto() {
  const presupuestoUsuario = prompt("¿Cual es tu presupuesto?");

  console.log(Number(presupuestoUsuario));

  if (
    presupuestoUsuario === " " ||
    presupuestoUsuario === null ||
    isNaN(presupuestoUsuario) ||
    presupuestoUsuario <= 0
  ) {
    window.location.reload();
  }

  presupuesto = new Presupuesto(presupuestoUsuario);
  console.log(presupuesto);

  ui.insertarPresupuesto(presupuesto);
}

// Anade gastos

function agregarGasto(e) {
  e.preventDefault();

  //! Leer datos del formulario
  const nombre = document.querySelector("#gasto").value;
  const cantidad = Number(document.querySelector("#cantidad").value);

  //! Validar

  if (nombre == "" || cantidad == "") {
    ui.imprimirAlerta("Ambos campos son obligatorios", "error");
    return;
  } else if (cantidad <= 0 || isNaN(cantidad)) {
    ui.imprimirAlerta("Cantidad no válida", "error");
    return;
  }

  //! Generar un objeto con el gasto
  const gasto = { nombre, cantidad, id: Date.now() }; //? Objeto Creado

  //! Añade un nuevo gasto
  presupuesto.nuevoGasto(gasto);

  //! Mensaje todo bien
  ui.imprimirAlerta("Gasto agregados correctamente");

  //! Imprimir los gastos
  const { gastos , restante } = presupuesto; //Destructuring
  ui.agregarGastoListado(gastos);

  ui.actualizarRestante(restante);

  ui.comprobarPresupuesto(presupuesto);

  //! Reiniciar un formulario
  formulario.reset();
}
