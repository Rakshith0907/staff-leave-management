import React, { useEffect, useState } from "react";
import api from "../../api/axios";
import "../../styles/DepartmentsTab.css"

const DepartmentsTab = () => {
  const [dept, setDept] = useState([]);

  const getDepartments = async () => {
    try {
      const response = await api.get("departments/");
      setDept(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error('Session expired, please login again')
      } else if (!err.response) {
          toast.error('Network error, please check your connection')
      } else {
          toast.error('Failed to load Departments, please refresh the page')
      }
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const [deptName, setDeptName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    setLoading(true)
    try{
      const send = await api.post("departments/", { name: deptName });
      getDepartments()
      setDeptName("")
      setShowModal(false)
    }
    catch(err){
      if (err.response?.status === 400) {
        toast.error('Department name already exists or is invalid')
      } else if (err.response?.status === 403) {
        toast.error('You do not have permission to create departments')
      } else if (err.response?.status === 401) {
        toast.error('Session expired, please login again')
      } else if (!err.response) {
        toast.error('Network error, please check your connection')
      } else {
        toast.error('Something went wrong, please try again')
      }
    }
    finally{
      setLoading(false)
    }
  };

  const handleDelete = async (id) => {
    try{
      const del = await api.delete(`departments/${id}/`)
      getDepartments()
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div className="dept-main">
      <div className="dept-container">
        <div className="dept-top">
          <p>Add new department</p>
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
          >
            Add
          </button>
        </div>

        <div className="dept-cards">
          {dept.map((e) => {
            return (
              <div key={e.id} className="dept-card">
                <h3>{e.name}</h3>
                <button onClick={()=> handleDelete(e.id)} className="btn btn-danger">Delete</button>
              </div>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box" >
            <h3>Add Department</h3>
            <input
              type="text"
              placeholder="Department name"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
            />
            <button onClick={handleAdd}>Submit</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default DepartmentsTab;
