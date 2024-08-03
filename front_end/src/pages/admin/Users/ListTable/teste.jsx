/* const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cpf: '',
    phone_number: '',
    email: '',
    role: '',
  }); */

   /* const handleEdit = (student) => {
    setEditingStudent(student);
    setFormData({ ...student });
    setShowModal(true);
  }; */

  /*  const handleInputChange = (e) => {
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
  };*/


  {/* 
      {showModal && ( 
        <div className="modal">
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
          <button onClick={() => setShowModal(false)}>Cancelar</button>
        </div>
      )}*/}

/* 

const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);


useEffect(() => {
    setFilteredStudents(
      students.filter(
        (student) => student && student.cpf && student.cpf.includes(searchTerm)
      )
    );
  }, [searchTerm, students]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${backendUrl}api/users/${id}`);
      setStudents(students.filter((student) => student.id !== id));
      setFilteredStudents(
        filteredStudents.filter((student) => student.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete student", error);
    }
  };
  

   <tbody>
          {filteredStudents.map((users) => (
            <tr key={users.id}>
              <td>{users.id}</td>
              <td>{users.name}</td>
              <td>{users.cpf}</td>
              <td>{users.phone_number}</td>
              <td>{users.email}</td>
              <td>{users.role}</td>
              <td>
                <button /* onClick={() => handleEdit(users)} >
                <FaEdit />
                </button>
                <button onClick={() => handleDelete(users.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
  
  */