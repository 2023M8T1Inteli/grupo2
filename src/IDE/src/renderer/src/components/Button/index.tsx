// É um componente de botão para React com várias variantes e comportamentos.
// Inclui:
// - Interface `ButtonProps` para definir propriedades como 'value', 'variant', 'onClick'.
// - Importação de estilos e ícones.
// - Renderização condicional para criar diferentes tipos de botões, incluindo botões de navegação e ação.

import './styles.css'
import back from '../../assets/back.svg'
import settings from '../../assets/settings.svg'

interface ButtonProps {
  value?: string
  variant: 'primary' | 'secondary' | 'back' | 'settings'
  onClick?: any
  to?: string
  type?: string
}

export default function Button(props: ButtonProps) {
  return (
    <>
      {props.to ? (
        <a className={`button-${props.variant}`} href={props.to}>
          {props.value}
        </a>
      ) : props.variant === 'back' ? (
        <button
          {...props}
          className={`button-${props.variant}`}
          onClick={() => {
            history.back()
          }}
        >
          <img src={back} />
        </button>
      ) : props.variant === 'settings' ? (
        <a {...props} className={`button-${props.variant}`} href="/settings">
          <img src={settings} />
        </a>
      ) : (
        <button {...props} className={`button-${props.variant}`} onClick={props.onClick}>
          {props.value}
        </button>
      )}
    </>
  )
}