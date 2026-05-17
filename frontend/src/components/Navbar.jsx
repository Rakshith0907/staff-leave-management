import React from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate()


  const handleLogout = () =>{
    logout()
    navigate('/login')
  }

  return (
    <div className="nav-main">
      <div className="nac-container">
        <Link to="/">Dashboard</Link>
        {user.role === "employee" && (
          <>
            <Link to="apply">ApplyLeave</Link>
            <Link to="my-leaves">My Leaves</Link>
          </>
        )}
        {user.role === 'manager' && (
          <>
            <Link to='manage-leaves' >Manage Leaves</Link>
          </>
        )}
        {user.role === 'admin' && (
          <>
            <Link to='admin' >Admin Panel</Link>
            <Link to='manage-leaves'>Manage Leaves</Link>
            <Link to='register'>Register New User</Link>
          </>
        )}
        <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
