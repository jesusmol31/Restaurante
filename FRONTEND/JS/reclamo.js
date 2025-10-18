const formReclamo = document.querySelector(".form-reclamo");
const inpuNombre = document.getElementById("nombre");
const inputCorreo = document.getElementById("correo");
const inputTelefono = document.getElementById("telefono");
const selectTipoDocumento = document.getElementById("tipoDocumento");
const inputNumDocumento = document.getElementById("numDocumento");
const inputNumPedido = document.getElementById("numPedido");
const inputFechaPedido = document.getElementById("fechaPedido");
const selectTipoSolicitud = document.getElementById("tipoReclamo");
const inputDepartamento = document.getElementById("departamento");
const inputProvincia = document.getElementById("provincia");
const inputDistrito = document.getElementById("distrito");
const inputDireccion = document.getElementById("direccion");
const inputMonto = document.getElementById("monto");
const inputDetalle = document.getElementById("detalle");

function verificar(){
    if(inpuNombre.value === "" || inputCorreo.value === "" || inputTelefono.value === "" || selectTipoDocumento.value === "" || inputNumDocumento.value === "" || inputNumPedido.value === "" || inputFechaPedido.value === "" || selectTipoSolicitud.value === "" || inputDepartamento.value === "" || inputProvincia.value === "" || inputDistrito.value === "" || inputDireccion.value === "" || inputMonto.value === "" || inputDetalle.value === ""){
        alert("Rellenar todos los campos")
        return
    }
}


formReclamo.addEventListener("submit",async(e)=>{
    e.preventDefault();

    verificar();

    const reclamo = {
        "nombreCompleto": inpuNombre.value,
        "correo": inputCorreo.value,
        "telefono": inputTelefono.value,
        "tipoDocumento": selectTipoDocumento.value,
        "numDocumento": inputNumDocumento.value,
        "fechaPedido": inputFechaPedido.value,
        "tipoSolicitud": selectTipoSolicitud.value,
        "departamento": inputDepartamento.value,
        "provincia": inputProvincia.value,
        "distrito": inputDistrito.value,
        "direccion": inputDireccion.value,
        "montoReclamo": inputMonto.value,
        "detalles": inputDetalle.value
    }

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts`,{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reclamo)
    })

    const data = await res.json();

    console.log(data)
})