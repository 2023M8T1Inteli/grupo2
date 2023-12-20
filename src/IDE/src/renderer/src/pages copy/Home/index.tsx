import React from "react";
import { AutoRedirect } from "../../contexts/AuthContext";
import "./styles.css";
import child from "../../assets/img/kid_image.png";
import folder from "../../assets/img/kid_toy.png";
import Button from "../../components/Button";

export default function Home() {

  return (
    <div className="home-container red-screen">
    <Button
          variant="back"
        />
      <AutoRedirect />
      <div className="content">
        <h1 className="title">Qual tarefa deseja realizar hoje?</h1>
        <p className="subtitle">Você quer acompanhar o desenvolvimento das crianças e iniciar novas experiências?</p>

        <div className="card-container">

          <a href="/patients" className="card"> {/* Adiciona o link para "/patients" */}
            <img src={child} alt="Child" />
            <div className="card-text">
              <p>Imagem 1</p>
            </div>
          </a>

          <a href="/projects" className="card red-card">
            <img src={folder} alt="Folder" className="red-card-image" />
            <div className="card-text">
              <p>Imagem 2</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
