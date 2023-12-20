// It's a button component for React with various variants and behaviors.
// Includes:
// - `ButtonProps` interface to define properties such as 'value', 'variant', 'onClick'.
// - Importing styles and icons.
// - Conditional rendering to create different types of buttons, including navigation and action buttons.

import CanvasEditor from '../CanvasEditor'
import './styles.css'
import { ReactElement } from 'react'
interface ModalProps {
  show: boolean
  onClose: () => void
}

export default function CanvasModal(props: ModalProps): ReactElement {
  return props.show ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Editar Cena</h4>
        </div>
        <div className="modal-body">
          <CanvasEditor />
        </div>
        <div className="modal-footer">
          <button className="button" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  )
}
