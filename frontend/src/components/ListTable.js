import { useState, useEffect } from 'react'
import axios from 'axios'
import { cilPlus, cilPen, cilDelete, cilSearch } from '@coreui/icons'
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
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

const ListTable = () => {
  const [students, setStudents] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState(null)
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    cpf: '',
    phone_number: '',
    email: '',
    role: '',
  })
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/')
        setStudents(response.data)
        setFilteredStudents(response.data)
      } catch (error) {
        console.error('Failed to fetch students', error)
        setError('Failed to fetch students')
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  useEffect(() => {
    const filtered = students.filter((student) =>
      (student.cpf ? student.cpf.toLowerCase().includes(searchTerm.toLowerCase()) : false) ||
      (student.name ? student.name.toLowerCase().includes(searchTerm.toLowerCase()) : false)
    )
    setFilteredStudents(filtered)
  }, [searchTerm, students])

  const handleEdit = (student) => {
    setEditingStudent(student)
    setFormData({
      id: student.id,
      name: student.name,
      cpf: student.cpf,
      phone_number: student.phone_number,
      email: student.email,
      role: student.role,
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${id}`)
        setStudents((prev) => prev.filter((student) => student.id !== id))
        setFilteredStudents((prev) => prev.filter((student) => student.id !== id))
        setSuccessMessage('Student deleted successfully')
      } catch (error) {
        console.error('Failed to delete student', error)
        setError('Failed to delete student')
      }
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingStudent) {
        const response = await axios.put(`http://127.0.0.1:8000/api/users/${formData.id}`, formData)
        setStudents((prev) =>
          prev.map((student) => (student.id === formData.id ? response.data : student))
        )
        setFilteredStudents((prev) =>
          prev.map((student) => (student.id === formData.id ? response.data : student))
        )
        setSuccessMessage('Student updated successfully')
      } else {
        const response = await axios.post('http://127.0.0.1:8000/api/users', formData)
        setStudents((prev) => [...prev, response.data])
        setFilteredStudents((prev) => [...prev, response.data])
        setSuccessMessage('Student added successfully')
      }
      setShowModal(false)
      setEditingStudent(null)
      setFormData({ id: '', name: '', cpf: '', phone_number: '', email: '', role: '' })
    } catch (error) {
      console.error('Failed to save student', error)
      setError('Failed to save student')
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setEditingStudent(null)
    setFormData({ id: '', name: '', cpf: '', phone_number: '', email: '', role: '' })
  }

  const handleStudentClick = (student) => {
    setSelectedStudent(student)
  }

  return (
    <div className="d-flex">
      <div className="flex-grow-1">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
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
            <CButton color="primary" onClick={() => setShowModal(true)} className="ms-2">
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
                  style={{ cursor: 'pointer' }}
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
                        e.stopPropagation()
                        handleEdit(student)
                      }}
                      className="me-2"
                    >
                      <CIcon icon={cilPen} />
                    </CButton>
                    <CButton
                      color="danger"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(student.id)
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

      <div style={{ flex: '0 0 300px', marginLeft: '20px' }}>
        {selectedStudent && (
          <CCard>
            <CCardHeader>Detalhes do usuário</CCardHeader>
            <CCardBody>
              <p><strong>Nome:</strong> {selectedStudent.name}</p>
              <p><strong>CPF:</strong> {selectedStudent.cpf}</p>
              <p><strong>Número:</strong> {selectedStudent.phone_number}</p>
              <p><strong>Email:</strong> {selectedStudent.email}</p>
              <p><strong>Tipo:</strong> {selectedStudent.role}</p>
            </CCardBody>
          </CCard>
        )}
      </div>

      <CModal visible={showModal} onClose={handleModalClose}>
        <CModalHeader>
          <CModalTitle>{editingStudent ? 'Editar' : 'Adicionar um novo User'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className='mb-4'
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className='mb-4'
              type="text"
              placeholder="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className='mb-4'
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className='mb-4'
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className='mb-4'
              type="text"
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
            <CButton type="submit" color="primary" className="mt-2">
              {editingStudent ? 'Update' : 'Add'}
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </div>
  )
}

export default ListTable
