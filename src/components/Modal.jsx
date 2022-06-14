import { useEffect, useState } from "react";
import Mensaje from "./Mensaje";
import { generarFecha, generarId } from "../helpers";
import cerrarBtn from "../img/cerrar.svg";

function Modal({
  setModal,
  animar,
  setAnimar,
  setGastos,
  gastos,
  gastoEditar,
  setGastoEditar
}) {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [categoria, setCategoria] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleCerrar = () => {
    setAnimar(false);
    setGastoEditar({})
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setNombre(gastoEditar.nombre);
      setCantidad(gastoEditar.cantidad);
      setCategoria(gastoEditar.categoria);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre.trim(), cantidad, categoria].includes("")) {
      setMensaje("Todos los campos son obligatorios");
      setTimeout(() => {
        if (!mensaje) {
          setMensaje("");
        }
      }, 3000);
      return;
    }
    //=============== objeto del gasto ===============
    const objGasto = {
      nombre,
      cantidad: Number(cantidad),
      categoria,
    };
    //=============== editar gasto ===============
    if (Object.keys(gastoEditar).length > 0) {
      const gastosActualizados = gastos.map((gastoState) => {
        if (gastoState.id === gastoEditar.id) {
          objGasto.id = gastoEditar.id;
          objGasto.fecha = gastoEditar.fecha;
          return objGasto;
        }
        return gastoState;
      });
      setGastos(gastosActualizados);
    } else {
      //=============== agregar gasto ===============
      objGasto.id = generarId();
      objGasto.fecha = generarFecha();
      setGastos([...gastos, objGasto]);
    }
    setMensaje("");
    handleCerrar();
    setGastoEditar({})
    //=============== resetear formulario ===============
    setNombre("");
    setCantidad(""); 
    setCategoria("");
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img onClick={handleCerrar} src={cerrarBtn} alt="cerrar" />
      </div>

      <form
        className={`formulario ${animar ? "animar" : "cerrar"}`}
        onSubmit={handleSubmit}
      >
        <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className="campo">
          <label htmlFor="nombre">Nombre Gasto</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del gasto"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="cantidad">Cantidad</label>
          <input
            id="cantidad"
            type="number"
            placeholder="Añade la cantidad del gasto ej.300"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>

        <div className="campo">
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="" disabled>
              -- Seleccione --
            </option>
            <option value="ahorro">Ahorro</option>
            <option value="comida">Comida</option>
            <option value="casa">Casa</option>
            <option value="gastos">Gastos</option>
            <option value="ocio">Ocio</option>
            <option value="salud">Salud</option>
            <option value="suscripciones">Suscripciones</option>
          </select>
        </div>
        <input
          type="submit"
          value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
        />
      </form>
    </div>
  );
}

export default Modal;
