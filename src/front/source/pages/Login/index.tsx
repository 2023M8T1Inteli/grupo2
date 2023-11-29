import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Button from '../../components/Button';
import "./styles.css";
import { errorToast, infoToast, successToast } from "../../components/Toast";

export default function Login() {

  useEffect(() => {
  
    infoToast(`
    Caro avaliador, temos um usuário para testes:
    \nmaria456 | senha456
    `)
    
    infoToast(`
    Para atualizar a página, basta pressionar CTRL + R
    `)

  }, [])
  

  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();

    const getUserByUsername = window.electron.users.getByUsername;
    const user = await getUserByUsername(username);

    if (!user) {
      errorToast('Usuário não encontrado');
      return;
    }

    if (user.password !== password) {
      errorToast('Usuário ou senha incorretos');
      return;
    }

    successToast(`Login efetuado com sucesso!`);
    sessionStorage.setItem('user_data', JSON.stringify(user));
    login();
    navigate("/");
  }

  return (
    <div className="login-container">
      <div>
        <h1>Bem-vindo de volta!</h1>
        <p>Entre com sua conta para acessar os projetos</p>
      </div>
      <form className="inputs" onSubmit={handleLogin}>
        <input required type="text" placeholder="Nome de usuário" onChange={(e) => { setUsername(e.target.value) }} />
        <input required type="password" placeholder="Senha" onChange={(e) => { setPassword(e.target.value) }} />
        <div>
          <Button
            type="submit"
            variant="primary"
            value="Entrar"
          />
          <span className="register" onClick={() => {infoToast("Trabalho em progresso! 🚀")}}>
            ou crie sua conta agora
          </span>
        </div>
      </form>
    </div>
  );
}
