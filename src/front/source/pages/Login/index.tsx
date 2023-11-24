import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import "./styles.css";

export default function Login() {
  const { login } = useAuth();

  const navigate = useNavigate();

  function auth() {
    login("joao123", "123456");

    console.log("TESTE");

    navigate("/");
  }

  return (
    <div className="login-container">
      <div>
        <h1>Bem-vindo de volta!</h1>
        <p>Entre com sua conta parar acessar os projetos</p>
      </div>
      <div className="inputs">
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <button onClick={auth}>Entrar</button>
      </div>
    </div>
  );
}
