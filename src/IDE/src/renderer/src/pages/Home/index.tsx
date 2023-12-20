import { AutoRedirect } from '../../contexts/AuthContext'
import './styles.css'
import child from '../../assets/img/baby.svg'
import folder from '../../assets/img/kid-toy.svg'

export default function Home() {
  return (
    <div className="home-container">
      <AutoRedirect />
      <div>
        <h1>O que vamos fazer hoje?</h1>
        <h2>Você quer acompanhar o desenvolvimento das crianças ou iniciar novas experiências?</h2>
      </div>
      <div className="options">
        <a href="/patients" className="option">
          <img src={child} />
          <p>Acompanhar Desenvolvimento</p>
        </a>
        <a href="/projects " className="option">
          <img src={folder} />
          <p>Visualizar Projetos</p>
        </a>
      </div>
    </div>
  )
}
