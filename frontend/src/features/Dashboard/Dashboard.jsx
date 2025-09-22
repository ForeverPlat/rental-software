import React from 'react';
import './Dashboard.css';
import CardResult from './CardResult';

const Dashboard = () => {
  return (
    // will prob have to make a component for this
    <div className="container">
      <div className="section">
        <h2 className='dashboard-card-header'>Going out</h2>
        <div className="results">
          <CardResult />
        </div>
        <div className="links">
          <div className="link">View late</div>
          <div className="link">View all</div>
        </div>
      </div>
      <div className="section">
        <h2 className='dashboard-card-header'>Coming back</h2>
        <div className="results">No results</div>
        <div className="links">
          <div className="link">View late</div>
          <div className="link">View all</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;