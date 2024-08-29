import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from './Cadastro'
import Login from './Login';
import Inicio from './Inicio';
import MFA from './Mfa';
import Home from './Home'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Inicio />} />
        <Route path="/cadastro" element={< Cadastro />} />
        <Route path="/login" element={< Login />} />
        <Route path="/mfa" element={< MFA />} />
        <Route path="/home" element={< Home />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
