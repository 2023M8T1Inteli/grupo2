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
    <div class="MainEditor">
      <div class="Progress">
        <a class="Steps">
          <button>1</button>
        </a>
        <a class="Steps">
          <button>2</button>
        </a>
        <a class="Steps">
          <button>3</button>
        </a>
        <a class="Steps">
          <button>4</button>
        </a>
      </div>
      <div class="Form">
        <div class="Question">
          <h1>Qual botão será utilizado?</h1>
        </div>
        <div class="Choice">
          <button>
            <img src={rugButton1} alt="Icone indicando botão do tapete" />
          </button>
          <button>
            <img src={rugButton2} alt="Icone indicando botão do tapete" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
