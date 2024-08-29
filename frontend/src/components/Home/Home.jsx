import React from 'react';
import { Link, useLocation } from "react-router-dom";
import useFetchUserName from '../../hooks/useFetchUserName';

function Home() {
    const location = useLocation();
    const email = location.state?.email || '';
    const nome = useFetchUserName(email);

    return (
        <div>
            <h1>Bem-vindo, {nome}!</h1>
            <Link to={'/'}>Início</Link>
        </div>
    );
}

export default Home;
