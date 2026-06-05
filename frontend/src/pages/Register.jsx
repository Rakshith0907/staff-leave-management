import React, { useEffect, useState } from "react";
import api from "../api/axios";
import "../styles/Register.css"

const Register = () => {
  const [un, setUn] = useState("");
  const [pw, setPw] = useState("");
  const [cp, setCp] = useState("");
  const [em, setEm] = useState("");
  const [role, setRole] = useState();
  const [dept, setDept] = useState();
  const [loading, setLoading] = useState(true);
  const [mess,setMess] = useState("");
  const [depts, setDepts] = useState([]);
  const [subLoading, setSubLoading] = useState(false)


  const getDepts = async () => {
    try {
      const response = await api.get("departments/");
      setDepts(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDepts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubLoading(true)
    if (pw !== cp){
        setMess("passwords do not match")
        return;
    }
    setMess('')
    try {
      const sendData = await api.post("auth/register/", {
        username: un,
        email: em,
        password: pw,
        role: role,
        department: dept,
      });
      alert("User created");
      setUn('')
      setPw('')
      setCp('')
      setEm('')
      setRole('')
      setDept('')
    } catch (err) {
      // console.log(err);
    }finally {
      setSubLoading(false)
    }
  };

  return (
    <div className="reg-main">
      <div className="reg-container">
        <h2>Register New User</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={un}
              onChange={(e) => setUn(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={em}
              onChange={(e) => setEm(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={cp}
              onChange={(e) => setCp(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Role</label>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                value="manager"
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" >
                Manager
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="radioDefault"
                value="employee"
                onChange={(e) => setRole(e.target.value)}
              />
              <label className="form-check-label" >
                Employee
              </label>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Department</label>
            <select
              className="form-select"
              value={dept}
              onChange={(e) => setDept(e.target.value)}
            >
              <option value="">----Departments----</option>
              {depts.map((e, i) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })}
            </select>
          </div>
          {mess && <p style={{color:'red'}}>{mess}</p> }
          <button className={subLoading ? 'btn btn-secondary' : "btn btn-primary"}>{subLoading ? 'Submitting...' : 'Submit'}</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
