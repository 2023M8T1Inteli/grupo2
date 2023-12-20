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
  const { username } = useAuth()
  const [searchTerm, setSearchTerm] = useState('') // Novo estado para o termo de pesquisa

  const handleSearch = () => {
    // Implemente a lógica de pesquisa
    console.log('Termo de pesquisa:', searchTerm)
    // Aqui você pode adicionar a lógica para filtrar os projetos com base no termo de pesquisa
  }

  return (
    <div className="patients-container">
      <Button
        variant="back"
      />
      <h1>Pacientes</h1>
      <div className="centered-content">
        <SearchBar onSearch={handleSearch} />
      </div>

      <div className="patients-list">
        <a
          href="/RegisterPatient"
          className="patient add"
          onClick={() => {
            infoToast('Trabalho em progresso! 🚀')
          }}
        >
          {/* Altere a cor do círculo para outra cor aqui */}
          <div style={{ backgroundColor: 'black' }}>
            <img src={plus} alt="Adicionar Paciente" style={{ color: 'red' }} />
          </div>
        </a>

        {/* Exemplo de um paciente */}
        <div className="patient">
          <div>{/* Conteúdo do card redondo */}</div>
          {/* Texto abaixo do card redondo */}
          <img
            src={profilePhoto}
            alt="Foto do Paciente"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>
        <div className="patient">
          <div>{/* Conteúdo do card redondo */}</div>
          {/* Texto abaixo do card redondo */}
          <img
            src={profilePhoto}
            alt="Foto do Paciente"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />
        </div>
        <div className="patient">
          {/* Conteúdo do card redondo */}
          <img
            src={profilePhoto}
            alt="Foto do Paciente"
            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
          />

          {/* Texto abaixo do card redondo */}
          <p>{username}</p>
        </div>
        {/* Outros pacientes... */}
      </div>
    </div>
  )
}
