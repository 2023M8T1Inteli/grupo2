// index.tsx ou index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import VLibras from '@djpfs/react-vlibras';
import Router from './routes/router';
import { ThemeProvider } from './contexts/ThemeContext';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider>
    <VLibras forceOnload={true} />
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </ThemeProvider>
);