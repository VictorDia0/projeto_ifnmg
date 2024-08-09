import React, { useState, useEffect } from 'react'
import axios from 'axios'

import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCardText,
  CCol,
  CRow,
  CWidgetStatsF,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilChartPie, cilGroup } from '@coreui/icons'
import { CChartBar } from '@coreui/react-chartjs'

const Dashboard = () => {
  const [totalStudents, setTotalStudents] = useState(0);
  const [mealsToday, setMealsToday] = useState(0);
  const [mealsTomorrow, setMealsTomorrow] = useState(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          params: {
            role: 'ALN'
          }
        });
        setTotalStudents(response.data.length);
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
    };
    fetchStudents();
  }, []);

  return (
    <>
      <CRow>
        <CCol xs={12} md={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CCardTitle>Bem-vindo</CCardTitle>
              <CCardText>Confira a lista de refeições confirmadas para amanhã.</CCardText>
              <CButton color="primary" href="#">
                Avançar
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={8}>
          <CCard className="mb-4">
            <CCardHeader>Quantidade de refeições por mês</CCardHeader>
            <CCardBody>
              <div
                style={{
                  width: '100%',
                  maxWidth: '1000px',
                  height: '370px',
                  margin: '0 auto',
                }}
              >
                <CChartBar
                  style={{
                    width: '100%',
                    maxWidth: '1000px',
                    height: '380px',
                    margin: '0 auto',
                  }}
                  data={{
                    labels: [
                      'Janeiro',
                      'Fevereiro',
                      'Março',
                      'Abril',
                      'Maio',
                      'Junho',
                      'Julho',
                      'Agosto',
                      'Setembro',
                      'Outubro',
                      'Novembro',
                      'Dezembro',
                    ],
                    datasets: [
                      {
                        label: 'Refeições por Mês',
                        backgroundColor: '#f87979',
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                      },
                    ],
                  }}
                  labels="months"
                />
              </div>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol xs={12} md={4}>
          <CRow>
            <CCol>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilGroup} height={24} />}
                title="Total de Alunos"
                value={totalStudents}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CWidgetStatsF
                className="mb-3"
                color="primary"
                icon={<CIcon icon={cilChartPie} height={24} />}
                title="Refeições de Hoje"
                value={mealsToday}
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol>
              <CWidgetStatsF
                className="mb-3"
                color="warning"
                icon={<CIcon icon={cilChartPie} height={24} />}
                title="Refeições de Amanhã"
                value={mealsTomorrow}
              />
            </CCol>
          </CRow>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
