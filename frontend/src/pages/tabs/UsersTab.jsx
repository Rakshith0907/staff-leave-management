import React, { use, useEffect, useState } from "react";
import api from "../../api/axios";
import { FaUserCircle } from "react-icons/fa";

const UsersTab = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const responseData = await api.get("auth/users/");
    setUsers(responseData.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const groupByDepartment = (users) => {
    return users.reduce((groups, user) => {
      const dept = user.department?.name || "No Department";
      if (!groups[dept]) groups[dept] = [];
      groups[dept].push(user);
      return groups;
    }, {});
  };

  users.sort((a, b) => (a.role === "manager" ? -1 : 1));

  const groups = groupByDepartment(users);

  return (
    <div className="users-main">
      <div className="users-container">
        {Object.entries(groups).map(([deptName, users]) => {
          
          return (
            <div key={deptName} className="user-group">
              <h3>{deptName}</h3>
              {users.map((user) => {
                console.log(user)
                return (
                  <div key={user.id} className="user-card">
                    <FaUserCircle />
                    <h4>{user.username}</h4>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersTab;
