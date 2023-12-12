// Componente de login para uma aplicação React, com integração de autenticação e navegação.
// Inclui:
// - Uso do React Router (`useNavigate`) para redirecionamento após o login.
// - Uso do contexto de autenticação "useAuth" para acessar a função de login.
// - Estados locais para gerenciar os campos de usuário e senha.
// - Função `handleLogin` para processar o login, incluindo validação e armazenamento de dados do usuário.
// - Uso de toasts para feedback de ações (erro, informação, sucesso).
// - Formulário de login com campos para usuário e senha e botão de entrada.
// - Opção para registrar uma nova conta (ainda em desenvolvimento).


import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import "./styles.css";
import { errorToast, infoToast, successToast } from "../../components/Toast";
import RecLogin from "../../assets/img/recLogin.png";
import imageLogin from "../../assets/img/imageLogin.png";
import profilePhoto from "../../assets/img/profilePhoto.png";

export default function Login() {
  useEffect(() => {
    infoToast(`
    Caro avaliador, temos um usuário para testes:
    \nmaria456 | senha456
    `);
    infoToast(`
    Para atualizar a página, basta pressionar CTRL + R
    `);
  }, []);

  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const getUserByUsername = window.electron.users.getByUsername;
    const user = await getUserByUsername(username);

    if (!user) {
      errorToast("Usuário não encontrado");
      return;
    }

    if (user.password !== password) {
      errorToast("Usuário ou senha incorretos");
      return;
    }

    successToast(`Login efetuado com sucesso!`);
    sessionStorage.setItem("user_data", JSON.stringify(user));
    login();
    navigate("/");
  }

  return (
    <div className="login-container">
      <div style={{ position: "relative" }}>
        <img className="rec-login" src={RecLogin} alt="Logo"/>
        <div style={{
        position: "absolute",
        top: "35rem", 
        left: "30rem",
        width: "35rem",
        gap: "3rem",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        color: "white",
        fontSize: "18px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}>
        <img src={imageLogin} alt="Image Login" />
        <span style={{ fontSize: "2rem", wordSpacing: "0.3rem", fontWeight: "normal" }}>Toda terapia é uma aventura quando a criatividade encontra as maravilhas da curiosidade infantil</span>
      </div>
      </div>
      <div>
      <img className="profile-photo" src={profilePhoto} alt="Profile Photo" />
      <form className="inputs" onSubmit={handleLogin}>
        <input
          required
          type="text"
          placeholder="Nome"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
         style={{ marginBottom: "2rem", padding: "0.5rem" }}/>
        <input
          required
          type="password"
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
         style={{ marginBottom: "3rem", padding: "0.5rem" }}/>
        <input type="submit" value="LOGIN" style={{ marginBottom: "3rem", width: "21rem", height: "3rem"}} />
        <div style={{ marginBottom: "2rem" }}>
          <span
            className="register" style={{ fontSize: "1rem", fontWeight: "normal", color: "white" }}>
            Esqueceu sua senha? Recupere ela aqui
          </span>
        </div>
        <div>
          <span
            className="register" style={{ fontSize: "1rem", fontWeight: "normal", color: "white" }}>
            <a href="/register" style={{ fontSize: "1rem", fontWeight: "normal", color: "white" }}>Registrar usuário</a>
          </span>
        </div>
      </form>
      </div>
    </div>
  );
}