
import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

const AdminMain = () => {
  return (
    <div className='flex min-h-screen bg-white'>
      <Sidebar/>
      <div className='flex-1 p-8'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminMain
