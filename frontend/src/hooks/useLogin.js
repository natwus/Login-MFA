import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from '../services/authService';

const useLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await loginUser(email, senha);
            if (response.ok) {
                alert('Login bem-sucedido!');
                navigate('/mfa', { state: { email } });
            } else {
                alert('Email ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return {
        email,
        senha,
        setEmail,
        setSenha,
        handleLogin,
    };
};

export default useLogin;
