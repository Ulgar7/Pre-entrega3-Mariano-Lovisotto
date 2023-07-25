document.addEventListener("DOMContentLoaded", function() {
    const productos = document.querySelectorAll("#productos li");
    const carritoLista = document.getElementById("carrito-lista");
    const totalSpan = document.getElementById("total");
    let carrito = [];
  
    // Cargar carrito del localStorage si existe
    if (localStorage.getItem("carrito")) {
      carrito = JSON.parse(localStorage.getItem("carrito"));
      actualizarCarrito();
    }
  
    productos.forEach((producto, index) => {
      const agregarBtn = producto.querySelector(".agregar-btn");
      const cantidadInput = producto.querySelector("input");
  
      agregarBtn.addEventListener("click", () => {
        const cantidad = parseInt(cantidadInput.value);
        if (cantidad > 0) {
          agregarAlCarrito(index, cantidad);
        }
      });
    });
  
    function agregarAlCarrito(index, cantidad) {
      const productoExistente = carrito.find(item => item.index === index);
  
      if (productoExistente) {
        productoExistente.cantidad += cantidad;
      } else {
        const nombre = productos[index].querySelector("span").textContent.split(" - ")[0];
        const precio = parseInt(productos[index].querySelector("span").textContent.split("$")[1]);
        carrito.push({ index, nombre, precio, cantidad });
      }
  
      guardarCarritoEnLocalStorage();
      actualizarCarrito();
    }
  
    function eliminarDelCarrito(index) {
      carrito = carrito.filter(item => item.index !== index);
      guardarCarritoEnLocalStorage();
      actualizarCarrito();
    }
  
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem("carrito", JSON.stringify(carrito));
    }
  
    function actualizarCarrito() {
      carritoLista.innerHTML = "";
      let total = 0;
  
      carrito.forEach(item => {
        const li = document.createElement("li");
        li.innerHTML = `${item.nombre} - Cantidad: ${item.cantidad} - Subtotal: $${item.cantidad * item.precio} 
                        <button class="eliminar-btn">Eliminar</button>`;
        carritoLista.appendChild(li);
        total += item.cantidad * item.precio;
  
        const eliminarBtn = li.querySelector(".eliminar-btn");
        eliminarBtn.addEventListener("click", () => {
          eliminarDelCarrito(item.index);
        });
      });
  
      totalSpan.textContent = total;
    }
  });