// src/components/login/Login.js
import  { useState } from "react";
import { useHistory } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "./login.css";

const backendUrl = 'http://127.0.0.1:8000/api';

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`${backendUrl}/login`, { user, password });
            const { token, role } = response.data;

            localStorage.setItem('token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            if (role === 'ADM') {
                history.push('/admin-dashboard');
            } else if (role === 'NTC') {
                history.push('/user-dashboard');
            } else {
                setError('Unauthorized role');
            }
        } catch (error) {
            setError('Invalid credentials');
            console.error(error);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <img src="/images/ifnmg.png" alt="" width="100" />
                <hr />
                <p>Preencha os campos para entrar</p>

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
                    <input type="checkbox" />
                    <label> Permanecer Conectado</label>
                </div>
                <button type="submit">Entrar</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
                <hr />
                <div className="final">
                    <p>© 2024 Gabriel de Sousa e Victor Dias</p>
                </div>
            </form>
        </div>
    );
};

export default Login;
