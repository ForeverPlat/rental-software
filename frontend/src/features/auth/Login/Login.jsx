import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      setError('All fields must be filled.');
      return;
    }

    try {
      const res = await fetch('http://localhost:2000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (res.ok) {
        // successful login
        setSuccess('Login successful.');
        setError('');
      } else {
        // failed login
        setError(result.error || 'Invalid credentials.');
        setSuccess('');
      }
    } catch {
      // network error or unexpected issue
      setError('An error occurred. Please try again later.');
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" id="login-form" onSubmit={handleLogin}>
        <h2>Log In</h2>
        <div className="login-auth-msg" style={{ color: error ? 'red' : 'green' }}>
          {error || success}
        </div> <br />
        <input className="login-input" type="email" name="email" placeholder="Email" value={credentials.email} onChange={handleChange} required /> <br />
        <input className="login-input" type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChange} required /> <br />
        <button className="login-button" id="login-button" type="submit">Log In</button>
      </form>
      <p className="login-footer">
        Don’t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
