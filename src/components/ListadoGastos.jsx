import Gasto from "./Gasto";

function ListadoGastos({
  gastos,
  setGastoEditar,
  eliminarGasto,
  filtro,
  gastosFiltados,
}) {
  const contenidoGastos = () => (
    <>
      <h2>{gastos.length ? "Gastos" : "No hay gastos aùn"}</h2>
      {gastos.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))}
    </>
  );
  const contenidoFiltros = () => (
    <>
      <h2>
        {gastosFiltados.length ? "Gastos" : "No hay gastos en esta categoria"}
      </h2>
      {gastosFiltados.map((gasto) => (
        <Gasto
          key={gasto.id}
          gasto={gasto}
          setGastoEditar={setGastoEditar}
          eliminarGasto={eliminarGasto}
        />
      ))}
    </>
  );

  return (
    <div className="listado-gastos contenedor">
      {filtro ? contenidoFiltros() : contenidoGastos()}
    </div>
  );
}

export default ListadoGastos;
