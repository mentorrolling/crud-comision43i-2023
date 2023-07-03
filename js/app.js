//defino el arreglo productos vacio
const productos = JSON.parse(localStorage.getItem("productos")) || [];

const cuerpoTabla = document.getElementById("cuerpoTabla");

const myModal = new bootstrap.Modal(document.getElementById("updateModal"));

//Función para abrir el modal
const abrirModal = (index) => {
  document.querySelector(".modal-body").innerHTML = "";
  const formularioUpdate = document.createElement("form");

  const contenidoFormulario =
    /* HTML */
    `<div class="mb-3">
        <label class="form-label">Nombre</label>
        <input
          type="text"
          class="form-control"
          id="nombreUpdate"
          value="${productos[index].nombre}"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">Detalle</label>
        <textarea class="form-control" id="detalleUpdate" rows="3">
${productos[index].detalle}</textarea
        >
      </div>
      <div class="d-flex justify-content-between mb-3">
        <div class="col me-2">
          <label class="form-label">Url de imagen</label>
          <input
            type="text"
            class="form-control"
            id="imagenUpdate"
            value="${productos[index].imagen}"
          />
        </div>
        <div class="col">
          <label class="form-label">Precio</label>
          <input
            type="number"
            class="form-control"
            id="precioUpdate"
            value="${productos[index].precio}"
          />
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-warning"
          type="button"
          onclick="actualizarProducto(${index})"
        >
          Actualizar
        </button>
      </div>`;

  formularioUpdate.innerHTML = contenidoFormulario;
  document.querySelector(".modal-body").append(formularioUpdate);

  myModal.show();
};

const crearProductos = (e) => {
  e.preventDefault();
  //crear id del producto
  const id = new Date().getTime();

  //traer los datos del formulario
  const nombre = document.getElementById("nombreProd").value;
  const detalle = document.getElementById("detalleProd").value;
  const imagen = document.getElementById("imagenProd").value;
  const precio = document.getElementById("precioProd").value;

  //guardar esos datos en el arreglo productos y en localStorage
  //crear un objeto con los datos
  const item = {
    id,
    nombre,
    detalle,
    imagen,
    precio,
  };

  //agregarlos al arreglo
  productos.push(item);
  localStorage.setItem("productos", JSON.stringify(productos));
  //limpiar el formulario
  document.getElementById("formulario").reset();
  document.getElementById("nombreProd").focus();
  cargarTabla();
};

const borrarProducto = (index) => {
  //   productos.findIndex((item) => {
  //     return item.id == id;
  //   });
  let validar = confirm(
    `Está seguro que quiere borrar ${productos[index].nombre}`
  );

  if (validar) {
    productos.splice(index, 1);
    localStorage.setItem("productos", JSON.stringify(productos));
    cargarTabla();
  }
};

const actualizarProducto = (index) => {
  productos[index].nombre = document.querySelector("#nombreUpdate").value;
  productos[index].detalle = document.querySelector("#detalleUpdate").value;
  productos[index].imagen = document.querySelector("#imagenUpdate").value;
  productos[index].precio = document.querySelector("#precioUpdate").value;

  localStorage.setItem("productos", JSON.stringify(productos));
  cargarTabla();
  myModal.hide();
};

const cargarTabla = () => {
  cuerpoTabla.innerHTML = "";
  //por cada elemento del arreglo producto crear una fila con las celdas

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    const celdas =
      /* HTML */
      `<th scope="row">${producto.id}</th>
        <td>${producto.nombre}</td>
        <td>${producto.detalle}</td>
        <td>${producto.precio}</td>
        <td>
          <button class="btn btn-danger" onclick="borrarProducto(${index})">
            X
          </button>
          <button class="btn btn-warning" onclick="abrirModal(${index})"> &#9998</button>
        </td>`;

    fila.innerHTML = celdas;

    //agregar esa fila en el tbody
    cuerpoTabla.append(fila);
  });
};

document
  .getElementById("formulario")
  .addEventListener("submit", crearProductos);

cargarTabla();
