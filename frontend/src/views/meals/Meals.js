import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { CFormInput, CButton, CCard, CCardBody, CCardHeader, CCardTitle, CForm, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';

const Meals = () => {
  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
  });
  const [meals, setMeals] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch meals from API on component mount
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('/meal');
        setMeals(response.data);
      } catch (error) {
        console.error('Failed to fetch meals', error);
      }
    };

    fetchMeals();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/meal', formData);
      setMeals([...meals, response.data.meal]);
      setSuccessMessage('Refeição adicionada com sucesso!');
      setErrorMessage('');
      setFormData({ name: '', ingredients: '' });
    } catch (error) {
      console.error('Erro ao adicionar refeição:', error.response || error.message);
      setErrorMessage('Erro ao adicionar refeição. Tente novamente.');
      setSuccessMessage('');
    }
  };

  return (
    <CCard>
      <CCardHeader>
        <CCardTitle>Adicionar Refeição</CCardTitle>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            type="text"
            name="name"
            placeholder="Nome da Refeição"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <CFormInput
            type="text"
            name="ingredients"
            placeholder="Ingredientes"
            value={formData.ingredients}
            onChange={handleInputChange}
            className="mt-3"
            required
          />
          <CButton type="submit" color="primary" className="mt-3">
            Adicionar
          </CButton>
          {successMessage && <p className="text-success mt-3">{successMessage}</p>}
          {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
        </CForm>

        <h2 className="mt-4">Refeições Adicionadas</h2>
        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Nome</CTableHeaderCell>
              <CTableHeaderCell>Ingredientes</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {meals.map((meal) => (
              <CTableRow key={meal.id}>
                <CTableDataCell>{meal.name}</CTableDataCell>
                <CTableDataCell>{meal.ingredients}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        {/* <ListMeals></ListMeals> */}
      </CCardBody>
    
    </CCard>
    
  );
};

export default Meals;
