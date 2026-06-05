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
      console.log(err);
    }
  };

  useEffect(() => {
    getDepartments();
  }, []);

  const [deptName, setDeptName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAdd = async () => {
    try{
      const send = await api.post("departments/", { name: deptName });
      getDepartments()
      setDeptName("")
      setShowModal(false)
    }
    catch(err){
      console.log(err)
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
