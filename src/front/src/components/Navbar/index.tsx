import './styles.css';

import profile from '../../assets/img/profile.png'

interface NavbarProps {
    name: string,
    role: string
}

export default function Navbar(props: NavbarProps) {

    return (

        <nav className='navbar-container' role="navigation">
            <div className="menu">

                <input type="checkbox" />

                <span></span>
                <span></span>
                <span></span>
            </div>
            <div className='profile-container'>
                <div>   
                    <p className='user-name'>{props.name}</p>
                    <p>{props.role}</p>
                </div>
                <img src={profile} />
            </div>
        </nav>

    )

}