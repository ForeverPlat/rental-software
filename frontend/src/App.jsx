import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/signup'
import Login from './components/Login'
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Sidebar />} />
      </Routes>
    </Router>
  )
}

export default App
