// Navbar with authentication functionalities.
// Includes:
// - Interface `NavbarProps` for optional properties like 'name' and 'role'.
// - Usage of the authentication context "useAuth" to obtain user and logout functions.
// - Implementation of a responsive menu and a logout button with a success message.
// - Display of the user's name and profile image in the component.

import React, { useState } from 'react'
import './styles.css'
import profile from '../../assets/img/profile.png'
import { useAuth } from '../../contexts/AuthContext'
import { successToast } from '../Toast'
import ColorsModal from '../ColorsModal'
import { useTheme } from '@renderer/contexts/ThemeContext'

export default function Navbar(props) {

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
