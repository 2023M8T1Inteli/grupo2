import '../assets/styles/global.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from '../pages/Login';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Projects from '../pages/Projects';
import Patients from '../pages/Patients';
import { AuthProvider } from '../contexts/AuthContext';

export default function Router() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Navbar name='Maria Júlia' role='Terapeuta ocupacional' />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path='/' element={<Home />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/patients' element={<Patients />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )

}