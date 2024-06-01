import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";

import "./login.css";

const backendUrl = 'http://127.0.0.1:8000/api';


const Login = () => {

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <img src="/images/ifnmg.png" alt="" width="100" />
                <hr />
                <p>Preencha os campos para entrar</p>

                <div className="input-field">
                    <FaUser className="icon" />
                    <input type="text" name='user' placeholder="Digite seu usuario" />
                </div >
                <div className="input-field">
                    <FaLock className="icon" />
                    <input type="password" name='password' placeholder="Senha" />
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



function handleSubmit(event) {
    event.preventDefault();
    try {
        const user = event.target.user.value;
        const password = event.target.password.value;

        axios.post(`${backendUrl}/login`, { user, password })
            .then(response => {
                console.log('Dados enviados com sucesso');
                if (response.data.role === 'ADM') {
                    window.location.href = 'http://127.0.0.1:8000/api/users';
                }
            })
            
    } catch (error) {
        console.log(error);
    }
}