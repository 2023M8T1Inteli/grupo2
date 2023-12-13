// Projects.js
import React, { useState } from 'react'
import Button from '../../components/Button'
import SearchBar from '../../components/Search/index'
import './styles.css'
import play from '../../assets/play.svg'
import plus from '../../assets/plus.svg'
import { useAuth } from '../../contexts/AuthContext'
import { infoToast } from '../../components/Toast'

export default function Projects() {
  const { userName } = useAuth()
  const [searchTerm, setSearchTerm] = useState('') // Novo estado para o termo de pesquisa

  const handleSearch = () => {
    // Implemente a lógica de pesquisa
    console.log('Termo de pesquisa:', searchTerm)
    // Aqui você pode adicionar a lógica para filtrar os projetos com base no termo de pesquisa
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
        <SearchBar onSearch={handleSearch} /> {/* Barra de pesquisa agora vem primeiro */}
      </div>

      <div className="projects-list">
        <a className="project add" href="/editor">
          <img src={plus} alt="Adicionar Projeto" />
          <p>Criar Nova Aventura</p>
        </a>

        {/* Exemplo de um projeto */}
        <div className="project">
          <div></div>
        </div>
        <div className="project">
          <div></div>
        </div>
        {/* Outros projetos... */}
      </div>
    </div>
  )
}
