import React, { useEffect, useState } from 'react'
import { useAuth } from "../context/AuthContext";
import api from '../api/axios'


const ApplyLeave = () => {
  const [loading, setLoading] = useState(true)
  const [sd, setSd] = useState("")
  const [ed,setEd] = useState("")
  const [lt,setLt] = useState("")
  const [reason,setReason] = useState("")


  const[leaveTypes,setLeaveTypes] = useState({})

  const getLeaveType = async () => {
    try{
      const response = await api.get("leaves/leavetype/")
      setLeaveTypes(response.data)
    }
    catch(err){
      console.log(err)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    getLeaveType()
  },[])


  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
      const sendLeave = await api.post("leaves/leaverequest/", {
        start_date : sd,
        end_date : ed,
        leave_type : lt,
        reason : reason,
      })
      alert("Leave applied succesfully")
    }
    catch(err){
      // console.log(err.response.data)
      alert((err.response.data?.non_field_errors))
    }
  }
  
  if (loading) return (
    <p>Loading......</p>
  )


  return (
    <div className='apply-main'>
      <div className="apply-container">
        <form method='POST' onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Start Date</label>
            <input
              type="date"
              className="form-control"
              value={sd}
              onChange={(e)=> setSd(e.target.value)}
            />
          </div>
          <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={ed}
                onChange={(e)=> setEd(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Leave type</label>
              <select className='form-select' value={lt} onChange={(e)=>setLt(e.target.value)}>
                <option value="">----leave type----</option>
                {leaveTypes.map((e,i)=>{
                  return (
                    <option key={e.id} value={e.id} >{e.name}</option>
                  )
                })}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Reason</label>
              <textarea
                className="form-control"
                value={reason}
                onChange={(e)=> setReason(e.target.value)}
              />
            </div>
            <button className='btn btn-primary'>Submit</button>
        </form>
      </div>
      
    </div>
  )
}

export default ApplyLeave
 