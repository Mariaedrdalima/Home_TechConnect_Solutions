import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './templates/home-page/HomePage.jsx'
import Login from './templates/login/Login.jsx'
import Dashboard from './templates/dashboard/Dashboard.jsx'
import Home from './templates/home/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element:<Dashboard />
  },
  {
    path: "/home",
    element:<Home />
  },
])

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <RouterProvider router ={router}/>
    </StrictMode>
)