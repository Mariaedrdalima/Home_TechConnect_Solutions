import React from "react";
import { Route, BrowserRouter } from "react-router-dom";
import Home from './templates/home/Home.jsx'
import Login from './templates/login/Login.jsx'
import Dashboard from './templates/dashboard/Dashboard.jsx'

export default Routes = () => {
   return(
       <BrowserRouter>
           <Route component = { Home }  path="/" />
           <Route component = { Login }  path="/login" exact />
           <Route component = { Dashboard }  path="/dashboard" />
       </BrowserRouter>
   )
};