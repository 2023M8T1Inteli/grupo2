import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import VLibras from '@djpfs/react-vlibras'
import Router from './routes/router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <VLibras forceOnload={true} />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </React.StrictMode>
)
