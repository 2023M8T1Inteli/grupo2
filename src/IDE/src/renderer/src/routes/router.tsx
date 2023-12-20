// Router component, responsible for managing routes and navigation.
// Includes:
// - Importing global and specific styles for notifications (react-toastify).
// - Using React Router to define routes and render specific page components.
// - Page components such as Login, Home, Projects, Patients, Game (DragDrop), Editor.
// - Authentication context (`AuthProvider`) wrapping the routes.
// - Logic to show or hide the Navbar based on the current route.
// - Toast notifications container.

import '../assets/styles/global.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Login from '../pages/Login'
import Navbar from '../components/Navbar'
import Patients from '../pages/Patients'
import Register from '../pages/Register'
import Home from '../pages/Home'
import Projects from '../pages/Projects'
import RegisterPatient from '../pages/RegisterPatient'
import { AuthProvider } from '../contexts/AuthContext'
import { useState, useEffect, ReactElement } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import FabricPage from '../pages/Fabric'
import NewFunction from '../pages/NewFunction'
import BlockEditor from '@renderer/pages/BlockEditor'

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
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/editor" element={<BlockEditor />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Home />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/fabric" element={<FabricPage />} />
        <Route path="/new-function" element={<NewFunction />} />
        <Route path="/register-patient" element={<RegisterPatient />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </AuthProvider>
  )
}
