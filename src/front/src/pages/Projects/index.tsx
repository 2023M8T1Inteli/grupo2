import Button from '../../components/Button'
import './styles.css'
import play from '/play.svg'

export default function Projects() {

    return (
        <div className="projects-container">
            <div className='options'>
                <Button
                    variant='back'
                    onClick={() => {console.log("A")}}
                />
                <h1>Projetos</h1>
                <Button
                    variant='settings'
                />
            </div>
            <div className="projects-list">
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
                <div className="project">
                    <div>
                        <p className='project-name'>Nome do projeto</p>
                        <p className='created-at'>Criado em 27/10</p>
                        <p className='project-author'>por <b>Maria Júlia</b></p>
                    </div>
                    <a href="/patients">
                        <img src={play} />
                    </a>
                </div>
            </div>
        </div>
    )

}