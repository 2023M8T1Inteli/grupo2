// Tela focada na criação e manipulação de cenas do projeto.
// Inclui:
// - Utilização do componente Button para navegação.
// - Estrutura dividida em colunas e linhas para organizar o layout da página.
// - Uso da biblioteca `react-rnd` para criar um bloco redimensionável e arrastável.
// - Botões e links para adicionar elementos e editar blocos, com redirecionamento para outras páginas.
// - Estilização através do arquivo `styles.css`.

import React, { useState } from "react";
import { Rnd } from "react-rnd";
import Button from "../../components/Button";
import "./styles.css";
import plus from "/plus.svg";
import touchHand from "/touch-hand.svg";
import rugButton1 from "/rugButton1.svg";
import rugButton2 from "/rugButton2.svg";
import imageIcon from "/image-solid.svg";

function App() {
  // Step 1: Add a piece of state to track the current step
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3; // Define how many steps you have

  // Step 2: Create a function that will increment the current step
  const goToNextStep = () => {
    setCurrentStep((prevStep) => (prevStep < totalSteps ? prevStep + 1 : prevStep));
  };

  // Function to handle the cancel/reset button
  const resetOrGoBack = () => {
    if (currentStep === 1) {
      setCurrentStep(1); // or setCurrentStep(currentStep - 1) to go back one step
    } else {
      // If it's not the first step, go back one step
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const renderCancelButton = () => {
    if (currentStep > 1) {
      return (
        <button onClick={resetOrGoBack}>
          <a>Anterior</a> {/* Change text to "Anterior" */}
        </button>
      );
    } else {
      // Render the cancel button only on the first step
      return (
        <button onClick={resetOrGoBack}>
          <a>Cancelar</a> {/* Keep text as "Cancelar" */}
        </button>
      );
    }
  };

  // Step 3: Update the rendering logic to show different content based on the current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <p>Conteúdo do Passo 1</p>; // Replace with actual content for step 1
      case 2:
        return <p>Conteúdo do Passo 2</p>; // Replace with actual content for step 2
      case 3:
        return <p>Conteúdo do Passo 3</p>; // Replace with actual content for step 3
      case 4:
        return <p>Conteúdo do Passo 4</p>; // Replace with actual content for step 4
    }
  };

  return (
    <div className="MainEditor">
      <div className="Progress">
        {[...Array(totalSteps)].map((_, index) => (
          <div className={`Steps ${currentStep === index + 1 ? "active" : ""}`} key={index}>
            <button onClick={() => setCurrentStep(index + 1)}>
              <a>{index + 1}</a>
            </button>
          </div>
        ))}
      </div>
      <div className="Form">
        <div className="Question">
          <h1>Qual botão será utilizado?</h1>
          <p>Identifique qual ícone corresponde à qual quadrante do tapete será utilizado.</p>
        </div>
        <div className="Choice">
          {renderStepContent()}
        </div>
      </div>
      <div className="Footer">
        {renderCancelButton()} {/* Call the function to render the correct button */}
        <button onClick={goToNextStep}>
          <a>Próximo</a>
        </button>
      </div>
    </div>
  );
}

export default App;

