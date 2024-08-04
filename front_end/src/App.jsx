import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import MainAdm from "./ADM/MainAdm";
import { useState } from "react";
import './App.css'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      {isLoggedIn ? (
        <Route path="/adm/*" element={<MainAdm />} />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default App;
