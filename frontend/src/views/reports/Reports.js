import React from 'react';
import { CCard, CCardBody, CCol, CCardHeader, CRow } from '@coreui/react';
import { CChartBar, CChartPie } from '@coreui/react-chartjs';

const Reports = () => {
  return (
    <CRow>
      <CCol xs={12} md={6} className="mb-4">
      </CCol>
      <CCol xs={12} md={6} className="mb-4">
        <CCard className="h-100">
          <CCardHeader>Pie Chart</CCardHeader>
          <CCardBody>
            <CChartPie
              data={{
                labels: ['Red', 'Green', 'Yellow'],
                datasets: [
                  {
                    data: [300, 50, 100],
                    backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                    hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                  },
                ],
              }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Reports;
