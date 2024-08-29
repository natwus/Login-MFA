import { useState, useEffect } from "react";
import { fetchUserName } from '../services/authService';

const useFetchUserName = (email) => {
    const [nome, setNome] = useState('');

    useEffect(() => {
        const fetchNome = async () => {
            try {
                const data = await fetchUserName(email);
                if (data.nome) {
                    setNome(data.nome);
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do usuário:', error);
            }
        };

        if (email) {
            fetchNome();
        }
    }, [email]);

    return nome;
};

export default useFetchUserName;
