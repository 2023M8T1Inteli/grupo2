import ReactDOM from 'react-dom/client'
import Router from './routes/router'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
        <BrowserRouter>
          <Router />
        </BrowserRouter>
)