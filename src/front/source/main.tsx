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
