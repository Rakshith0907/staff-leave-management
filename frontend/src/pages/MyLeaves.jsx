import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import "../styles/MyLeaves.css"

const MyLeaves = () => {
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const getStatusColor = (status) => {
    if (status === "accepted") return "green";
    if (status === "rejected") return "red";
    return "orange";
  };

  const getLeaves = async () => {
    try {
      const response = await api.get("/leaves/leaverequest/");
      setLeaves(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeaves();
  }, []);

  if (loading) return <p>Loading......</p>;
  return (
    <div className="leaves-main">
      <div className="leaves-container">
        <h2>My Leave Applications</h2>
        {leaves.length === 0 ? (
          <p>No leave applications found</p>
        ) : (
          <table className="table">
            <colgroup>
              <col style={{width: '15%'}} /> {/* Leave Type */}
              <col style={{width: '20%'}} /> {/* Reason */}
              <col style={{width: '12%'}} /> {/* Start Date */}
              <col style={{width: '12%'}} /> {/* End Date */}
              <col style={{width: '10%'}} /> {/* Status */}
              <col style={{width: '11%'}} /> {/* Reviewed By */}
              <col style={{width: '20%'}} /> {/* Comments */}
            </colgroup>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>Reason</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
                <th>Reviewed By</th>
                <th>Comments</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <td>{e.leave_type_detail.name}</td>
                    <td>{e.reason}</td>
                    <td>{e.start_date}</td>
                    <td>{e.end_date}</td>
                    <td style={{ color: getStatusColor(e.status) }}>
                      {e.status}
                    </td>
                    <td>{e.reviewed_by_detail?.username}</td>
                    <td>{e.comment || ""}</td>
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

export default MyLeaves;
