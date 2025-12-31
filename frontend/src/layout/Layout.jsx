import React from 'react'
import styles from './Layout.module.css';
import { Outlet, useLocation } from 'react-router-dom'

import Sidebar from '../components/Sidebar/Sidebar'
import Header from '../components/Header/Header'

const Layout = () => {

  const location = useLocation();

  const getPageFromPath = () => {
    const path = location.pathname.toLowerCase();

    if (path === '/' || path === '/home') return 'home';
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
    <div className={styles.appLayout}>
      <Header page={page} />
      <div className={styles.appBody}>
        <Sidebar page={page} />

        <main className={styles.appMain}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout