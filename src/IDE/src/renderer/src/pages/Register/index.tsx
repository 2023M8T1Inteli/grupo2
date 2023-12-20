import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useState } from 'react';
import './styles.css';
import { errorToast, successToast } from '../../components/Toast';
import camera from '../../assets/img/camera.png';
import Button from '@renderer/components/Button';

export type User = {
  id?: number;
  username: string;
  password: string;
  role: number;
  createdAt: string;
};

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      errorToast('As senhas não coincidem');
      return;
    }

    const newUser: User = {
      username: username,
      password: password,
      role: 1,
      createdAt: new Date().toString()
    };

    await window.electron.ipcRenderer.invoke('db:user.insert', newUser);
    successToast("Usuário criado com sucesso!")
    navigate('/login');
  }

  return (
    <div className="register-container">
      <Button variant='back' />
      <img src={camera} alt="Camera" />
      <h1>Cadastrar novo usuário</h1>
      <form className="inputs" onSubmit={handleLogin}>
        <div>
          <label>Nome de usuário</label>
          <input
            required
            type="text"
            name='username'
            id='username'
            placeholder="Nome"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Senha</label>
          <input
            required
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <label>Confirmar Senha</label>
          <input
            required
            type="password"
            placeholder="Confirmar Senha"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <input
            className="submit"
            type="submit"
            value="CRIAR USUÁRIO"
          />
          <input
            className="cancel"
            type="button"
            onClick={() => navigate('/registerPatient')}
            value="CANCELAR"
          />
        </div>
      </form>
    </div>
  );
}
