// Login component for a React application, with authentication and navigation integration.
// Includes:
// - Usage of React Router (`useNavigate`) for redirection after login.
// - Usage of the authentication context "useAuth" to access the login function.
// - Local states to manage the username and password fields.
// - `handleLogin` function to process the login, including validation and storing user data.
// - Usage of toasts for action feedback (error, info, success).
// - Login form with fields for username and password and a login button.
// - Option to register a new account (still in development).

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
    navigate('/patients')
  }

  return (
    <div className="register-patient-container">
      <Button
        variant='back'
      />
      <img src={camera} alt="Camera" />
      <h1>Novo Paciente</h1>
      <form className="inputs" onSubmit={handleLogin}>
        <div>
          <label htmlFor='name'>Nome</label>
          <input
            required
            id='name'
            name='name'
            type="text"
            placeholder="Nome"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor='birthdate'>Data de nascimento</label>
          <input
            id='birthdate'
            name='birthdate'
            required
            type="date"
            placeholder="Data de nascimento"
            onChange={(e) => {
              setBirthdayDate(e.target.value)
            }}
          />
        </div>
        <div className="buttons">
          <Button
            variant="back"
          />
          <input
            className='submit'
            type="submit"
            value="CRIAR PACIENTE"
          />
          <input
            className='cancel'
            type="button"
            onClick={() => navigate('/registerPatient')}
            value="CANCELAR"
          />
        </div>
      </form>
    </div>
  )
}
