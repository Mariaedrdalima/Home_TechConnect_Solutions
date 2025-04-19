import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './templates/home/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Home />
  </StrictMode>,
)