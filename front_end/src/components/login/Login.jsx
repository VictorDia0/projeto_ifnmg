import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "./login.css";

const backendUrl = 'http://127.0.0.1:8000/';

const Login = () => {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(`${backendUrl}api/login`, {
                user,
                password,
            });
            const { token, role } = response.data;

            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

            if (role === "ADM") {
                navigate("/adm");
            } else if (role === "NTC") {
                navigate("/user-dashboard");
            } else {
                setError("Unauthorized role");
            }
        } catch (error) {
            setError("Invalid credentials");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <img src="/images/ifnmg.png" alt="" width="100" />
                <hr />
                <p>Preencha os campos para entrar</p>
                <br />

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
                <button type="submit">
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                <hr />
                <div className="final">
                    <p>© 2024 Gabriel de Sousa e Victor Dias</p>
                </div>
            </form>
        </div>
    );
};

export default Login;
