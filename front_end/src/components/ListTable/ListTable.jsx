import { useState, useEffect } from 'react'
import axios from 'axios'
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
} from '@coreui/react'

const UserListWithAdd = () => {
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    cpf: '',
    phone_number: '',
    email: '',
    role: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users/')
        setUsers(response.data)
      } catch (error) {
        setError('Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }
    fetchUsers()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/users', formData)
      setUsers([...users, response.data])
      setSuccessMessage('User added successfully')
      setShowModal(false)
      setFormData({
        name: '',
        cpf: '',
        phone_number: '',
        email: '',
        role: '',
      })
    } catch (error) {
      setError('Failed to add user')
    }
  }

  const handleModalClose = () => {
    setShowModal(false)
    setFormData({
      name: '',
      cpf: '',
      phone_number: '',
      email: '',
      role: '',
    })
  }

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      
      <CButton color="primary" onClick={() => setShowModal(true)}>
        Add User
      </CButton>
      
      <CTable className="mt-4">
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Name</CTableHeaderCell>
            <CTableHeaderCell>CPF</CTableHeaderCell>
            <CTableHeaderCell>Phone Number</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Role</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <CTableRow key={user.id}>
                <CTableDataCell>{user.id}</CTableDataCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.cpf}</CTableDataCell>
                <CTableDataCell>{user.phone_number}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.role}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan="6" className="text-center">
                No users found
              </CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>

      <CModal visible={showModal} onClose={handleModalClose}>
        <CModalHeader>
          <CModalTitle>Add New User</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              className="mb-4"
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-4"
              type="text"
              placeholder="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-4"
              type="text"
              placeholder="Phone Number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-4"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <CFormInput
              className="mb-4"
              type="text"
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              required
            />
            <CButton type="submit" color="primary" className="mt-2">
              Add User
            </CButton>
          </CForm>
        </CModalBody>
      </CModal>
    </>
  )
}

export default UserListWithAdd
