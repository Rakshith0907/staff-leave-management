import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate, Outlet, redirect } from 'react-router-dom'

const PrivateRoute = () => {
  const {user} = useAuth()
  
  return user ? <Outlet /> : <Navigate to={'/login'} />

}

export default PrivateRoute
 