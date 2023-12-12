// Tela focada na criação e manipulação de cenas do projeto.
// Inclui:
// - Utilização do componente Button para navegação.
// - Estrutura dividida em colunas e linhas para organizar o layout da página.
// - Uso da biblioteca `react-rnd` para criar um bloco redimensionável e arrastável.
// - Botões e links para adicionar elementos e editar blocos, com redirecionamento para outras páginas.
// - Estilização através do arquivo `styles.css`.

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rnd } from "react-rnd";
import Button from "../../components/Button";
import "./styles.css";
import plus from "/plus.svg";
import touchHand from "/touch-hand.svg";
import rugButton1 from "/rugButton1.svg";
import rugButton2 from "/rugButton2.svg";
import imageIcon from "/image-solid.svg";
import sound from "/sound-solid.svg";

function App() {
  // Step 1: Add a piece of state to track the current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2; // Define how many steps you have
  const [selectedButton, setSelectedButton] = useState(null);
  
  const [selections, setSelections] = useState({});

  const selectButton = (buttonId) => {
    setSelectedButton(buttonId);
    setSelections((prevSelections) => ({
      ...prevSelections,
      [currentStep]: buttonId
    }));
  };

  const goToNextStep = () => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep < totalSteps ? prevStep + 1 : prevStep;
      setSelectedButton(selections[nextStep]);
      return nextStep;
    });
  };
  
  const resetOrGoBack = () => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep === 1 ? prevStep : prevStep - 1;
      setSelectedButton(selections[newStep]);
      return newStep;
    });
  };  

  const renderCancelButton = () => {
    if (currentStep > 1) {
      return (
        <button onClick={resetOrGoBack}>
          <a>Anterior</a> {/* Change text to "Anterior" */}
        </button>
      );
    } else {
      return (
        <a href="/editor">
          <button onClick={resetOrGoBack}>
            Cancelar
          </button>
        </a> 
      );
    }
  };

  const renderDoneButton = () => {
    const navigate = useNavigate(); // import this from 'react-router-dom'

    const completeAndNavigate = () => {
      // Navigate to the new page and pass the selected button ID as a URL parameter
      navigate(`/editor?selectedButton=${selectedButton}`);
    };

    if (currentStep != totalSteps) {
      return (
        <button onClick={goToNextStep}>
          <a>Próximo</a>
        </button>
      );
    } else {
      return (
        <a href="/editor">
          <button onClick={goToNextStep}>
            <a>Concluir</a>
          </button>
        </a> 
      );
    }
  };

  // Step 3: Update the rendering logic to show different content based on the current step
  const renderFormQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div class="Form">
            <div class="Question">
              <h1>Qual botão será utilizado?</h1>
              <p>Identifique qual ícone corresponde à qual quadrante do tapete será utilizado.</p>
            </div>
            <div className="Choice">
                <button
                  className={selectedButton === 'rugButton1' ? 'selected' : ''}
                  onClick={() => selectButton('rugButton1')}>
                  <img src={rugButton1} alt="Icone indicando botão do tapete" />
                </button>
                <button
                  className={selectedButton === 'rugButton2' ? 'selected' : ''}
                  onClick={() => selectButton('rugButton2')}>
                  <img src={rugButton2} alt="Icone indicando botão do tapete" />
                </button>
              </div>
          </div>
        );
      case 2:
        return (
          <div class="Form">
            <div class="Question">
              <h1>O que será exibido?</h1>
              <p>Escolha entre as opções que serão mostradas</p>
            </div>
            <div className="Choice">
                <button
                  className={selectedButton === 'rugButton1' ? 'selected' : ''}
                  onClick={() => selectButton('rugButton1')}>
                  <img src={sound} alt="Icone indicando botão do tapete" />
                </button>
                <button
                  className={selectedButton === 'rugButton2' ? 'selected' : ''}
                  onClick={() => selectButton('rugButton2')}>
                  <img src={imageIcon} alt="Icone indicando botão do tapete" />
                </button>
            </div>
          </div>
        ); // Replace with actual content for step 2
      case 3:
        return <p>Conteúdo do Passo 3</p>; // Replace with actual content for step 3
      case 4:
        return <p>Conteúdo do Passo 4</p>; // Replace with actual content for step 4
    }
  };

  return (
    <div class="MainEditor">
      <div class="Progress">
        {[...Array(totalSteps)].map((_, index) => (
          <div class={`Steps ${currentStep === index + 1 ? "active" : ""} ${!selections[index] && currentStep < index + 1 ? "disabled" : ""}`} key={index}>
            <button onClick={() => setCurrentStep(index + 1)} disabled={!selections[index] && currentStep < index + 1}>
              <a>{index + 1}</a>
            </button>
          </div>
        ))}
      </div>
      {renderFormQuestion()}
      <div class="Footer">
        {renderCancelButton()} {/* Call the function to render the correct button */}
        {renderDoneButton()}
      </div>
    </div>
  );
}

export default App;

