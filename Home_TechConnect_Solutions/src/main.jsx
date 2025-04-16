import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import SignInSide from './templates/sign-in-side/SignInSide.jsx'
import Dashboard from './templates/dashboard/Dashboard.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Dashboard />
  </StrictMode>,
)