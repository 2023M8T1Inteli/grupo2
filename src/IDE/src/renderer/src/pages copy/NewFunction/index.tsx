// Tela focada na criação e manipulação de cenas do projeto.
// Inclui:
// - Utilização do componente Button para navegação.
// - Estrutura dividida em colunas e linhas para organizar o layout da página.
// - Uso da biblioteca `react-rnd` para criar um bloco redimensionável e arrastável.
// - Botões e links para adicionar elementos e editar blocos, com redirecionamento para outras páginas.
// - Estilização através do arquivo `styles.css`.

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rnd } from 'react-rnd'
import Button from '../../components/Button'
import './styles.css'
import plus from '../../assets/plus.svg'
import touchHand from '../../assets/touch-hand.svg'
import rugButton1 from '../../assets/rugButton1.svg'
import rugButton2 from '../../assets/rugButton2.svg'
import imageIcon from '../../assets/image-solid.svg'
import sound from '../../assets/sound-solid.svg'

function NewFunction() {
  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4 // Define how many steps you have
  const [selectedButton, setSelectedButton] = useState(null)
  const [selections, setSelections] = useState({})
  const [blockSelections, setBlockSelections] = useState({})
  const [currentBlockId, setCurrentBlockId] = useState(null)
  const [hasMadeChoice, setHasMadeChoice] = useState({})

  useEffect(() => {
    const loadProjectData = async () => {
      const projectFolderPath = localStorage.getItem('currentProjectPath')
      if (projectFolderPath) {
        const data = await window.electronAPI.readFile(`${projectFolderPath}/project-info.json`)
        const projectData = JSON.parse(data)
        setBlockSelections(projectData.Blocks || {})
      }
    }

    const loadState = async () => {
      const savedState = localStorage.getItem('editorState')
      if (savedState) {
        const { currentStep, selections, selectedButton } = JSON.parse(savedState)
        setCurrentStep(currentStep)
        setSelections(selections)
        setSelectedButton(selectedButton)

        localStorage.removeItem('editorState')
      }
    }

    loadProjectData()
    loadState()

    const urlParams = new URLSearchParams(window.location.search)
    const blockId = urlParams.get('blockId')
    if (blockId) {
      setCurrentBlockId(blockId)
    } else {
      // If not editing, set the block ID for a new block
      const projectFolderPath = localStorage.getItem('currentProjectPath')
      if (projectFolderPath) {
        window.electronAPI.readFile(`${projectFolderPath}/project-info.json`).then((data) => {
          const projectData = JSON.parse(data)
          const blocks = projectData.Blocks || {}
          const nextBlockIndex = Object.keys(blocks).length
          setCurrentBlockId(nextBlockIndex) // New block
        })
      }
    }
  }, [])

  const saveState = async () => {
    const stateToSave = {
      currentStep: currentStep + 1,
      selections: selections,
      selectedButton: selectedButton
    }

    localStorage.setItem('editorState', JSON.stringify(stateToSave))
  }

  const selectButton = (buttonId) => {
    console.log(`SelectButton Called - ButtonId: ${buttonId}`)
    setSelectedButton(buttonId)
    setSelections((prev) => ({ ...prev, [currentStep]: buttonId }))
    setHasMadeChoice((prev) => ({ ...prev, [currentStep]: true }))
    setBlockSelections((prev) => ({
      ...prev,
      [currentBlockId]: { ...prev[currentBlockId], button: buttonId }
    }))
    // ... rest of your function
  }

  const selectElement = (elementId) => {
    console.log(`SelectElement Called - ElementId: ${elementId}`)
    setSelectedButton(elementId)
    setSelections((prev) => ({ ...prev, [currentStep]: elementId }))
    setHasMadeChoice((prev) => ({ ...prev, [currentStep]: true }))
    setBlockSelections((prev) => ({
      ...prev,
      [currentBlockId]: { ...prev[currentBlockId], element: elementId }
    }))
    // ... rest of your function
  }

  const autoCompleteStep = () => {
    // Assuming you have a way to determine if the current step needs no choice,
    // such as an array or a function that returns true or false.
    if (doesStepRequireNoChoice(currentStep)) {
      setHasMadeChoice((prev) => ({ ...prev, [currentStep]: true }))
      // Optionally, if you need to save some default value for such steps
      setSelections((prev) => ({ ...prev, [currentStep]: 'default' }))
    }
  }

  // This effect runs whenever the currentStep changes
  useEffect(() => {
    autoCompleteStep()
    // ... other logic that needs to run on step change
  }, [currentStep])

  // You might need a function or array that defines which steps don't require a choice
  const doesStepRequireNoChoice = (step) => {
    // Let's say step 3 requires no choice
    const stepsWithoutChoice = [3, 4] // Extend this array as needed
    return stepsWithoutChoice.includes(step)
  }

  const goToNextStep = () => {
    setCurrentStep((prevStep) => {
      if (prevStep >= totalSteps) return prevStep // If it's the last step, do nothing

      if (!selections[prevStep]) {
        console.log('Need to choose an option for the current step.')
        return prevStep // Don't advance steps if no selection was made
      }

      const nextStep = prevStep + 1
      setSelectedButton(selections[nextStep]) // Update the selectedButton for the next step
      return nextStep
    })
  }

  const resetOrGoBack = () => {
    setCurrentStep((prevStep) => {
      const newStep = prevStep === 1 ? prevStep : prevStep - 1
      setSelectedButton(selections[newStep]) // Ensure the selectedButton state is updated
      return newStep
    })
  }

  const renderCancelButton = () => {
    if (currentStep > 1) {
      return (
        <button onClick={resetOrGoBack}>
          <a>Anterior</a> {/* Change text to "Anterior" */}
        </button>
      )
    } else {
      return (
        <a href="/editor">
          <button onClick={resetOrGoBack}>Cancelar</button>
        </a>
      )
    }
  }

  const renderDoneButton = () => {
    const completeAndNavigate = async () => {
      console.log('CompleteAndNavigate Called')

      const projectFolderPath = localStorage.getItem('currentProjectPath')
      console.log('Project folder path:', projectFolderPath)

      if (projectFolderPath) {
        try {
          const data = await window.electronAPI.readFile(`${projectFolderPath}/project-info.json`)
          console.log('Data read from project-info.json:', data)
          const projectData = JSON.parse(data)
          console.log('Project data after parsing:', projectData)

          projectData.Blocks = projectData.Blocks || {}
          projectData.Blocks[currentBlockId] = blockSelections[currentBlockId] // Update or add new block
          console.log('Updated project data:', projectData)

          await window.electronAPI.writeFile(
            `${projectFolderPath}/project-info.json`,
            JSON.stringify(projectData)
          )
          console.log('Selections saved successfully!')
          navigate('/editor')
        } catch (err) {
          console.error('Error during file operations:', err)
        }
      } else {
        console.log('No project folder path found.')
      }
    }

    // Render the "Concluir" button
    if (currentStep === totalSteps) {
      return <button onClick={completeAndNavigate}>Concluir</button>
    }

    if (currentStep != totalSteps) {
      return (
        <button onClick={goToNextStep}>
          <a>Próximo</a>
        </button>
      )
    } else {
      return (
        <a href="/editor">
          <button onClick={completeAndNavigate}>
            <a>Concluir</a>
          </button>
        </a>
      )
    }
  }

  // Step 3: Update the rendering logic to show different content based on the current step
  const renderFormQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="Form">
            <div className="Question">
              <h1>Qual botão será utilizado?</h1>
              <p>Identifique qual ícone corresponde à qual quadrante do tapete será utilizado.</p>
            </div>
            <div className="Choice">
              <button
                className={selections[currentStep] === 'rugButton1' ? 'selected' : ''}
                onClick={() => selectButton('rugButton1')}
              >
                <img src={rugButton1} alt="Icone indicando botão do tapete" />
              </button>
              <button
                className={selections[currentStep] === 'rugButton2' ? 'selected' : ''}
                onClick={() => selectButton('rugButton2')}
              >
                <img src={rugButton2} alt="Icone indicando botão do tapete" />
              </button>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="Form">
            <div className="Question">
              <h1>O que será exibido?</h1>
              <p>Escolha entre as opções que serão mostradas</p>
            </div>
            <div className="Choice">
              <button
                className={selections[currentStep] === 'sound' ? 'selected' : ''}
                onClick={() => selectElement('sound')}
              >
                <img src={sound} alt="Sound icon" />
              </button>
              <button
                className={selections[currentStep] === 'imageIcon' ? 'selected' : ''}
                onClick={() => selectElement('imageIcon')}
              >
                <img src={imageIcon} alt="Image icon" />
              </button>
            </div>
          </div>
        ) // Replace with actual content for step 2
      case 3: {
        const secondChoice = selections[2] // Choice made in step 2
        console.log('Second Choice:', secondChoice)
        if (secondChoice === 'imageIcon') {
          saveState()
          navigate('/Fabric')
        } else if (secondChoice === 'sound') {
          return <p>Output for Audio Choice</p>
        } else {
          return <p>Default Output or Error Message</p>
        }
      }
      case 4:
        return <p>Conteúdo do Passo 4</p> // Replace with actual content for step 4
    }
  }

  const canNavigateToStep = (step) => {
    for (let i = 1; i < step; i++) {
      if (!hasMadeChoice[i]) {
        return false // Cannot navigate to step if previous steps have no choice
      }
    }
    return true
  }

  // Modify the Progress component rendering logic
  const renderProgressButtons = () => {
    return [...Array(totalSteps)].map((_, index) => (
      <div
        className={`Steps ${currentStep === index + 1 ? 'active' : ''} ${
          !hasMadeChoice[index + 1] && currentStep < index + 1 ? 'disabled' : ''
        }`}
        key={index}
      >
        <button
          onClick={() => {
            if (canNavigateToStep(index + 1)) {
              setCurrentStep(index + 1)
            } else {
              console.log('Complete previous steps before navigating to this step.')
            }
          }}
          disabled={!canNavigateToStep(index + 1)}
        >
          <a>{index + 1}</a>
        </button>
      </div>
    ))
  }

  return (
    <div className="MainEditor">
      <div className="Progress">{renderProgressButtons()}</div>
      {renderFormQuestion()}
      <div className="Footer">
        {renderCancelButton()} {/* Call the function to render the correct button */}
        {renderDoneButton()}
      </div>
    </div>
  )
}

export default NewFunction
