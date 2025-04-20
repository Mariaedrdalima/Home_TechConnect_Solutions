import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from './templates/home/Home.jsx'
import Login from './templates/login/Login.jsx'
import Dashboard from './templates/dashboard/Dashboard.jsx'

export default function Routes(){
   return(
        <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
   )
};