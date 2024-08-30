import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { enviarEmail } from "./enviarEmail";

function Login() {
    const navigate = useNavigate();
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');

    useEffect(() => {
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigo(generatedCode);
    }, []);

    useEffect(() => {
        if (email) {
            const fetchNomeUsuario = async () => {
                try {
                    const response = await fetch(`http://localhost:3001/api/user/nome?email=${email}`);
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
        }
    }, [email]);
    

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            if (response.ok) {
                alert('Login bem-sucedido!');
                enviarEmail(nome, codigo, email);
                navigate('/mfa', { state: { codigo, email } });
            } else {
                alert('Email ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>Senha</label>
                <input
                    type="password"
                    name="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Entrar</button>
            </form>
            <Link to={"/cadastro"}>Não tem cadastro? </Link>
            <Link to={"/"}>Início</Link>
        </>
    );
}

export default Login;
