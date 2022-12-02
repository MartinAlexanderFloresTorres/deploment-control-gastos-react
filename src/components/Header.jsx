import { useState } from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

function Header(props) {
  const {
    presupuesto,
    setPresupuesto,
    isIsValidPresupuesto,
    setIsValidPresupuesto,
    gastos,
    setGastos
  } = props
  const [preLs, setPreLs] = useState(Number(localStorage.getItem('presupuesto-v1')) || 0)

  const mostrarContenido = () => {
    if (isIsValidPresupuesto || preLs) {
      return (
        <ControlPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          gastos={gastos}
          setGastos={setGastos}
          setIsValidPresupuesto={setIsValidPresupuesto}
          setPreLs={setPreLs}
        />
      )
    } else {
      return (
        <NuevoPresupuesto
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />
      )
    }
  }

  return (
    <header>
      <h1>Planificador de Gastos</h1>
      {mostrarContenido()}
    </header>
  )
}

export default Header
