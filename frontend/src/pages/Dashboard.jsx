import React from "react";
import { useAuth } from "../context/AuthContext";
import "../styles/Dashboard.css"

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-main">
      <div className="dashboard-container">
        <div className="dashboard-welcome">
          <h2>Welcome, {user.username}! 👋</h2>
          {user.role === "employee" && (
            <p>You can apply for leaves using the navigation above.</p>
          )}
          {user.role === "manager" && (
            <p>Please check for new leave requests and take an action.</p>
          )}
          {user.role === "admin" && (
            <p>Check and manage all leave applications.</p>
          )}
          <span className="dashboard-role">{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
