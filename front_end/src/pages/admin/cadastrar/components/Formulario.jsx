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
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}api/users`, { name, user, password, role });
            console.log(response.data);
            setSuccess(true);  // Mostra a mensagem de sucesso
        } catch (error) {
            setError('Erro ao cadastrar usuário');
            console.error(error);
        }
    };

    const handleOkClick = () => {
        setSuccess(false);  // Esconde a mensagem de sucesso
        setName('');
        setUser('');
        setPassword('');
        setRole('');
        setError('');
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
                        placeholder="Digite seu usuário"
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
                    <label>Selecione o tipo do usuário: </label>
                    <select
                        id="role"
                        name="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="ADM">ADMINISTRADOR</option>
                        <option value="ALN">ALUNO</option>
                        <option value="NTC">NUTRICIONISTA</option>
                        <option value="ASS">ASSISTENTE SOCIAL</option>
                        <option value="EMP">EMPRESA</option>
                    </select>
                </div>
                <button type="submit">Cadastrar</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <hr />
                <div className="final">
                    <p>© 2024 Gabriel de Sousa e Victor Dias</p>
                </div>
            </form>

            {success && (
                <div className="success-modal">
                    <div className="success-content">
                        <p>Usuário cadastrado com sucesso!</p>
                        <button onClick={handleOkClick}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Formulario;
