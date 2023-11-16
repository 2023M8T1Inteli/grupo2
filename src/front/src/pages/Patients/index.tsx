import Button from '../../components/Button'
import './styles.css'
import play from '/play.svg'
import child_smile from '/child-smile.png'

export default function Patients() {

    return (
        <div className="patients-container">
            <div className='options'>
                <Button
                    variant='back'
                    onClick={() => {console.log("A")}}
                />
                <h1>Pacientes</h1>
                <Button
                    variant='settings'
                />
            </div>
            <div className="patients-list">
                <a className="patient" href=''>
                    <img src={child_smile} />
                    <div>
                        <p>Luquinhas</p>
                        <p>7 anos</p>
                    </div>
                </a>
                <a className="patient" href=''>
                    <img src={child_smile} />
                    <div>
                        <p>Luquinhas</p>
                        <p>7 anos</p>
                    </div>
                </a>
                <a className="patient" href=''>
                    <img src={child_smile} />
                    <div>
                        <p>Luquinhas</p>
                        <p>7 anos</p>
                    </div>
                </a>
            </div>
        </div>
    )

}