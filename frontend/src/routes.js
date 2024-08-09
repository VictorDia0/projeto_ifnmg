import React from 'react'


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/students/Students'))
const Meals = React.lazy(() => import('./views/meals/Meals'))
const Profile = React.lazy(() => import('./views/profile/Profile'))
const Reports = React.lazy(() => import('./views/reports/Reports'))
const Scheduling = React.lazy(() => import('./views/Scheduling/Scheduling'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Inicio', element: Dashboard },
  { path: '/reports', name: 'Relatórios', element: Reports },
  { path: '/profile', name: 'Perfil', element: Profile },
  { path: '/users', name: 'Usuários', element: Users },
  { path: '/meals', name: 'Refeições', element: Meals },
  { path: '/scheduling', name: 'Agendamento', element: Scheduling },


]

export default routes
