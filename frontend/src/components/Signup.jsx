import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Signup = () => {

  const [user, setUser] = useState({ "username": '', "email": '', "password": '', "confirmPassword": '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  }

  const delayedMessage = (setter, message) => {
    setter('');
    useEffect(() => {
      setTimeout(() => {
        setter(message);
      }, 5000);
    });
  }

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { confirmPassword, ...userData } = user;
    const { username, email, password } = userData;
    
    if ( !username || !email || !password || !confirmPassword ) {
      setError("All fields must be filled.");
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const res = await fetch('http://localhost:2000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });

      const result = await res.json();

      if (res.ok) {
        // setSuccess('Verification email sent.');
        delayedMessage(setSuccess, 'Verification email sent.')
        setUser({ "username": '', "email": '', "password": '', "confirmPassword": '' });
      } else {
        delayedMessage(setError, result.error || 'Failed to create user.')
        // setError(result.error || 'Failed to create user.');
      }

    } catch (error) {
      delayedMessage(setError, 'An error occurred. Please try again later.');
      // setError('An error occurred. Please try again later.');
    }
  }


  return (
    <div>
        <form className="form" id="signup-form" onSubmit={handleSignUp}>
          <h2>Sign Up</h2>
          <div className="auth-msg" style={{ color: error ? 'red' : 'green' }}> 
            {error || success}
          </div> <br />
          <input type="text" name='username' placeholder="Username" value={user.username} onChange={handleChange} required /> <br />
          <input type="email" name='email' placeholder="Email" value={user.email} onChange={handleChange} required /> <br />
          <input type="password" name='password' placeholder="Password" value={user.password} onChange={handleChange} required /> <br />
          <input type="password" name='confirmPassword' placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} required /> <br />
          <button id="signup-button" type="submit">Sign Up</button>
        </form>
        <p>
          Have an account? <Link to='/login'>Login</Link>
        </p>
    </div>
  )
}

export default Signup