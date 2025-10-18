const btnInicio = document.getElementById("btn-iniciar__sesion");

// btnInicio.addEventListener("click",()=>{
    
// })


const principal = document.querySelector(".main");
const buscadorHeader = document.querySelector(".input-buscar__container");
const contenedorRealizarPedido = document.querySelector(".realizar-pedido__container");

const liPerfil = document.getElementById("li-perfil");
const liCarta = document.getElementById("li-carta");
const liBuscar = document.getElementById("li-buscar");
const liReclamo = document.getElementById("li-reclamo");
const liCarrito = document.getElementById("li-carrito");

liPerfil.addEventListener("click",()=>{
    cargarVista("perfilUsuario")
    eliminarBuscador();
    eliminarContenedorRealizarPedido();
})

liCarta.addEventListener("click",()=>{
    cargarVista("menu");
    eliminarBuscador();
    eliminarContenedorRealizarPedido();
})

liBuscar.addEventListener("click",()=>{
    cargarVista("buscar")
    eliminarContenedorRealizarPedido();
    buscadorHeader.classList.add("active-buscar")
})

liReclamo.addEventListener("click",()=>{
    cargarVista("reclamaciones");
    eliminarBuscador();
    eliminarContenedorRealizarPedido();
})

liCarrito.addEventListener("click",()=>{
    cargarVista("carrito");
    eliminarBuscador();
    contenedorRealizarPedido.classList.add("active-realizar-pedido")
})


function eliminarBuscador(){
    if(buscadorHeader.classList.contains("active-buscar")){
        buscadorHeader.classList.remove("active-buscar")
    }
}

function eliminarContenedorRealizarPedido(){
    if(contenedorRealizarPedido.classList.contains("active-realizar-pedido")){
        contenedorRealizarPedido.classList.remove("active-realizar-pedido")
    }
}




async function cargarVista(nombreVista) {
    const res = await fetch(`../FRONTEND/VISTAS/${nombreVista}.html`)
    const data = await res.text();

    principal.innerHTML = data

    if (nombreVista === "menu") {
        const script = document.createElement("script");
        script.src = "../FRONTEND/JS/carta.js";
        document.body.appendChild(script);
    }

    if (nombreVista === "perfilUsuario") {
        const script = document.createElement("script");
        script.src = "../FRONTEND/JS/perfil.js";
        document.body.appendChild(script);
    }

    if (nombreVista === "buscar") {
        const script = document.createElement("script");
        script.src = "../FRONTEND/JS/buscar.js";
        document.body.appendChild(script);
    }

    if (nombreVista === "carrito") {
        const script = document.createElement("script");
        script.src = "../FRONTEND/JS/carrito.js";
        document.body.appendChild(script);
    }

    if (nombreVista === "reclamaciones") {
        const script = document.createElement("script");
        script.src = "../FRONTEND/JS/reclamo.js";
        document.body.appendChild(script);
    }
}



window.addEventListener("DOMContentLoaded",()=>{
    cargarVista("menu")
})

window.carrito = []

window.carritoFinal = JSON.parse(localStorage.getItem("carrito")) || [];