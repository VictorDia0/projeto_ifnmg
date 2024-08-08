import { useState } from 'react';
import ListTable from '../../components/ListTable';
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react';

const Users = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  return (
    <CRow>
      <CCol xs={12} md={12}>
        <ListTable onStudentSelect={handleStudentSelect} />
      </CCol>
    </CRow>
  );
};

export default Users;
