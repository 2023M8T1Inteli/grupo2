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
import play from "/play.svg";

const modelRectangleStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "green",
  textAlign: "center",
  color: "#fff",
};

function App() {
  return (
    <div class="Main">
      <div class="UpperColumn">
        <div>
          <Button
            variant="back"
            onClick={() => {
              console.log("A");
            }}
          />
          <h1>Cenas</h1>
        </div>
        <div>
          <a>
            <img src={play} />
          </a>
        </div>
      </div>
      <div class="LowerColumn">
        <div class="LeftRow">
          <div class="Square"></div>
          <div class="AddSquare">
            <p>+</p>
          </div>
        </div>
        <div class="RightRow">
          <div class="MainSquare">
            <div>
              <Rnd
                style={modelRectangleStyle}
                default={{
                  x: 0,
                  y: 0,
                  width: 320,
                  height: 200,
                }}
              >
                Bloco Redimensionável e Arrastável
              </Rnd>
            </div>
          </div>
          <div class="ActionButtons">
            <a class="AddElement">
              <p>Adicionar Elemento</p>
            </a>
            <a class="BlockEdit" href="/game">
              <p>Editar Blocos</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
