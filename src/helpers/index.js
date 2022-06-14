//=============== generar id ===============
function generarId() {
  const fecha = Date.now().toString(36).substr(2);
  const random = Math.random().toString(36).substr(2);
  return fecha + random;
}
//=============== generar fecha ===============
function generarFecha() {
  const fecha = new Date();
  const opciones = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };
  return fecha.toLocaleDateString("es-ES", opciones);
}
//=============== formatear Cantidad ===============
function formatearCantidad(cantidad) {
  return cantidad.toLocaleString("es-PE", {
    style: "currency",
    currency: "PEN",
  });
}

export { generarId, generarFecha, formatearCantidad };
