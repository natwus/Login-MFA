import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from '../../services/authService';

function Cadastro() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nome, setNome] = useState('');
    const navigate = useNavigate();

    const enviarDados = async (event) => {
        event.preventDefault();

        try {
            const data = await registerUser(nome, email, senha);

            if (data.sucess) {
                alert('Cadastro realizado!');
                navigate('/login');
            } else {
                alert('Erro: ' + data.message);
            }
        } catch (error) {
            console.error('Erro ao enviar os dados:', error);
        }
    };

    return (
        <div>
            <h1>Cadastro</h1>
            <form onSubmit={enviarDados}>
                <label>Nome</label>
                <input
                    type="text"
                    name="nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
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
                <button type="submit">Cadastrar</button>
            </form>
            <Link to={"/login"}>Já tem cadastro? </Link>
            <Link to={"/"}>Início</Link>
        </div>
    );
}

export default Cadastro;
