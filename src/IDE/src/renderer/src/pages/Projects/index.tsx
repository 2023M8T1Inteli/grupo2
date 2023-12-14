// Projects.js
import React, { useState, useEffect } from 'react'
import Button from '../../components/Button'
import SearchBar from '../../components/Search/index'
import './styles.css'
import play from '../../assets/play.svg'
import plus from '../../assets/plus.svg'
import { useAuth } from '../../contexts/AuthContext'
import { infoToast } from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

export default function Projects() {
  const { userName } = useAuth()
  const [searchTerm, setSearchTerm] = useState('') // Novo estado para o termo de pesquisa
  const [folders, setFolders] = useState([])
  const navigate = useNavigate()


  const createNewProject = async () => {
    const folderName = 'NomeDaNovaPasta' // Gere ou obtenha o nome da pasta
    try {
      const folderPath = await window.electronAPI.createNewFolder(folderName)
      console.log('Pasta criada:', folderPath)
      // Aqui você pode salvar folderPath em um estado ou contexto global, conforme necessário
    } catch (error) {
      console.error('Erro ao criar a pasta:', error)
    }
  }

  const handleSearch = () => {
    console.log('Termo de pesquisa:', searchTerm)
  }

  const loadProjectFolders = async () => {
    const baseDirectory = 'C:/Users/Inteli/Documents/MeusProjetos' // Ajuste conforme necessário
    try {
      const projectFolders = await window.electronAPI.readProjectFolders(baseDirectory)
      setFolders(projectFolders)
    } catch (error) {
      console.error('Erro ao ler pastas do projeto:', error)
    }
  }

  useEffect(() => {
    loadProjectFolders()
  }, [])

  const selectProject = (folderName) => {
    console.log('Projeto selecionado:', folderName)
    const folderPath = `C:/Users/Inteli/Documents/MeusProjetos/${folderName}`

    // Option 2: Store in local storage
    localStorage.setItem('currentProjectPath', folderPath)

    // Additional actions can be added here, such as navigation or state updates
    navigate('/editor')
  }

  return (
    <div className="projects-container">
      <Button
        variant="back"
        onClick={() => {
          console.log('A')
        }}
      />
      <h1>Projetos</h1>
      <div className="centered-content">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="projects-list">
        <a className="project add" href="/editor" onClick={createNewProject}>
          <img src={plus} alt="Adicionar Projeto" />
          <p>Criar Nova Aventura</p>
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
