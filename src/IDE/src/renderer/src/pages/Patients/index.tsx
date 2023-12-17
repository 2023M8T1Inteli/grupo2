// Projects.js
import React, { useState } from 'react'
import Button from '../../components/Button'
import SearchBar from '../../components/Search/index'
import './styles.css'
import play from '../../assets/play.svg'
import plus from '../../assets/plus.svg'
import { useAuth } from '../../contexts/AuthContext'
import { infoToast } from '../../components/Toast'
import profilePhoto from '../../assets/img/profile-photo.png'

export default function Projects() {
  const { userName } = useAuth()
  const [searchTerm, setSearchTerm] = useState('') // Novo estado para o termo de pesquisa

  const handleSearch = () => {
    // Implemente a lógica de pesquisa
    console.log('Termo de pesquisa:', searchTerm)
    // Aqui você pode adicionar a lógica para filtrar os projetos com base no termo de pesquisa
  }

  return (
    <div className="patients-container">
      <h1>
        Pacientes
      </h1>
      <SearchBar onSearch={handleSearch} />
      <div>
        
      </div>
    </div>
  )
}
