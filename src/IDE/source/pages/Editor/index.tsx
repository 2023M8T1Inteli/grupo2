// Tela focada na criação e manipulação de cenas do projeto.
// Inclui:
// - Utilização do componente Button para navegação.
// - Estrutura dividida em colunas e linhas para organizar o layout da página.
// - Uso da biblioteca `react-rnd` para criar um bloco redimensionável e arrastável.
// - Botões e links para adicionar elementos e editar blocos, com redirecionamento para outras páginas.
// - Estilização através do arquivo `styles.css`.

import React, { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import Button from "../../components/Button";
import "./styles.css";
import plus from "/plus.svg";
import touchHand from "/touch-hand.svg";
import rugButton1 from "/rugButton1.svg";
import rugButton2 from "/rugButton2.svg";
import imageIcon from "/image-solid.svg";

function App() {
  return (
    <div class="Main">
      <div class="TopHalf">
        <h1>Projeto 01</h1>
      </div>
      <div class="BottomHalf">
        <a  class="MakeNew" href="/new-function">
          <button>
            <img src={plus} alt="Sinal de soma" />
          </button>
        </a>
        <div class="Blocks">
            <button class="Edit">
              <div class="Event">
                <img src={touchHand} alt="Icone indicando toque singular"/>
                <img src={rugButton1} alt="Icone indicando botão do tapete"/>
              </div>
              <div class="Element">
                <img src={imageIcon} alt="Icone indicando toque singular"/>
              </div>
            </button> 
        </div>
      </div>
    </div>
  );
}

export default App;
