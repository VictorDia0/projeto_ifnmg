import { useState, useEffect } from "react";
import axios from "../axiosConfig";
import { cilPlus, cilPen, cilDelete, cilSearch } from "@coreui/icons";
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
  CFormInput,
  CForm,
  CCard,
  CCardBody,
  CCardHeader,
  CFormSelect
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const ListTable = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    cpf: "",
    phone_number: "",
    email: "",
    user: "",
    password: "",
    role: "",
    bolsista: "false" // Alterado para string
  });
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/users/");
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error("Falha ao lista os alunos", error);
        setError("Falha ao lista os aluno");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  useEffect(() => {
    const filtered = students.filter(
      (student) =>
        (student.cpf
          ? student.cpf.toLowerCase().includes(searchTerm.toLowerCase())
          : false) ||
        (student.name
          ? student.name.toLowerCase().includes(searchTerm.toLowerCase())
          : false)
    );
    setFilteredStudents(filtered);
  }, [searchTerm, students]);

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({
      id: student.id,
      name: student.name,
      cpf: student.cpf || "",
      phone_number: student.phone_number || "",
      email: student.email || "",
      user: student.user || "",
      password: "", // Não exibir a senha ao editar
      role: student.role || "",
      bolsista: student.bolsista ? true : false // Converter para string
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza que deseja apaga os dados do aluno?")) {
      try {
        // Verifique o cabeçalho antes da solicitação
        console.log('Request headers before DELETE:', axios.defaults.headers.common);
  
        await axios.delete(`/users/${id}`);
        setStudents((prev) => prev.filter((student) => student.id !== id));
        setFilteredStudents((prev) =>
          prev.filter((student) => student.id !== id)
        );
        setSuccessMessage("Estudante deletado com sucesso");
      } catch (error) {
        console.error("Falha ao deletar estudante!", error);
        setError("Falha ao deletar estudante!");
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = editingStudent
        ? await axios.put(`/users/${formData.id}`, formData)
        : await axios.post("/users", formData);
      setSuccessMessage(
        `Estudante ${editingStudent ? "alterado" : "adicionado"} com sucesso`
      );
      setShowModal(false);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Ocorreu um erro");
      } else if (error.request) {
        setError("Nenhuma resposta recebida do servidor");
      } else {
        setError(`Erro na solicitação: ${error.message}`);
      }
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

 

  const handleModalClose = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormData({
      id: "",
      name: "",
      cpf: "",
      phone_number: "",
      email: "",
      user: "",
      password: "",
      role: "",
      bolsista: false
    });
  };

  const handleStudentClick = (student) => {
    setSelectedStudent(student);
  };

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <div className="search-bar mb-4">
          <CForm className="d-flex align-items-center">
            <CFormInput
              type="text"
              placeholder="Pesquisar por CPF ou Nome"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="me-2"
            />
            <CButton color="primary">
              <CIcon icon={cilSearch} />
            </CButton>
            <CButton
              color="primary"
              onClick={() => setShowModal(true)}
              className="ms-2"
            >
              <CIcon icon={cilPlus} />
            </CButton>
          </CForm>
        </div>

        <CTable>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Nome</CTableHeaderCell>
              <CTableHeaderCell scope="col">CPF</CTableHeaderCell>
              <CTableHeaderCell scope="col">Número</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Tipo</CTableHeaderCell>
              <CTableHeaderCell scope="col">Opções</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <CTableRow
                  key={student.id}
                  onClick={() => handleStudentClick(student)}
                  style={{ cursor: "pointer" }}
                >
                  <CTableDataCell>{student.id}</CTableDataCell>
                  <CTableDataCell>{student.name}</CTableDataCell>
                  <CTableDataCell>{student.cpf}</CTableDataCell>
                  <CTableDataCell>{student.phone_number}</CTableDataCell>
                  <CTableDataCell>{student.email}</CTableDataCell>
                  <CTableDataCell>{student.role}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="info"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(student);
                      }}
                      className="me-2"
                    >
                      <CIcon icon={cilPen} />
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(student.id);
                      }}
                    >
                      <CIcon icon={cilDelete} />
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))
            ) : (
              <CTableRow>
                <CTableDataCell colSpan="7" className="text-center">
                  Nenhum usuário encontrado
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </div>

      <div style={{ flex: "0 0 300px", marginLeft: "20px" }}>
        {selectedStudent && (
          <CCard>
            <CCardHeader>Detalhes do usuário</CCardHeader>
            <CCardBody>
              <p>
                <strong>Nome:</strong> {selectedStudent.name}
              </p>
              <p>
                <strong>CPF:</strong> {selectedStudent.cpf}
              </p>
              <p>
                <strong>Número:</strong> {selectedStudent.phone_number}
              </p>
              <p>
                <strong>Email:</strong> {selectedStudent.email}
              </p>
              <p>
                <strong>Tipo:</strong> {selectedStudent.role}
              </p>
            </CCardBody>
          </CCard>
        )}
      </div>

      <CModal visible={showModal} onClose={handleModalClose}>
        <CModalHeader>
          <CModalTitle>
            {editingStudent ? "Editar" : "Adicionar um novo Usuário"}
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
          <CFormInput
              type="text"
              name="name"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              className="mb-3"
              required
            />
            <CFormInput
              type="text"
              name="cpf"
              placeholder="CPF"
              value={formData.cpf}
              onChange={handleInputChange}
              className="mb-3"
              
            />
            <CFormInput
              type="text"
              name="phone_number"
              placeholder="Número"
              value={formData.phone_number}
              onChange={handleInputChange}
              className="mb-3"
              required
            />
            <CFormInput
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="mb-3"
              required
            />
            <CFormInput
              type="text"
              name="user"
              placeholder="Nome de Usuário"
              value={formData.user}
              onChange={handleInputChange}
              className="mb-3"
              required
            />
            <CFormInput
              type="password"
              name="password"
              placeholder="Senha"
              value={formData.password}
              onChange={handleInputChange}
              className="mb-3"
              required={!editingStudent} 
            />
            <CFormSelect
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mb-3"
              required
            >
              <option value="">Selecione o papel</option>
              <option value="ADM">Admin</option>
              <option value="ALN">Aluno</option>
              <option value="NTC">Nutricionista</option>
            </CFormSelect>
            <CFormSelect
              name="bolsista"
              value={formData.bolsista}
              onChange={handleInputChange}
              className="mb-3"
              required
            >
              <option value="false">Não</option>
              <option value="true">Sim</option>
            </CFormSelect>
            <CButton type="submit" color="primary" className="mt-2">
              {editingStudent ? "Atualizar" : "Adicionar"}
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default ListTable;
