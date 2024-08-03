import { useState, useEffect } from "react";
import axios from "axios";
import "./ListTable.css";
import { FaEdit, FaTrash } from "react-icons/fa";

const backendUrl = "http://127.0.0.1:8000/";

const ListTableStudents = () => {
  const [students, setStudents] = useState([]);

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
  
// Função para deletar um estudante
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}api/users/${id}`);
      await fetchStudents();
    } catch (error) {
      console.error("Failed to delete student", error);
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
                <button /* onClick={() => handleEdit(users)} */>
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
    </div>
  );
};

export default ListTableStudents;
