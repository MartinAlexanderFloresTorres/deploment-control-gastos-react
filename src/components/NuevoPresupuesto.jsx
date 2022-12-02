import { useState } from 'react'
import Mensaje from './Mensaje'

function NuevoPresupuesto(props) {
  const { presupuesto, setPresupuesto, setIsValidPresupuesto } = props
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!(presupuesto > 0)) {
      setMensaje('No es un presupuesto valido')
      setTimeout(() => {
        if (!mensaje) setMensaje('')
      }, 3000)
      return
    }

    if (presupuesto > 100000) {
      setMensaje('El presupuesto es muy alto')
      setTimeout(() => {
        if (!mensaje) setMensaje('')
      }, 3000)
      return
    }

    //=============== mostrar presupuesto ===============
    setMensaje('')
    setIsValidPresupuesto(true)
    localStorage.setItem('presupuesto-v1', presupuesto)
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra'>
      <form onSubmit={handleSubmit} className='formulario'>
        <div className='campo'>
          <label htmlFor='presupuesto'>Definir Presupuesto</label>
          <input
            className='nuevo-presupuesto'
            type='number'
            value={presupuesto}
            onChange={(e) => setPresupuesto(Number(e.target.value))}
            placeholder='Añade tu Presupuesto'
          />
        </div>
        <input type='submit' value='Añadir' />
        {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}
      </form>
    </div>
  )
}

export default NuevoPresupuesto
