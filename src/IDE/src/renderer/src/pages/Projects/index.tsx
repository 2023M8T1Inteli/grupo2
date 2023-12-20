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
      await window.electronAPI.createNewFolder(`${newFolderName}/imgs`)
      await window.electronAPI.createNewFolder(`${newFolderName}/audios`)
      console.log('Folder created:', folderPath)

      await window.electronAPI.createProjectInfo(folderPath)

      localStorage.setItem('currentProjectPath', folderPath) // Store the path
      navigate('/editor') // Navigate to the editor
    } catch (error) {
      console.error('Error creating folder:', error)
    }
    await fetchFolders()
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

  const fetchFolders = async () => {
    try {
      const response = await window.electronAPI.readProjectFolders()
      setFolders(response)
    } catch (error) {
      console.error('Error fetching folders:', error)
    }
  }

  useEffect(() => {
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
        <div className="modal-short">
          <div className="modal-short-content">
            <div className="modal-short-header">
              <h2>Criar Projeto</h2>
              <span className="close-short-button" onClick={() => setIsModalOpen(false)}>
                &times;
              </span>
            </div>
            <div className="modal-short-body">
              <p>Insira o nome do seu novo projeto</p>
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                placeholder="Meu Projeto X"
                className="modal-input"
              />
            </div>
            <div className="modal-short-footer">
              <button className="btn-short btn-cancel" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="btn-short btn-continue" onClick={handleCreateProject}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
