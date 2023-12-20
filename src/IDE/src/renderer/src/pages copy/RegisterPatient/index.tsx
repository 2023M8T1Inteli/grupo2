// Componente de login para uma aplicação React, com integração de autenticação e navegação.
// Inclui:
// - Uso do React Router (`useNavigate`) para redirecionamento após o login.
// - Uso do contexto de autenticação "useAuth" para acessar a função de login.
// - Estados locais para gerenciar os campos de usuário e senha.
// - Função `handleLogin` para processar o login, incluindo validação e armazenamento de dados do usuário.
// - Uso de toasts para feedback de ações (erro, informação, sucesso).
// - Formulário de login com campos para usuário e senha e botão de entrada.
// - Opção para registrar uma nova conta (ainda em desenvolvimento).

import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useState, useEffect } from 'react'
import './styles.css'
import { errorToast, infoToast, successToast } from '../../components/Toast'
import camera from '../../assets/img/camera.png'
import Button from '../../components/Button'

export type Patient = {
  id?: number
  name: string
  surname: string
  birthdate: string
  observations: string
  createdAt: string
  updatedAt: string
}

export default function RegisterPatient() {
  //   useEffect(() => {
  //     infoToast(`
  //     Caro avaliador, temos um usuário para testes:
  //     \nmaria456 | senha456
  //     `);

  //     infoToast(`
  //     Para atualizar a página, basta pressionar CTRL + R
  //     `);
  //   }, []);

  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [birthdayDate, setBirthdayDate] = useState('')

  async function handleLogin(e) {
    e.preventDefault()

    const newPatient: Patient = {
      name: username,
      surname: '',
      birthdate: birthdayDate,
      observations: '',
      createdAt: '2023-12-07T12:00:00Z',
      updatedAt: '2023-12-07T12:00:00Z'
    }

    try {
      await window.electron.ipcRenderer.invoke('db:patient.insert', newPatient)
    } catch (err) {
      errorToast('Paciente não criado')
      return
    }

    successToast(`Paciente criado com sucesso!`)
    //sessionStorage.setItem("user_data", JSON.stringify(user));
    navigate('/login')
  }

  return (
    <div className="login-container">
      <div>
        <img src={camera} alt="Camera" />
      </div>
      <div>
        <h1 style={{ color: 'white' }}>Novo Paciente</h1>
        <form className="inputs" onSubmit={handleLogin}>
          <h3 style={{ color: 'white' }}>Nome Completo</h3>

          <input
            required
            type="text"
            placeholder="Nome"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
            style={{ marginBottom: '2rem', padding: '0.3rem', width: '50rem' }}
          />
          <h3 style={{ color: 'white' }}>Data de nascimento</h3>
          <input
            required
            type="date"
            placeholder="Data de nascimento"
            onChange={(e) => {
              setBirthdayDate(e.target.value)
            }}
            style={{ marginBottom: '3rem', padding: '0.3rem', width: '50rem' }}
          />
          <div className="buttons">
            <Button
              variant="back"
            />
            <input
              type="submit"
              value="CRIAR PACIENTE"
              style={{ padding: '0.1rem', width: '100rem' }}
            />
            <input
              type="button"
              onClick={() => navigate('/registerPatient')}
              value="CANCELAR"
              style={{ padding: '0.10rem' }}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
