import React, { useEffect, useState } from 'react'
import api from '../api/axios'

const ManageLeaves = () => {
  const [leaves,setLeaves] = useState([])
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(true)
  
  const getLeaves = async () => {
    try{
      const response = await api.get("leaves/leaverequest")
      setLeaves(response.data)
      setLoading(false)
    }
    catch(err){
      console.log(err.response.data)
    }
  }

  useEffect(()=>{
    getLeaves()
  },[])

  if (loading) return (
    <p>Loading......</p>
  )

  console.log(leaves)

  return (
    <div className='manageLeaves-main'>
      <div className="manageLeaves-container">
        <table className='table'>
          <thead>

          <tr>
            <th>

            </th>
          </tr>
          </thead>

        </table>
      </div>
      
    </div>
  )
}

export default ManageLeaves
 