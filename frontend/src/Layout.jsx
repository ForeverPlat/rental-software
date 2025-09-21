import React from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from './components/Sidebar/Sidebar'

const Layout = () => {
  return (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px', 'background-color': '#edf1f5' }}>
            <Outlet />
        </main>
        
    </div>
  )
}

export default Layout