// Projects.js
import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import './styles.css'
import plus from '../../assets/plus.svg'
import { AutoRedirect, useAuth } from '../../contexts/AuthContext'
import { infoToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
  const [folders, setFolders] = useState([])
  const navigate = useNavigate()

  const createNewProject = async () => {

    const folderName = 'NomeDaNovaPasta'; // Generate or obtain the folder name
    try {
      const folderPath = await window.electronAPI.createNewFolder(folderName);
      console.log('Folder created:', folderPath);
  
      // Create project-info.json inside the new folder
      await window.electronAPI.createProjectInfo(folderPath);
  
      localStorage.setItem('currentProjectPath', folderPath); // Store the path
      navigate('/editor'); // Navigate to the editor
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const selectProject = async (folderName) => {
    console.log('Project selected:', folderName)
    try {
      const folderPath = await window.electronAPI.getFolderPath(folderName)

      localStorage.setItem('currentProjectPath', folderPath)
      navigate('/editor')
    } catch (error) {
      console.error('Error fetching folder path:', error)
    }
  }

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await window.electronAPI.readProjectFolders();
        setFolders(response);
      } catch (error) {
        console.error('Error fetching folders:', error);
      }
    };
  
    fetchFolders();
  }, []);
  

  return (
    <div className="projects-container">
      <AutoRedirect />
      <Button
        variant="back"
        onClick={() => {
          console.log('A')
        }}
      />
      <h1>Projetos</h1>

      <div className="projects">
        <a className="project add" href="/editor" onClick={createNewProject}>
          <img src={plus} alt="Adicionar Projeto" />
        </a>
        {folders.map((folder) => (
          <div key={folder} className="project" onClick={() => selectProject(folder)}>
            <p>{folder}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
