// Componente de login para uma aplicação React, com integração de autenticação e navegação.
// Inclui:
// - Uso do React Router (`useNavigate`) para redirecionamento após o login.
// - Uso do contexto de autenticação "useAuth" para acessar a função de login.
// - Estados locais para gerenciar os campos de usuário e senha.
// - Função `handleLogin` para processar o login, incluindo validação e armazenamento de dados do usuário.
// - Uso de toasts para feedback de ações (erro, informação, sucesso).
// - Formulário de login com campos para usuário e senha e botão de entrada.
// - Opção para registrar uma nova conta (ainda em desenvolvimento).

import './styles.css'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import Button from '../../components/Button'
import { errorToast, infoToast, successToast } from '../../components/Toast'
import childHands from '../../assets/img/child-hands.png'
import loginBg from '../../assets/img/login-bg.svg'
import profilePhoto from '../../assets/img/profile-photo.png'

export default function Login() {
  useEffect(() => {
    infoToast(`
    Caro avaliador, temos um usuário para testes:
    \nmaria456 | senha456
    `)
  }, [])

  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  async function handleLogin(e) {
    e.preventDefault()

    const user = await window.electron.ipcRenderer.invoke('db:user.getByUsername', username)

    console.log(user)

    if (!user) {
      errorToast('Usuário não encontrado')
      return
    }

    if (user.password !== password) {
      errorToast('Usuário ou senha incorretos')
      return
    }

    successToast(`Login efetuado com sucesso!`)
    sessionStorage.setItem('user_data', JSON.stringify(user))
    login()
    navigate('/')
  }

  return (
    <div className="container">
      <div className="img-container">
        <img className='login-bg' src={loginBg} />
        <div className='text-container'>
          <img className='child-hands-img' src={childHands} />
          <p>Toda terapia é uma aventura quando a criatividade encontra as maravilhas da curiosidade infantil</p>
        </div>
        <p></p>
      </div>
      <form className="login-container" onSubmit={handleLogin}>
        <img src={profilePhoto} />
        <input type="text" required onChange={handleUsername} placeholder='Seu nome de usuário aqui' />
        <input type="password" required onChange={handlePassword} placeholder='Sua senha aqui' />
        <input type="submit" value="Entrar" />
        <a href='' className='recover-password'>Recuperar senha</a>
        <a href='' className='register'>ou crie sua conta aqui</a>
      </form>
    </div>
  )
}
