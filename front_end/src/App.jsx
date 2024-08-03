import "./App.css";
import Login from "./components/login/Login";
import { Routes, Route, BrowserRouter } from "react-router-dom";


import Users from "./pages/admin/Users/Users";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/adm" element={<Home />} />
          <Route path="/students" element={<Users/>} />
          <Route path="/meals" element={<Home />} />
          <Route path="/users" element={<Home />} />
          <Route path="/cadastrar" element={<Cadastrar />} /> */}

          
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
