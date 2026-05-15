import React from 'react'
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div>
      <h2>Welcome! {user.username}</h2>
      {user.role==='employee' && (<p>You can apply for leaves</p>)}
      {user.role==='manager' && (<p>Please check for new leave requests and take an action(acccept or reject)</p>)}
      {user.role==='admin' && (<p>check all the leave applications.</p>)}
    </div>
  )
}

export default Dashboard
 