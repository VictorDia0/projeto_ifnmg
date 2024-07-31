import { FaUser, FaLock } from "react-icons/fa";
import "./formulario.css";
import axios from "axios";
import { useState } from "react";

const backendUrl = 'http://127.0.0.1:8000/';

const Formulario = () => {

    const [name, setName] = useState("");
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}api/users`, { name, user, password, role });
            console.log(response.data)
        } catch (error) {
            setError('Invalid credentials');
            console.error(error);
        }
    };
    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <h1>Cadastrar Usuário</h1>
                <hr />
                <div className="input-field">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Nome Completo"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        name="user"
                        placeholder="Digite seu usuario"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div className="input-field">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label>Selecione o tipo do usuario: </label>

                    <select
                        id="role"
                        type="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="ADM">ADM</option>
                        <option value="ALN">ALN</option>
                        <option value="NTC">NTC</option>
                        <option value="ASS">ASS</option>
                        <option value="EMP">EMP</option>

                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <hr />
                <div className="final">
                    <p>© 2024 Gabriel de Sousa e Victor Dias</p>
                </div>
            </form>
        </div>
    );
};

export default Formulario;