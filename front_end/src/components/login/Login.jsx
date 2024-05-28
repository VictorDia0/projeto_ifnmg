import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

import "./login.css";

axios.get('http://127.0.0.1:8000/api/users')
    .then((response) => {
        console.log(response)
    })

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post(`http://127.0.0.1:8000/api/login`, { username, password })
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit} method="POST">
                <img src="/images/ifnmg.png" alt="" width="100" />
                <hr />
                <p>Preencha os campos para entrar</p>

                <div className="input-field">
                    <FaUser className="icon" />
                    <input type="text" placeholder="Digite seu usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div >
                <div className="input-field">
                    <FaLock className="icon" />
                    <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <input type="checkbox" />
                    <label> Permanecer Conectado</label>
                </div>
                <button type="submit">Entrar</button>
                <hr />
                <div className="final">
                    <p>© 2024 Gabriel de Sousa e Victor Dias</p>
                </div>
            </form>
        </div>
    );
};

export default Login;