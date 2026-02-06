import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.css'
import logo from '../../../public/temp-logo.png'

const Header = ({ page }) => {
  const navigate = useNavigate();

  const getButton = () => {
    switch (page) {
      case 'customers':
        return { text: 'Add customer', path: '/customers/new' };
      case 'bookings':
        return { text: 'New booking', path: '/bookings/new' };
      case 'inventory':
        return { text: 'Add product', path: 'products/new' };
      default:
        return 'none';
    }
  };

  return (
    <header className={styles.header}>
    {/* <header style={{ display: 'flex', alignSelf: 'center', justifyContent: 'space-between', maxHeight: '85px', minHeight: '85px', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}> */}
      {/* <h2 style={{ marginBottom: '0px' }} >{page.charAt(0).toUpperCase() + page.slice(1)}</h2> */}
      
      <div className={styles.logo}>
        <img src={logo} /> Renta.
      </div>

      <div className={styles.userContainer}>
        <div className={styles.circle}></div>
        <div className={styles.user}>
          <span className={styles.username}>John Doe</span>
          <span className={styles.role}>Owner</span>
        </div>
      </div>

      {/* {
        // this ensures that if the path isn't on the list no button shows up
        getButton() !== 'none' ? (
          <button
            style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '8px 25px', borderRadius: '4px', cursor: 'pointer' }}
            onClick={() => navigate(getButton().path)}
          >
            {getButton().text}
          </button>
        ) : null
      } */}
      
    </header>
  );
};

export default Header;