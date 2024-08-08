import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const StudentDetails = ({ student }) => {
  if (!student) {
    return <div>Select a student to see details</div>
  }

  return (
    <CCard>
      <CCardHeader>Student Details</CCardHeader>
      <CCardBody>
        <CRow>
          <CCol xs={12} md={6}>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>User:</strong> {student.user}</p>
            <p><strong>Role:</strong> {student.role}</p>
            <p><strong>CPF:</strong> {student.cpf}</p>
            <p><strong>Phone Number:</strong> {student.phone_number}</p>
            <p><strong>Email:</strong> {student.email}</p>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default StudentDetails
