import { AutoRedirect } from '../../contexts/AuthContext'
import './styles.css'
import child from '/child-having-an-idea.jpg'
import folder from '/folder.jpg'

export default function Home() {    

    return (
        <div className="home-container">
            <AutoRedirect />
            <h1>O que vamos fazer?</h1>
            <div>
                <div className='card'>
                    <img src={child} />
                    <div>
                        <p>Acompanhe as crianças</p>
                        <p>Veja o histórico das sessões e seus resultados</p>
                        <a href='/teste'>Acompanhamento</a>
                    </div>
                </div>
                <div className='card'>
                    <img src={folder} />
                    <div>
                        <p>Projetos</p>
                        <p>Crie, execute e visualize projetos</p>
                        <a href='/projects'>Meus Projetos</a>
                    </div>
                </div>
            </div>
        </div>
    )

}