// Screen focused on creating and manipulating project scenes.
// Includes:
// - Use of the Button component for navigation.
// - Structure divided into columns and rows to organize the page layout.
// - Use of the `react-rnd` library to create a resizable and draggable block.
// - Buttons and links to add elements and edit blocks, with redirection to other pages.
// - Styling through the `styles.css` file.

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Rnd } from 'react-rnd'
import Button from '../../components/Button'
import './styles.css'
import plusIcon from '../../assets/plus.svg'
import touchHand from '../../assets/touch-hand.svg'
import rugButton1 from '../../assets/rugButton1.svg'
import rugButton2 from '../../assets/rugButton2.svg'
import imageIcon from '../../assets/image-solid.svg'
import sound from '../../assets/sound-solid.svg'

function Editor() {
  const navigate = useNavigate()

  const [selections, setSelections] = useState([])
  const [icons, setIcons] = useState([])
  const [projectName, setProjectName] = useState('') // Initialize projectName state

  // In Editor component
  const editBlock = (blockId) => {
    console.log(`EditBlock Called - BlockId: ${blockId}`)

    navigate(`/new-function?blockId=${blockId}`)
    // Or if you're using state to navigate (this depends on your router setup)
    // navigate('/new-function', { state: { blockId } });
  }

  // In Editor component
  const addNewBlock = () => {
    // Navigate to NewFunction with no parameters to indicate a new block
    console.log('AddNewBlock Called')

    navigate('/new-function')
  }

  const getImageSource = (imageName) => {
    switch (imageName) {
      case 'touchHand':
        return touchHand
      case 'rugButton1':
        return rugButton1
      case 'rugButton2':
        return rugButton2
      case 'imageIcon':
        return imageIcon
      case 'sound':
        return sound
    }
  }

  useEffect(() => {
    // Load the project data on component mount
    const projectFolderPath = localStorage.getItem('currentProjectPath')
    console.log('Component Mounted - Editor')

    if (projectFolderPath) {
      console.log('Project Folder Path:', projectFolderPath)
      loadBlockSelections(projectFolderPath)
      const pathParts = projectFolderPath.split(/[\/\\]/)
      const extractedName = pathParts[pathParts.length - 1]
      setProjectName(extractedName)
    } else {
      console.error('Project folder path not found')
    }
  }, [])

  const loadBlockSelections = async (projectFolderPath) => {
    try {
      const data = await window.electronAPI.readFile(`${projectFolderPath}/project-info.json`)
      const projectData = JSON.parse(data)
      setSelections(Object.values(projectData.Blocks || {}))
    } catch (error) {
      console.error('Error reading file:', error)
    }
  }

  return (
    <div className="Main">
      <div className="TopHalf">
        <h1>{projectName}</h1>
      </div>
      <div className="BottomHalf">
        <a className="MakeNew" onClick={addNewBlock}>
          <button>
            <img src={plusIcon} alt="Sinal de soma" />
          </button>
        </a>
        <div className="Blocks">
          {selections.map((selection, index) => (
            <button key={index} className="Block" onClick={() => editBlock(index)}>
              <div className="Button">
                <img src={touchHand} alt="" />
                <img src={getImageSource(selection.button)} alt={selection.button} />
              </div>
              <div className="Element">
                <img src={getImageSource(selection.element)} alt={selection.element} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Editor
