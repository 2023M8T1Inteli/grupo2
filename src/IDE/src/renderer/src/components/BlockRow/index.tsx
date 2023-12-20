// It is a button component for React with various variants and behaviors.
// Includes:
// - ButtonProps interface for defining properties such as 'value', 'variant', 'onClick'.
// - Importing styles and icons.
// - Conditional rendering to create different types of buttons, including navigation and action buttons.

import './styles.css'
import { ReactElement } from 'react'
import { GenericBlock } from '../Blocks'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { IBaseButton } from '@renderer/pages/BlockEditor'

interface IBlockRowProps {
  blocks: IBaseButton[]
  addButtonHandler: () => void
  editCanvasHandler: (canvasIdx: string) => void
  editTimeHandler: (timerIdx: number) => void
  editMusicHandler: (musicIdx: number) => void
}
export default function BlockRow(props: IBlockRowProps): ReactElement {
  const colorSwitch = (category: string): string => {
    switch (category) {
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
            color={colorSwitch(block.category)}
            icon={block.icon}
            onClick={() => {
              if (block.type === 'scene') {
                props.editCanvasHandler(block.id)
              } else if (block.type === 'wait') {
                props.editTimeHandler(idx)
              } else if (block.type === 'music') {
                props.editMusicHandler(idx)
              }
            }}
          />
        )
      })}

      <GenericBlock
        type="end"
        color="darkBlue"
        icon={faPlusSquare}
        onClick={props.addButtonHandler}
      />
    </span>
  )
}
