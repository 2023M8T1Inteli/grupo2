// This React component, ColorsModal, is designed for a user interface customization modal. It allows users to change the main color theme and toggle between light and dark modes in an application.
// The component uses the `useTheme` custom hook from '@renderer/contexts/ThemeContext' to manage theme-related states and functions.
// `lodash`'s debounce function is used to optimize the color change handler, delaying the execution of `setColor` until after the user has finished typing (with a 100ms delay).
// The component structure includes:
// - A color input that lets users select a primary color. Changes in this input are managed by `handleColorChange`.
// - A toggle button to switch between light and dark themes, using `handleToggleTheme`.
// - Layout and styling are handled using CSS classes, with structure divided into header, body, and footer within the modal.

import { debounce } from 'lodash'
import React from 'react'
import './styles.css'
import { useTheme } from '@renderer/contexts/ThemeContext'
import Button from '../Button'

export default function ColorsModal(props: { onClose: () => any }) {
  const { color, theme, setColor, toggleTheme } = useTheme()

  const handleColorChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }, 100)

  const handleToggleTheme = () => {
    toggleTheme()
  }

  return (
    <div className="colors modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Personalizar a interface</h4>
        </div>
        <div className="modal-body">
          <div>
            <label>Escolha a cor principal:</label>
            <input type="color" defaultValue={color} onChange={handleColorChange} />
          </div>
          <div>
            <label>Alternar Tema: {theme === 'dark' ? 'Escuro' : 'Claro'}</label>
            <Button variant="primary" onClick={handleToggleTheme} value="Alternar Tema" />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose}>Fechar</button>
        </div>
      </div>
    </div>
  )
}
