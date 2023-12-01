import React from "react";
import Button from "../../components/Button";
import "./styles.css";
import play from "/play.svg";
import plus from "/plus.svg";
import { useAuth } from "../../contexts/AuthContext";
import { infoToast } from "../../components/Toast";

export default function Projects() {
  const { userName } = useAuth();

  return (
    <div className="projects-container">
      <div className="options">
        <Button
          variant="back"
          onClick={() => {
            console.log("A");
          }}
        />
        <h1>Projetos</h1>
        <Button variant="settings" />
      </div>
      <div className="projects-list">
        <a
          className="project add"
          onClick={() => {
            infoToast("Trabalho em progresso! 🚀");
          }}
        >
          <img src={plus} />
        </a>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
        <div className="project">
          <div>
            <p className="project-name">Nome do projeto</p>
            <p className="created-at">Criado em 27/10</p>
            <p className="project-author">
              por <b>{userName()}</b>
            </p>
          </div>
          <a href="/patients">
            <img src={play} />
          </a>
        </div>
      </div>
    </div>
  );
}
