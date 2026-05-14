import React from 'react'
import { AuthProvider } from './context/AuthContext'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from './pages/Login'
import PrivateRoute from './components/PrivateRoute'
import Dashboard from './pages/Dashboard'
import ApplyLeave from './pages/ApplyLeave'
import MyLeaves from './pages/MyLeaves'
import ManageLeaves from './pages/ManageLeaves'
import AdminPanel from './pages/AdminPanel'
import Navbar from './components/Navbar'

const App = () => {

  const PrivateLayout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
  }

  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} /> 
        <Route path='/' element={<PrivateRoute />}>
          <Route element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='apply' element={<ApplyLeave />} />
            <Route path='my-leaves' element={<MyLeaves />} />
            <Route path='manage-leaves' element={<ManageLeaves />} />
            <Route path='admin' element={<AdminPanel />} />
          </Route>
        </Route>
        <Route path='*' element={<Navigate to='/login' /> }  />
      </Routes>
    </AuthProvider>
  )
}

export default App
