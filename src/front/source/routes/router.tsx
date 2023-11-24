import '../assets/styles/global.css';
import { Routes, Route, useLocation } from "react-router-dom";
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Patients from '../pages/Patients';
import { AuthProvider } from '../contexts/AuthContext';
import { useState, useEffect } from 'react';
import DragDrop from '../pages/Game';

export default function Router() {

    const location = useLocation();
    const [showNavbar, setShowNavbar] = useState(false);

    useEffect(() => {
        setShowNavbar(location.pathname !== '/login');
    }, [location]);

    return (
            <AuthProvider>
                {showNavbar && <Navbar name='Maria Júlia' role='Terapeuta ocupacional' />}
                <Routes>
                    <Route path='/game' element={<DragDrop />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/patients' element={<Patients />} />
                </Routes>
            </AuthProvider>
    )

}