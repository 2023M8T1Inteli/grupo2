// Componente Router, responsável por gerenciar as rotas e a navegação.
// Inclui:
// - Importação de estilos globais e específicos para notificações (react-toastify).
// - Uso do React Router para definir as rotas e renderizar componentes de páginas específicas.
// - Componentes de páginas como Login, Home, Projects, Patients, Game (DragDrop), Editor.
// - Contexto de autenticação (`AuthProvider`) envolvendo as rotas.
// - Lógica para exibir ou ocultar a Navbar com base na rota atual.
// - Contêiner para notificações Toast.

import '../assets/styles/global.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Navbar from '../components/Navbar'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import Patients from '../pages/Patients'
import Register from '../pages/Register'
import RegisterPatient from '../pages/RegisterPatient'
import { AuthProvider } from '../contexts/AuthContext'
import { useState, useEffect, ReactElement } from 'react'
import DragDrop from '../pages/Game'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Editor from '../pages/Editor'
import FabricPage from '../pages/Fabric'
import NewFunction from '../pages/NewFunction'
import BlockEditor from '@renderer/pages/BlockEditor'
import Audio from '@renderer/pages/Audio'

export default function Router(): ReactElement {
  const location = useLocation()
  const [showNavbar, setShowNavbar] = useState(false)

  useEffect(() => {
    setShowNavbar(
      location.pathname !== '/login' &&
        location.pathname !== '/register' &&
        location.pathname !== '/registerPatient'
    )
  }, [location])

  return (
    <AuthProvider>
      <ToastContainer />
      {showNavbar && <Navbar name="Maria Júlia" role="Terapeuta ocupacional" />}
      <Routes>
        <Route path="/game" element={<DragDrop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<BlockEditor />} />
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/fabric" element={<FabricPage />} />
        <Route path="/new-function" element={<NewFunction />} />
        <Route path="/registerPatient" element={<RegisterPatient />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}
