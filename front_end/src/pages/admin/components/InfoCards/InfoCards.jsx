import { useState, useEffect } from 'react';
import axios from 'axios';
import './InfoCards.css';
import { FaUsers, FaUser, FaUtensils } from 'react-icons/fa';
const backendUrl = 'http://127.0.0.1:8000/';

const InfoCards = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalALMStudents, setTotalALMStudents] = useState(0);
  const [totalMeal, setTotalMeal] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users');
        setTotalStudents(response.data.length);

        // Filtrando alunos com a regra ALM
        const almResponse = await axios.get('http://127.0.0.1:8000/api/users/', {
          params: {
            role: 'ALN'
          }
        });
        setTotalALMStudents(almResponse.data.length);

        const mealResponse = await axios.get(`${backendUrl}api/meal`);
        setTotalMeal(mealResponse.data.length);

      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <div className="info-cards">
      <div className="card">
        <div className="card-content">
          <div className="card-icon">
            <FaUsers className="users-icon" />
          </div>
          <div className="card-details">
            <p>{totalALMStudents}</p>

            <h3>Total de Alunos</h3>

          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="card-icon">
            <FaUser className="user-icon" />
          </div>
          <div className="card-details">
            <p>{totalStudents}</p>
            <h3>Total de Usuários</h3>

          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-content">
          <div className="card-icon">
            <FaUtensils className="utensils-icon" />
          </div>
          <div className="card-details">
            <p>{totalMeal}</p>
            <h3>Total de Refeições</h3>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCards;
