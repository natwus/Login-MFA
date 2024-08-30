import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cadastro from './components/Cadastro/Cadastro';
import Login from './components/Login/Login';
import Inicio from './components/Inicio/Inicio';
import MFA from './components/MFA/Mfa'; 
import Home from './components/Home/Home';                                                                                                                                                                                                                        
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mfa" element={<MFA />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
