import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [codigo, setCodigo] = useState('');

    useEffect(() => {
        // Gera o código de verificação
        const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCodigo(generatedCode);

    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha,
                }),
            });

            if (response.ok) {
                alert('Login bem-sucedido!');
                navigate('/mfa', { state: { codigo: codigo, email: email } });
                enviarEmail();
            } else {
                alert('Email ou senha incorretos!');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
        }
    };

    function enviarEmail() {

        const templateParams = {
            texto: codigo,
            email: email,
        };

        emailjs
            .send(
                "seu service id", //Service ID
                "seu template id", //Template ID
                templateParams,
                "sua publick key" //Public key
            )
            .then(
                (response) => {
                    console.log("EMAIL ENVIADO", response.status, response.text);
                },
                (err) => {
                    console.log("ERRO: ", err);
                }
            );
    }

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
    )
}

export default Login;