// It is a button component for React with various variants and behaviors.
// Includes:
// - ButtonProps interface to define properties like 'value', 'variant', 'onClick'.
// - Importing styles and icons.
// - Conditional rendering to create different types of buttons, including navigation and action buttons.


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
