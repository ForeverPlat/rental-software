import React from 'react';

const Header = ({ page }) => {
  const getButtonText = () => {
    switch (page) {
      case 'customers':
        return 'Add customer';
      case 'bookings':
        return 'New booking';
      case 'inventory':
        return 'Add product';
      default:
        return 'Add item';
    }
  };

  return (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '5px 20px', borderBottom: '1px solid #ddd', backgroundColor: '#f8f9fa' }}>
      <h2>{page.charAt(0).toUpperCase() + page.slice(1)}</h2>
      <button
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
        onClick={() => alert(`Add ${getButtonText().toLowerCase().replace(' ', '_')} clicked`)}
      >
        {getButtonText()}
      </button>
    </header>
  );
};

export default Header;