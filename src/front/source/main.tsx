// Ponto de entrada principal da aplicação
// Inclui:
// - Importação do componente Router que gerencia as rotas da aplicação.
// - Uso do BrowserRouter do pacote `react-router-dom` para envolver o componente Router, habilitando a navegação baseada em rotas.
// - Inclusão do VLibras, uma biblioteca para inclusão de tradução em Libras (Língua Brasileira de Sinais), para tornar a aplicação acessível.


import ReactDOM from "react-dom/client";
import Router from "./routes/router";
import { BrowserRouter } from "react-router-dom";
import VLibras from "@djpfs/react-vlibras";
import React from "react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.Fragment>
    <VLibras forceOnload={true} />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.Fragment>,
);
