import React, { useEffect, useState } from "react";
import api from "../api/axios";

const ManageLeaves = () => {
  const [leaves, setLeaves] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const getStatusColor = (status) => {
    if (status === "accepted") return "green";
    if (status === "rejected") return "red";
    return "orange";
  };

  const getLeaves = async () => {
    try {
      const response = await api.get("leaves/leaverequest");
      setLeaves(response.data);
      setLoading(false);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleAccept = async (id) => {
    try{
      const updateData = await api.patch(`leaves/leaverequest/${id}/` , {status: 'accepted'})
      getLeaves()
    }
    catch(err){
      console.log(err)
    }
  }

  const handleReject = async (id) => {
    try{
      const updateData = await api.patch(`leaves/leaverequest/${id}/`, {status : 'rejected'})
      getLeaves()
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(() => {
    getLeaves();
  }, []);

  if (loading) return <p>Loading......</p>;

  return (
    <div className="manageLeaves-main">
      <div className="manageLeaves-container">
        {leaves.length === 0 ? (
          <p>No leave requests found</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>LeaveType</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action </th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <td>{e.user_detail.username}</td>
                    <td>{e.leave_type_detail.name}</td>
                    <td>{e.start_date} </td>
                    <td>{e.end_date} </td>
                    <td>{e.reason} </td>
                    <td style={{ textTransform:'capitalize', color: getStatusColor(e.status) }}>
                      {e.status}{" "}
                    </td>
                    {e.status === "pending" && (
                      <td>
                        <button className="btn btn-success" onClick={()=>handleAccept(e.id)}>Accept</button>
                        <button className="btn btn-danger" onClick={()=>handleReject(e.id)}>Reject</button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageLeaves;
