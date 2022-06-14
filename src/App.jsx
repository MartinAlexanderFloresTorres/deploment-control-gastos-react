import { useState, useEffect } from "react";
import Header from "./components/Header";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";
import Modal from "./components/Modal";
import iconoNuevoGasto from "./img/nuevo-gasto.svg";

const body = document.querySelector("body");

function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto-v1")) || 0
  );
  const [isIsValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animar, setAnimar] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos-v1")) || []
  );
  const [gastoEditar, setGastoEditar] = useState({});
  const [filtro, setFiltro] = useState("");
  const [gastosFiltados, setGastosFiltrados] = useState([])

  useEffect(()=>{
    if (filtro) {
      const gastosFilter = gastos.filter((gastoState => gastoState.categoria === filtro))
      setGastosFiltrados(gastosFilter)
    }
  },[filtro])

  useEffect(() => {
    if (presupuesto) {
      setIsValidPresupuesto(true);
    }
  },[]);

  useEffect(() => {
    localStorage.setItem("gastos-v1", JSON.stringify(gastos));
  }, [gastos]);

  const abrirModal = () => {
    setModal(true);
    setTimeout(() => {
      setAnimar(true);
    }, 300);
  };

  const handleNuevoGasto = () => {
    setGastoEditar({});
    abrirModal();
  };

  //=============== useEffect de gastoEditar para Abrir modal ===============
  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      abrirModal();
    }
  }, [gastoEditar]);

  //=============== useEffect modal ===============
  useEffect(() => {
    if (modal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  }, [modal]);

  //=============== eliminar gasto ===============
  const eliminarGasto = (id) => {
    const gastosActualizados = gastos.filter(
      (gastoState) => gastoState.id !== id
    );
    setGastos(gastosActualizados);
  };

  return (
    <div>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isIsValidPresupuesto={isIsValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />
      {isIsValidPresupuesto && (
        <main>
          <Filtros filtro={filtro} setFiltro={setFiltro} />
          <ListadoGastos
            gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
            filtro={filtro}
            gastosFiltados={gastosFiltados}
          />
          <div className="nuevo-gasto">
            <img onClick={handleNuevoGasto} src={iconoNuevoGasto} alt="icono" />
          </div>
        </main>
      )}

      {modal && (
        <Modal
          setModal={setModal}
          animar={animar}
          setAnimar={setAnimar}
          gastoEditar={gastoEditar}
          setGastoEditar={setGastoEditar}
          setGastos={setGastos}
          gastos={gastos}
        />
      )}
    </div>
  );
}

export default App;
