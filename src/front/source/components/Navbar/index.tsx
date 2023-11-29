import React from 'react';
import './styles.css';
import profile from '../../assets/img/profile.png';
import { useAuth } from '../../contexts/AuthContext';
import { successToast } from '../Toast';

interface NavbarProps {
    name?: string;
    role?: string;
}

export default function Navbar(props: NavbarProps) {
    const { userName, logout } = useAuth();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="navbar-container" role="navigation">
            <div className="menu">
                <input type="checkbox" />
                <span></span>
                <span></span>
                <span></span>
                <ul className="options">
                    <li>
                        <a href="">Início</a>
                    </li>
                    <li>
                        <a href="" onClick={handleLogout}>
                            Sair
                        </a>
                    </li>
                </ul>
            </div>
            <div className="profile-container">
                <div>
                    <p className="user-name">{userName()}</p>
                    <p>{props.role}</p>
                </div>
                <img src={profile} alt="Profile" />
            </div>
        </nav>
    );
}
