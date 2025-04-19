import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './templates/home/Home.jsx'
import Login from './templates/login/Login.jsx'
import Dashboard from './templates/dashboard/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router ={router}/>
    </StrictMode>
)