import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () =>{
    logout()
    navigate('/login')
  }

  return (
    <div className="nav-main">
      <div className="nav-container">
        <Link to="/" className={location.pathname==='/' ? 'nav-active' : ''} >Dashboard</Link>
        {user.role === "employee" && (
          <>
            <Link className={location.pathname === '/apply' ? 'nav-active' : "nav-ele"} to="apply">ApplyLeave</Link>
            <Link className={location.pathname === '/my-leaves' ? 'nav-active' : "nav-ele"} to="my-leaves">My Leaves</Link>
          </>
        )}
        {user.role === 'manager' && (
          <>
            <Link className={location.pathname === '/manage-leaves' ? 'nav-active' : "nav-ele"} to='manage-leaves' >Manage Leaves</Link>
          </>
        )}
        {user.role === 'admin' && (
          <>
            <Link className={location.pathname === '/admin' ? 'nav-active' : "nav-ele"} to='admin' >Admin Panel</Link>
            <Link className={location.pathname === '/manage-leaves' ? 'nav-active' : "nav-ele"} to='manage-leaves'>Manage Leaves</Link>
            <Link className={location.pathname === '/register' ? 'nav-active' : "nav-ele"} to='register'>Register New User</Link>
          </>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
