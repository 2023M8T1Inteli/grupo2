// Tela focada na criação e manipulação de cenas do projeto.
// Inclui:
// - Utilização do componente Button para navegação.
// - Estrutura dividida em colunas e linhas para organizar o layout da página.
// - Uso da biblioteca `react-rnd` para criar um bloco redimensionável e arrastável.
// - Botões e links para adicionar elementos e editar blocos, com redirecionamento para outras páginas.
// - Estilização através do arquivo `styles.css`.

import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import Button from '../../components/Button'
import './styles.css'
import plus from '../../assets/plus.svg'
import touchHand from '../../assets/touch-hand.svg'
import rugButton1 from '../../assets/rugButton1.svg'
import rugButton2 from '../../assets/rugButton2.svg'
import imageIcon from '../../assets/image-solid.svg'

function App() {
  return (
    <div className="Main">
      <div className="TopHalf">
        <h1>Projeto 01</h1>
      </div>
      <div className="BottomHalf">
        <a className="MakeNew" href="/new-function">
          <button>
            <img src={plus} alt="Sinal de soma" />
          </button>
        </a>
        <div className="Blocks">
          <button className="Edit">
            <div className="Event">
              <img src={touchHand} alt="Icone indicando toque singular" />
              <img src={rugButton1} alt="Icone indicando botão do tapete" />
            </div>
            <div className="Element">
              <img src={imageIcon} alt="Icone indicando toque singular" />
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
