import React, { useEffect, useState } from 'react'
import api from '../../api/axios'

const DepartmentsTab = () => {
  const [dept, setDept] = useState([])

  const getDepartments = async () => {
    try{
      const response = await api.get("departments/")
      setDept(response.data)
    }
    catch(err){
      console.log(err)
    }
  }

  useEffect(()=>{
    getDepartments()
  },[])

  console.log(dept)


  return (
    <div className='dept-main'>
      <div className="dept-container">
        {dept.map((e)=>{
          return(
            <h3>{e.name}</h3>
          )
        })}
      </div>
      
    </div>
  )
}

export default DepartmentsTab
