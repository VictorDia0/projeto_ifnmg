import { useState, useEffect } from "react";
import axios from "axios";
import "./ListTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const backendUrl = "http://127.0.0.1:8000/";

const ListTableStudents = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    cpf: "",
    phone_number: "",
    email: "",
    role: "",
  });

  const fetchStudents = async () => {
    try {
      const responseStudents = await axios.get(`${backendUrl}api/users/`, {
        params: {
          role: "ALN",
        },
      });
      setStudents(responseStudents.data);
    } catch (error) {
      console.error("Failed to fetch students", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}api/users/${id}`);
      await fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        await axios.put(`${backendUrl}api/users/${formData.id}`, formData);
        setStudents(students.map(student => (student.id === formData.id ? formData : student)));
      } else {
        const response = await axios.post(`${backendUrl}api/users`, formData);
        setStudents([...students, response.data]);
      }
      setShowModal(false);
      setFormData({
        id: '',
        name: '',
        cpf: '',
        phone_number: '',
        email: '',
        role: '',
      });
    } catch (error) {
      console.error('Failed to save student', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="list-table">
      <div className="search-bar">
        <input type="text" placeholder="Pesquisar por CPF" />
      </div>
      <h2>Lista de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Email</th>
            <th>Função</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.map((users) => (
            <tr key={users.id}>
              <td>{users.id}</td>
              <td>{users.name}</td>
              <td>{users.cpf}</td>
              <td>{users.phone_number}</td>
              <td>{users.email}</td>
              <td>{users.role}</td>
              <td>
                <button onClick={() => handleEdit(users)}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(users.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <form onSubmit={handleFormSubmit}>
              <h2>{editingStudent ? 'Editar Aluno' : 'Adicionar Novo Aluno'}</h2>
              <input
                type="text"
                placeholder="Nome"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="CPF"
                name="cpf"
                value={formData.cpf}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Telefone"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                placeholder="Função"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
              <button type="submit">{editingStudent ? 'Salvar' : 'Adicionar'}</button>
            </form>
            <button className="cancelar" onClick={() => setShowModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListTableStudents;
