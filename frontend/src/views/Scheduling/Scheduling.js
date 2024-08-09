import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CButton, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableHead, CTableRow } from '@coreui/react';

const Scheduling = () => {
  const [meals, setMeals] = useState([]);
  const [scheduledMeals, setScheduledMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


    const fetchMeals = async () => {
        setLoading(true);
        try {
          const mealsResponse = await axios.get('/api/meals');
          const scheduledResponse = await axios.get('/api/requestmeals');
          setMeals(mealsResponse.data);
          setScheduledMeals(Array.isArray(scheduledResponse.data) ? scheduledResponse.data : []);
        } catch (err) {
          console.error('Failed to fetch data:', err);
          setError('Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
      
      const handleScheduleMeals = async () => {
        try {
          await axios.post('/api/schedule-meals');
          const response = await axios.get('/api/scheduled-meals');
          setScheduledMeals(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
          console.error('Failed to schedule meals:', err);
          setError('Failed to schedule meals');
        }
      };
      
  return (
    <div>
      <h2>Refeições Agendadas</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <CButton color="primary" onClick={handleScheduleMeals} className="mb-4">
        Agendar Refeições
      </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Data</CTableHeaderCell>
            <CTableHeaderCell>Refeição</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {scheduledMeals.length > 0 ? (
            scheduledMeals.map((meal) => (
              <CTableRow key={meal.id}>
                <CTableDataCell>{meal.date}</CTableDataCell>
                <CTableDataCell>{meal.name}</CTableDataCell>
                <CTableDataCell>{meal.status}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="3" className="text-center">
                Nenhuma refeição agendada
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
      
    </div>
  );
};

export default Scheduling;
