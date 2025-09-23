import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  
  const [user, setUser] = useState({ "username": '', "password": '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setUser((prevUser) => ({
        ...prevUser,
        [name]: value
    }))
  }

  const delayedMessage = (setter, message) => {
    setter(''); 
    setTimeout(() => {
      setter(message);
      setTimeout(() => {
        setter(''); // Clear message after 5 seconds
      }, 5000);
    }, 100); // Small delay to ensure previous message clears
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const res = await fetch('http://localhost:2000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        const result = await res.json();

        console.log(result);
        console.log(user);

        setUser({ "username": '', "password": '' })


        if(!res.ok) {
            delayedMessage(setError, 'Login failed.');
            return;
        }

        localStorage.setItem('token', result.data.token);

    } catch (error) {
        delayedMessage(setError, 'An error occurred. Please try again later.');
    }

  }

  return (
    <div>
        <form className='form' id='login-form' onSubmit={handleLogin}>
            <h2>Login</h2>
            <div className="auth-msg" style={{ color: 'red' }}> 
                { error }
            </div> <br />
            <input type="text" name='username' placeholder="Username" value={user.username} onChange={handleChange} required /> <br />
            <input type="password" name='password' placeholder="Password" value={user.password} onChange={handleChange} required /> <br />
            <button id='login-button' type='submit'>Login</button>
        </form>
        <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
    </div>
  )
}

export default Login