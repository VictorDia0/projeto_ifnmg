import React, { useState, useEffect } from "react";
import axios from "../../axiosConfig";
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CTableHead,
  CTableRow,
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
} from "@coreui/react";

const Scheduling = () => {
  const [scheduledMeals, setScheduledMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(1);
  const [meals, setMeals] = useState([]);
  const [scholarshipStudents, setScholarshipStudents] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [requestDate, setRequestDate] = useState(""); // Adiciona o estado para a data da refeição
  const [addedMeals, setAddedMeals] = useState([]);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/mealrequests", {
        params: {
          date: filterDate,
        },
      });
      setScheduledMeals(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  const fetchMealsList = async () => {
    try {
      const response = await axios.get("/meal/");
      setMeals(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch meals:", err);
      setError("Failed to fetch meals");
    }
  };

  const fetchAddedMeals = async () => {
    try {
      const response = await axios.get("/meal/"); // Endpoint para obter refeições adicionadas
      setAddedMeals(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch added meals:", err);
      setError("Failed to fetch added meals");
    }
  };

  const fetchScholarshipStudents = async () => {
    try {
      const response = await axios.get("/users?bolsista=true"); // Assumindo que o endpoint é esse
      setScholarshipStudents(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error("Failed to fetch students:", err);
      setError("Failed to fetch students");
    }
  };

  const handleScheduleMeals = async () => {
    setShowModal(true);
    fetchMealsList();
    fetchScholarshipStudents();
  };

  const handleConfirmSchedule = async () => {
    try {
      const request = {
        meal_id: selectedMeal,
        request_date: requestDate,
        quantity: 1, // Supondo que todos os bolsistas devem receber a mesma quantidade
      };

      await axios.post("/mealrequests/", request);

      fetchMeals();
      fetchAddedMeals();
      setShowModal(false);
    } catch (err) {
      console.error("Failed to schedule meals:", err);
      setError("Failed to schedule meals");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "green";
      case "pending":
        return "orange";
      case "rejected":
        return "red";
      default:
        return "gray";
    }
  };

  useEffect(() => {
    fetchMeals();
    fetchAddedMeals(); // Obtém a lista de refeições ao montar o componente
  }, [filterDate]);

  return (
    <div>
      <h2>Refeições Agendadas</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <CFormInput
        type="date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
        className="mb-4"
      />
      <CButton color="primary" className="mb-4" onClick={handleScheduleMeals}>
        Agendar Refeições
      </CButton>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>Data</CTableHeaderCell>
            <CTableHeaderCell>Aluno</CTableHeaderCell>
            <CTableHeaderCell>Refeição</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {scheduledMeals.length > 0 ? (
            scheduledMeals.map((meal) => (
              <CTableRow key={meal.id}>
                <CTableDataCell>{meal.request_date}</CTableDataCell>
                <CTableDataCell>
                  {meal.user ? meal.user.name : "Desconhecido"}
                </CTableDataCell>
                <CTableDataCell>
                  {meal.meal ? meal.meal.name : "Desconhecido"}
                </CTableDataCell>
                <CTableDataCell
                  style={{
                    backgroundColor: getStatusColor(meal.status),
                    color: "white",
                  }}
                >
                  {meal.status}
                </CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="4" className="text-center">
                Nenhuma refeição agendada para a data selecionada
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
        <CModalHeader>
          <CModalTitle>Agendar Refeições</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormLabel htmlFor="meal">Selecione a Refeição</CFormLabel>
            <CFormSelect
              id="meal"
              className="mb-4"
              value={selectedMeal}
              onChange={(e) => setSelectedMeal(parseInt(e.target.value))}
            >
              {meals.map((meal) => (
                <option key={meal.id} value={meal.id}>
                  {meal.name}
                </option>
              ))}
            </CFormSelect>
            <CFormLabel htmlFor="date">Selecione a Data</CFormLabel>
            <CFormInput
              id="date"
              type="date"
              className="mb-4"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
            />
            <CButton color="primary" onClick={handleConfirmSchedule}>
              Confirmar
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default Scheduling;
