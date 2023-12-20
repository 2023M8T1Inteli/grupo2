// Patients.js
import React, { useEffect, useState } from 'react'
import Button from '../../components/Button'
import SearchBar from '../../components/Search/index'
import './styles.css'
import play from '../../assets/play.svg'
import plus from '../../assets/plus.svg'
import { AutoRedirect, useAuth } from '../../contexts/AuthContext'
import { infoToast } from '../../components/Toast'
import profilePhoto from '../../assets/img/profile-photo.png'

interface IPatient {
  birthdate: string
  createdAt: string
  id: number
  name: string
  observations: string
  surname: string
  updatedAt: string
}

export default function Patients() {
  const [patients, setPatients] = useState<IPatient[]>([])
  const [filteredPatients, setFilteredPatients] = useState<IPatient[]>(patients)

  useEffect(() => {
    window.electron.ipcRenderer.invoke('db:patient.getAll').then((result) => {
      console.log(result)
      setFilteredPatients(result)
      setPatients(result)
    })
  }, [])

  const handleSearch = (e: any) => {
    const searchTerm = e.target.value
    console.log(searchTerm)
    setFilteredPatients(
      patients.filter((patient) => {
        return (
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.surname.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })
    )
  }

  return (
    <div className="patients-container">
      <AutoRedirect />
      <Button variant="back" />
      <h1>Pacientes</h1>
      <input className="search-patient" onChange={handleSearch} />
      <div className="patients">
        <a href="register-patient" className="patient add">
          <img src={plus} />
        </a>
        {filteredPatients?.map((patient) => (
          <a key={patient.id} className="patient">
            <img src={profilePhoto} alt="" />
            <p className="patient-name">
              {patient.name} {patient.surname}
            </p>
            <p className="patient-age">{new Date(patient.birthdate).toLocaleDateString()}</p>
          </a>
        ))}
      </div>
    </div>
  )
}
