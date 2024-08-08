import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormInput,
  CFormLabel,
  CRow,
  CCol,
} from '@coreui/react'

const Profile = () => {
  const [user, setUser] = useState({
    name: '',
    user: '',
    password: '',
    role: '',
    cpf: '',
    phone_number: '',
    email: '',
  })
  const [originalUserData, setOriginalUserData] = useState(null)
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'))
    if (userData) {
      setUser(userData)
      setOriginalUserData(userData) // Save original data to compare changes
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({ ...prevUser, [name]: value }))
  }

  const handleSave = async () => {
    try {
      // Send updated data to the API
      await axios.put('http://127.0.0.1:8000/api/user/profile', user)
      
      // Save user data to localStorage
      localStorage.setItem('user', JSON.stringify(user))

      // Update state to reflect the saved data
      setOriginalUserData(user)
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to save user data', error)
    }
  }

  return (
    <CCard className="profile-card">
      <CCardHeader>{isEditing ? 'Edit Profile' : 'Profile'}</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol xs={12} md={6}>
            <CFormLabel>Nome</CFormLabel>
            <CFormInput
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
          <CCol xs={12} md={6}>
            <CFormLabel>Usuário</CFormLabel>
            <CFormInput
              type="text"
              name="user"
              value={user.user}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol xs={12} md={6}>
            <CFormLabel>Classe</CFormLabel>
            <CFormInput
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>

          <CCol xs={12} md={6}>
            <CFormLabel>CPF</CFormLabel>
            <CFormInput
              type="text"
              name="cpf"
              value={user.cpf}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol xs={12} md={6}>
            <CFormLabel>Celular</CFormLabel>
            <CFormInput
              type="text"
              name="phone_number"
              value={user.phone_number}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
          <CCol xs={12} md={6}>
            <CFormLabel>Email</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol xs={12} md={6}>
            <CFormLabel>Senha</CFormLabel>
            <CFormInput
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </CCol>
        </CRow>

        <div className="mt-4">
          {isEditing ? (
            <>
              <CButton color="primary" onClick={handleSave}>
                Save
              </CButton>
              <CButton color="secondary" onClick={() => setIsEditing(false)} className="ms-2">
                Cancel
              </CButton>
            </>
          ) : (
            <CButton color="primary" onClick={() => setIsEditing(true)}>
              Edit
            </CButton>
          )}
        </div>
      </CCardBody>
    </CCard>
  )
}

export default Profile
