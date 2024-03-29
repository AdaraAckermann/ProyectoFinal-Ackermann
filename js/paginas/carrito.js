import Swal from 'sweetalert2';



let productosEnCarrito = localStorage.getItem("productos-en-carrito") ;
productosEnCarrito = JSON.parse(productosEnCarrito);
//console.log(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProductosCarrito () {

    if (productosEnCarrito) {

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    
        contenedorCarritoProductos.innerHTML = ""; //para que no se repita
    
    
        productosEnCarrito.forEach(producto => {
    
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <div class="col-md-2">
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt=""${producto.titulo}>
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h6>${producto.titulo}</h6>
                </div>
    
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
    
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
    
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                    
                  
                <button id= "${producto.id}" class="carrito-producto-eliminar btn btn-danger">
                  <i class="bi bi-trash"></i>
                </button>
            </div>
            
            `;

            contenedorCarritoProductos.append(div);
    
        });
    
        
    } else {
    
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
    }
    actualizarBotonesEliminar();
    actualizarTotal();
}

cargarProductosCarrito ();


function actualizarBotonesEliminar () {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
  
    botonesEliminar.forEach(boton => {
      boton.addEventListener("click", eliminarDelCarrito);
    });
  
}

function eliminarDelCarrito (e) {
    const idBoton = e.currentTarget.id;
    //console.log(idBoton);
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton );
    console.log(productosEnCarrito);

    productosEnCarrito.splice (index, 1);
    cargarProductosCarrito();

    //console.log(productosEnCarrito);

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

//--------------------Evento + funcion + libreria-------------------------

// asigno el evento click al boton de vaciarCarrito
botonVaciar.addEventListener("click", confirmarVaciarCarrito);

// función para mostrar el cuadro de dialogo de confirmación

function confirmarVaciarCarrito() {

    // muestra el cuadro si desea vaciar o no
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción vaciará tu carrito. ¿Deseas continuar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        // si el usuario hace clic en "Confirmar" se vacía el carrito
        
        if (result.isConfirmed) {
            vaciarCarrito();
            // mensaje de éxito
            Swal.fire({
                text:'Carrito vaciado',
                icon: "success",
                timer: 2000
            });
        }
    });
}

// ----------------Funcion para vaciar el carrito-----------------

function vaciarCarrito() {

    // vacia el array de productos en el carrito
    productosEnCarrito.length = 0;
    // recarga el carrito vacío en el localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    // recarga la visualización de productos en el carrito
    cargarProductosCarrito();
}



function actualizarTotal () {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$ ${totalCalculado}`;
}
//---------------------------------------click en comprar-------------------------------

botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito () {

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.remove("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

    cargarProductosCarrito();

    Swal.fire({
        title: '¡Muchas gracias por su compra!',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000
    });

}