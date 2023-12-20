import { debounce } from 'lodash';
import React from 'react';
import './styles.css';
import { useTheme } from '@renderer/contexts/ThemeContext';
import Button from '../Button';

export default function ColorsModal(props: { onClose: () => any }) {
  const { color, theme, setColor, toggleTheme } = useTheme();

  const handleColorChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  }, 100);

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return (
    <div className='colors modal'>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Personalizar a interface</h4>
        </div>
        <div className="modal-body">
          <div>
            <label>Escolha a cor principal:</label>
            <input type='color' defaultValue={color} onChange={handleColorChange} />
          </div>
          <div>
            <label>Alternar Tema: {theme === 'dark' ? 'Escuro' : 'Claro'}</label>
            <Button
              variant='primary'
              onClick={handleToggleTheme}
              value='Alternar Tema'
            />
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={props.onClose}>Fechar</button>
        </div>
      </div>
    </div>
  );
}