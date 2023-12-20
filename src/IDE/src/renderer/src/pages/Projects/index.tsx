import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import './styles.css'
import plus from '../../assets/plus.svg'
import { AutoRedirect } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
  const [folders, setFolders] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState('')
  const navigate = useNavigate()

  const createNewProject = async () => {
    setIsModalOpen(true) // Open modal instead of directly creating a project
  }

  const handleCreateProject = async () => {
    try {
      const folderPath = await window.electronAPI.createNewFolder(newFolderName)
      console.log('Folder created:', folderPath)

      await window.electronAPI.createProjectInfo(folderPath)

      localStorage.setItem('currentProjectPath', folderPath) // Store the path
      navigate('/editor') // Navigate to the editor
    } catch (error) {
      console.error('Error creating folder:', error)
    }
    setIsModalOpen(false) // Close modal after creation
  }

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
        const response = await window.electronAPI.readProjectFolders()
        setFolders(response)
      } catch (error) {
        console.error('Error fetching folders:', error)
      }
    }

    fetchFolders()
  }, [])

  return (
    <div className="projects-container">
      <AutoRedirect />
      <Button variant="back" />
      <h1>Projetos</h1>

      <div className="projects">
        <a className="project add" href="#" onClick={createNewProject}>
          <img src={plus} alt="Adicionar Projeto" />
        </a>
        {folders.map((folder) => (
          <div key={folder} className="project" onClick={() => selectProject(folder)}>
            <p>{folder}</p>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal">
          <input 
            type="text" 
            value={newFolderName} 
            onChange={(e) => setNewFolderName(e.target.value)} 
            placeholder="Enter Folder Name"
          />
          <button onClick={handleCreateProject}>Create Project</button>
          <button onClick={() => setIsModalOpen(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
