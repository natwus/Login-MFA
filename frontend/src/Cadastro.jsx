import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cadastro() {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [nome, setNome] = useState('')
    const navigate = useNavigate()

    const enviarDados = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/api/salvarDados', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                }),
            });

            console.log('Response OK:', response.ok);

            const data = await response.json();

            if (response.ok) {
                alert('Cadastro realizado!')
                navigate('/login');
            } else if (response.status === 400) {
                alert('Erro: Email já cadastrado!');
            } else {
                throw new Error(data.error || 'Erro!');
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <>
            <h1>Cadastro</h1>
            <form onSubmit={enviarDados}>
                <label>nome</label>
                <input
                    type="nome"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>email</label>
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>senha</label>
                <input
                    type="password"
                    name="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to={"/login"}>Já tem cadastro? </Link>
            <Link to={"/"}>Início</Link>
        </>
    )
}

export default Cadastro;