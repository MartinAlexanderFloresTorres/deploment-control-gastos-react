import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { formatearCantidad } from "../helpers";

function ControlPresupuesto({
  presupuesto,
  setPresupuesto,
  gastos,
  setGastos,
  setIsValidPresupuesto,
  setPreLs,
}) {
  const [gastado, setGastado] = useState(0);
  const [disponible, setDisponible] = useState(0);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    const totalGastado = gastos.reduce(
      (total, gasto) => gasto.cantidad + total,
      0
    );
    setGastado(totalGastado);
  }, [gastos]);

  useEffect(() => {
    const totalDisponible = presupuesto - gastado;
    setDisponible(totalDisponible);
    //=============== calcular el porcentaje gastado ===============
    const nuevoPorcentaje = Number(
      (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)
    );
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje);
    }, 1000);
  }, [gastado]);

  const handleResetApp = () => {
    const confirma = confirm("¿Deseas reiniciar presupuesto y gastos?");
    if (confirma) {
      localStorage.removeItem("presupuesto-v1");
      setPresupuesto(0);
      setGastos([]);
      setIsValidPresupuesto(false);
      setPreLs(0);
    }
  };

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
            trailColor: "#F1F1F1",
            textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          })}
          text={`${porcentaje}% Gastado`}
          value={porcentaje}
        />
      </div>

      <div className="contenido-presupuesto">
        <button className="reset-app" type="button" onClick={handleResetApp}>
          Resetear App
        </button>
        <p>
          <span>presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>

        <p className={`${disponible < 0 ? "negativo" : ""}`}>
          <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>

        <p>
          <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  );
}

export default ControlPresupuesto;
