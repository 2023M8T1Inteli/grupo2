// É um componente de botão para React com várias variantes e comportamentos.
// Inclui:
// - Interface `ButtonProps` para definir propriedades como 'value', 'variant', 'onClick'.
// - Importação de estilos e ícones.
// - Renderização condicional para criar diferentes tipos de botões, incluindo botões de navegação e ação.

import './styles.css'
import { ReactElement } from 'react'
import { groupBy } from 'lodash'
import { IBaseButton } from '@renderer/pages/BlockEditor'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface ModalProps {
  show: boolean
  genericButtons: IBaseButton[]
  inputButtons: IBaseButton[]
  type: 'input' | 'other'
  onClose: () => void
  onAddBlock: (newBlock: IBaseButton) => void
}

export interface IBaseButtonProps {
  button: IBaseButton
  onClick: () => void
}

const InputButtonElement = (props: IBaseButtonProps): ReactElement => {
  return (
    <button className="grid-button" onClick={props.onClick}>
      <FontAwesomeIcon icon={props.button.icon} />
      <span>{props.button.name}</span>
    </button>
  )
}

export default function Modal(props: ModalProps): ReactElement {
  const groupedButtons = groupBy(props.genericButtons, 'type')

  const handleAddButtonClick = (newBlock: IBaseButton): void => {
    props.onAddBlock(newBlock)
  }

  return props.show ? (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Adicionar bloco</h4>
        </div>
        <div className="modal-body">
          <div className="button-grid">
            {props.type === 'input' && (
              <div className="button-group">
                <h5>Input Buttons</h5>
                <div className="button-grid">
                  {props.inputButtons.map((button, idx) => (
                    <InputButtonElement
                      key={idx}
                      button={button}
                      onClick={() => handleAddButtonClick({ ...button })}
                    />
                  ))}
                </div>
              </div>
            )}
            {props.type === 'other' && (
              <>
                {Object.entries(groupedButtons).map(([group, genericButtons]) => (
                  <div className="button-group" key={group}>
                    <h5>{group.charAt(0).toUpperCase() + group.slice(1)} Buttons</h5>
                    <div className="button-grid">
                      {genericButtons.map((button) => (
                        <InputButtonElement
                          button={button}
                          key={button.name}
                          onClick={() => handleAddButtonClick({ ...button })}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
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
