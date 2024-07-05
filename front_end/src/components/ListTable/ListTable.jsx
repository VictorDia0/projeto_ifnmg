import  { useState, useEffect } from 'react';
import axios from 'axios';
import './ListTable.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListTable = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cpf: '',
    phone_number: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/');
        setStudents(response.data);
        setFilteredStudents(response.data);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter(student => student.cpf.includes(searchTerm))
    );
  }, [searchTerm, students]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/users/${id}`);
      setStudents(students.filter(student => student.id !== id));
      setFilteredStudents(filteredStudents.filter(student => student.id !== id));
    } catch (error) {
      console.error('Failed to delete student', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingStudent) {
      // Editar aluno
      try {
        const response = await axios.put(`http://127.0.0.1:8000/api/users/${formData.id}`, formData);
        setStudents(students.map(student => (student.id === formData.id ? response.data : student)));
        setFilteredStudents(filteredStudents.map(student => (student.id === formData.id ? response.data : student)));
      } catch (error) {
        console.error('Failed to edit student', error);
      }
    } else {
      // Adicionar novo aluno
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/users', formData);
        setStudents([...students, response.data]);
        setFilteredStudents([...filteredStudents, response.data]);
      } catch (error) {
        console.error('Failed to add student', error);
      }
    }
    setShowModal(false);
    setEditingStudent(null);
    setFormData({ id: '', name: '', cpf: '', phone_number: '', email: '', role: '' });
  };

  return (
    <div className="list-table">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar por CPF"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button className="add" onClick={() => setShowModal(true)}>Adicionar Aluno</button>
      </div>
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
          {filteredStudents.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.cpf}</td>
              <td>{student.phone_number}</td>
              <td>{student.email}</td>
              <td>{student.role}</td>
              <td>
                <button onClick={() => handleEdit(student)}><FaEdit /></button>
                <button onClick={() => handleDelete(student.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
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
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}
    </div>
  );
};

export default ListTable;
