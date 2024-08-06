import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./InfoCards.css";
import { FaUsers, FaUser, FaUtensils } from "react-icons/fa";

const backendUrl = "http://127.0.0.1:8000/";

const InfoCards = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalALMStudents, setTotalALMStudents] = useState(0);
  const [totalMeal, setTotalMeal] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${backendUrl}api/users`);
        setTotalUsers(response.data.length);

        const almResponse = await axios.get(`${backendUrl}api/users`, {
          params: { role: "ALN" },
        });
        setTotalALMStudents(almResponse.data.length);

        const mealResponse = await axios.get(`${backendUrl}api/meal`);
        setTotalMeal(mealResponse.data.length);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="info-cards">
      <div className="card">
        <Link to="/students" className="card-link">
          <div className="card-content">
            <div className="card-icon">
              <FaUsers className="users-icon" />
            </div>
            <div className="card-details">
              <p>{totalALMStudents}</p>
              <h3>Total de Alunos</h3>
              <h3>Ver todos</h3>
            </div>
          </div>

        </Link>
      </div>

      <div className="card">
      <Link to="/users" className="card-link">
        <div className="card-content">
          <div className="card-icon">
            <FaUser className="user-icon" />
          </div>
          <div className="card-details">
            <p>{totalUsers}</p>
            <h3>Total de Usuários</h3>
            <h3>Ver todos</h3>
          </div>
        </div>
        </Link>
      </div>

      <div className="card">
        <div className="card-content">
          <div className="card-icon">
            <FaUtensils className="utensils-icon" />
          </div>
          <div className="card-details">
            <p>{totalMeal}</p>
            <h3>Total de Refeições</h3>
            <h3>Ver todos</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
