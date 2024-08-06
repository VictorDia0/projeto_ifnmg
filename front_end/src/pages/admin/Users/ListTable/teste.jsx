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
  


  
  */