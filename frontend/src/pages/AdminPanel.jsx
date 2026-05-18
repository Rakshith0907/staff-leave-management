import React, { useState } from 'react'
import UsersTab from './tabs/UsersTab'
import DepartmentsTab from './tabs/DepartmentsTab'
import ManageLeaves from './ManageLeaves'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('users')


  return (
    <div className='admin-main'>
      <div className="admin-container">
        <div className="admin-btns">
          <button className={activeTab === 'users' ? 'btn btn-success' : 'btn btn-secondary'} onClick={()=>setActiveTab('users')} >Users</button>
          <button className={activeTab === 'departments' ? 'btn btn-success' : 'btn btn-secondary'} onClick={()=>setActiveTab('departments')} >Departments</button>
          <button className={activeTab === 'leaves' ? 'btn btn-success' : 'btn btn-secondary'} onClick={()=>setActiveTab('leaves')} >Leaves</button>
        </div>
        <div className="admin-body">
          {activeTab === 'users' && <UsersTab />}
          {activeTab === 'departments' && <DepartmentsTab />}
          {activeTab === 'leaves' && <ManageLeaves />}
        </div>
      </div>
      
    </div>
  )
}

export default AdminPanel
 