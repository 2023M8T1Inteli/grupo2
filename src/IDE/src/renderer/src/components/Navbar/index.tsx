// Navbar com funcionalidades de autenticação.
// Inclui:
// - Interface `NavbarProps` para propriedades opcionais como 'name' e 'role'.
// - Uso do contexto de autenticação "useAuth" para obter funções de usuário e logout.
// - Implementação de um menu responsivo e um botão de logout com uma mensagem de sucesso.
// - Exibição do nome do usuário e imagem de perfil no componente.

import React, { useState } from 'react'
import './styles.css'
import profile from '../../assets/img/profile.png'
import { useAuth } from '../../contexts/AuthContext'
import { successToast } from '../Toast'
import ColorsModal from '../ColorsModal'

interface NavbarProps {
  name?: string
  role?: string
}

export default function Navbar(props: NavbarProps) {
  const { username, logout } = useAuth()
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = () => {
    logout()
    successToast('Deslogado com sucesso!')
  }

  return (
    <nav className="navbar-container" role="navigation">
      <div className="menu">
        <input type="checkbox" />
        <span></span>
        <span></span>
        <span></span>
        <ul className="options">
          <li>
            <a href="/">Início</a>
          </li>
          <li>
            <button onClick={ () => {
              console.log("TESTE")
              setModalVisible(true)
            }}>Cores</button>
          </li>
          <li>
            <a href="" onClick={handleLogout}>
              Sair
            </a>
          </li>
        </ul>
      </div>
      <div className="profile-container">
        <div>
          <p className="user-name">{username()}</p>
          <p>{props.role}</p>
        </div>
        <img src={profile} alt="Profile" />
      </div>
      {
        modalVisible &&
      <ColorsModal onClose={() => {setModalVisible(false)}} />
      }
    </nav>
  )
}
