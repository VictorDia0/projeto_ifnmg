import "./App.css";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/admin/HomeUsers";

const App = () => {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/adm" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
