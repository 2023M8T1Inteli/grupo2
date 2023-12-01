// Tela Home da aplicação.
// Inclui:
// - Utilização do componente `AutoRedirect` para redirecionamento automático caso não esteja autenticado.
// - Estrutura da página inicial com cabeçalho e cards interativos.
// - Dois cards com imagens e textos descritivos, representando diferentes seções da aplicação. (Acompanhamento e Projetos)
// - Uso de `infoToast` para feedback ao clicar em elementos ainda em desenvolvimento.
// - Estilização através do arquivo `styles.css`.


import { infoToast } from "../../components/Toast";
import { AutoRedirect } from "../../contexts/AuthContext";
import "./styles.css";
import child from "/child-having-an-idea.jpg";
import folder from "/folder.jpg";

export default function Home() {
  console.log("TESTE");

  return (
    <div className="home-container">
      <AutoRedirect />
      <h1>O que vamos fazer?</h1>
      <div>
        <div className="card">
          <img src={child} />
          <div>
            <p>Acompanhe as crianças</p>
            <p>Veja o histórico das sessões e seus resultados</p>
            <a
              onClick={() => {
                infoToast("Trabalho em progresso! 🚀");
              }}
            >
              Acompanhamento
            </a>
          </div>
        </div>
        <div className="card">
          <img src={folder} />
          <div>
            <p>Projetos</p>
            <p>Crie, execute e visualize projetos</p>
            <a href="/projects">Meus Projetos</a>
          </div>
        </div>
      </div>
    </div>
  );
}