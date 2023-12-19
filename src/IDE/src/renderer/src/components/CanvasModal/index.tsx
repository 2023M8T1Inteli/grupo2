// É um componente de botão para React com várias variantes e comportamentos.
// Inclui:
// - Interface `ButtonProps` para definir propriedades como 'value', 'variant', 'onClick'.
// - Importação de estilos e ícones.
// - Renderização condicional para criar diferentes tipos de botões, incluindo botões de navegação e ação.

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
