// É um componente de botão para React com várias variantes e comportamentos.
// Inclui:
// - Interface `ButtonProps` para definir propriedades como 'value', 'variant', 'onClick'.
// - Importação de estilos e ícones.
// - Renderização condicional para criar diferentes tipos de botões, incluindo botões de navegação e ação.

import './styles.css'
import { ReactElement } from 'react'
import { GenericBlock } from '../Blocks'
import { faImages, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default function BlockArea(): ReactElement {
  return (
    <div
      style={{
        backgroundColor: 'transparent',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        overflowY: 'scroll',
        flexDirection: 'column',
        gap: '10px'
      }}
    >
      <span
        style={{
          width: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: 'offwhite'
        }}
      >
        <GenericBlock type="start" color="green" icon={faImages} />
        {/* <GenericBlock type="middle" color="yellow" icon={faMusic} />
        <GenericBlock type="middle" color="darkOrange" icon={faHourglassHalf} />
        <GenericBlock type="middle" color="teal" icon={faImage} /> */}
        <GenericBlock type="end" color="darkBlue" icon={faPlusSquare} />
      </span>
    </div>
  )
}
