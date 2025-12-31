import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from './components/Sidebar/Sidebar'
import Header from './components/Header/Header'

const Layout = () => {

  const location = useLocation();

  const getPageFromPath = () => {
    const path = location.pathname.toLowerCase();

    if (path === '/' || path === '/dashboard') return 'dashboard';
    // if (path === '/calendar') return 'calender';
    if (path === '/bookings') return 'bookings';
    if (path === '/customers') return 'customers';
    if (path === '/inventory') return 'inventory';

    if (path === '/bookings/new') return 'new booking';
    if (path === '/customers/new') return 'new customer';
    if (path === '/products/new') return 'new product';

    return 'dashboard';

  }

  const page = getPageFromPath();

  return (
    <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ flexGrow: 1, 'backgroundColor': '#edf1f5' }}>
            <Header page={page} />
            <Outlet />
        </main>
        
    </div>
  )
}

export default Layout