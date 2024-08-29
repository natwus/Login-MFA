import React, { useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";

function Home() {
    const [nome, setNome] = useState('');
    const location = useLocation();
    const email = location.state?.email || '';

    useEffect(() => {
        const fetchNomeUsuario = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/usuario?email=${email}`);
                const data = await response.json();

                if (response.ok) {
                    setNome(data.nome);
                } else {
                    console.error(data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do usuário:', error);
            }
        };

        fetchNomeUsuario();
    }, []);

    return (
        <>
            <h1>Bem-vindo, {nome}!</h1>
            <Link to={'/'}>Início</Link>
        </>
    );
}

export default Home;
