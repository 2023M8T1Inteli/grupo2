// É um componente de botão para React com várias variantes e comportamentos.
// Inclui:
// - Interface `ButtonProps` para definir propriedades como 'value', 'variant', 'onClick'.
// - Importação de estilos e ícones.
// - Renderização condicional para criar diferentes tipos de botões, incluindo botões de navegação e ação.

import './styles.css'
import { ReactElement } from 'react'
import { GenericBlock } from '../Blocks'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { IBaseButton } from '@renderer/pages/BlockEditor'

interface IBlockRowProps {
  blocks: IBaseButton[]
  addButtonHandler: () => void
  editCanvasHandler: (canvasIdx: number) => void
  editTimeHandler: (timerIdx: number) => void
}
export default function BlockRow(props: IBlockRowProps): ReactElement {
  const colorSwitch = (type: string): string => {
    switch (type) {
      case 'input':
        return 'green'
      case 'action':
        return 'yellow'
      case 'logical':
        return 'darkOrange'
      case 'resource':
      case 'graphical':
        return 'teal'
      default:
        return 'darkBlue'
    }

    console.log('BlockRow: colorSwitch: type not found')
  }

  return (
    <span
      style={{
        width: '100%',
        height: '7rem',
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-start',
        backgroundColor: 'offwhite'
      }}
    >
      {props.blocks.map((block, idx) => {
        return (
          <GenericBlock
            key={idx}
            type={idx === 0 ? 'start' : 'middle'}
            color={colorSwitch(block.type)}
            icon={block.icon}
            onClick={() => {
              if (block.type === 'input') {
                props.editCanvasHandler(idx)
              } else if (block.type === 'action') {
                props.editTimeHandler(idx)
              }
            }}
          />
        )
      })}

      {/* <GenericBlock type="start" color="green" icon={faWalking} /> */}
      {/* <GenericBlock type="middle" color="yellow" icon={faMusic} />
            <GenericBlock type="middle" color="darkOrange" icon={faHourglassHalf} />
            <GenericBlock type="middle" color="teal" icon={faImage} />
            <GenericBlock type="middle" color="teal" icon={faImage} /> */}
      {/* <GenericBlock type="middle" color="teal" icon={faImage} /> */}
      <GenericBlock
        type="end"
        color="darkBlue"
        icon={faPlusSquare}
        onClick={props.addButtonHandler}
      />
    </span>
  )
}
