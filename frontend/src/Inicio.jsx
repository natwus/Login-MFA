import { Link } from "react-router-dom";

function Inicio() {
    return (
        <>
            <h1>Início</h1>
            <Link to={"/cadastro"}>Cadastro / </Link>
            <Link to={"/login"}>Login</Link>
        </>
    )
}

export default Inicio;