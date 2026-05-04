import React from 'react'
import ReactDOM from 'react-dom/client'
import { AppRouter } from './routers/AppRouter'
import './index.css' // Aquí está nuestro Tailwind

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>,
)