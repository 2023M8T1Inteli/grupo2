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
import sound from '../../assets/sound-solid.svg'


function App() {
  
  const [selections, setSelections] = useState([]);
  const [icons, setIcons] = useState([]);
  const [filename, setFilename] = useState("Projeto"); // Default filename


  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'touchHand':
        return touchHand;
      case 'rugButton1':
        return rugButton1;
      case 'rugButton2':
        return rugButton2;
      case 'imageIcon':
        return imageIcon;
      case 'sound':
        return sound;
      default:
        return plusIcon; // default image if none matches
    }
  };


  useEffect(() => {
    const projectFolderPath = localStorage.getItem('currentProjectPath');

    if (projectFolderPath) {
      console.log("Project Folder Path:", projectFolderPath);

      // Call ipcMain handler to create project-info.json
      window.electronAPI.createProjectInfo(projectFolderPath);

      const loadSelections = async () => {
        try {
          // Call ipcMain handler to read file
          const data = await window.electronAPI.readFile(`${projectFolderPath}/project-info.json`);
          const selectionsData = JSON.parse(data);
          setSelections(selectionsData.selections || []);
          console.log("Loaded Selections:", selectionsData.selections);
        } catch (error) {
          console.error("Error reading file:", error);
        }
      };

      loadSelections();
    } else {
      console.error("Project folder path not found");
    }
  }, []);

  useEffect(() => {
    const projectFolderPath = localStorage.getItem('currentProjectPath');

    if (projectFolderPath) {
      console.log("Project Folder Path:", projectFolderPath);

      // Extracting filename from the project path
      const pathParts = projectFolderPath.split('/');
      const projectName = pathParts[pathParts.length - 1];
      setFilename(projectName);

      // ... existing useEffect logic ...
    } else {
      console.error("Project folder path not found");
    }
  }, []);
  



  const updateSelections = (newSelections) => {
    setSelections(newSelections);

    // Assuming 'projectFolderPath' is known
    const projectFolderPath = 'path/to/project/folder';
    window.electronAPI.updateProjectInfo(projectFolderPath, newSelections);
  };
  
  return (
    <div className="Main">
      <div className="TopHalf">
      <h1>{filename}</h1>
      </div>
      <div className="BottomHalf">
        <a className="MakeNew" href="/new-function">
          <button>
            <img src={plus} alt="Sinal de soma" />
          </button>
        </a>
        <div className="Blocks">
        {selections.map((selection, index) => (
            <div key={index} className="Block">
              <div className="Event">
                <img src={getImageSource(selection.event)} alt={selection.event} />
              </div>
              <div className="Element">
                <img src={getImageSource(selection.element)} alt={selection.element} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
