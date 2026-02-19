import React, { useState } from "react";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import { signup } from "../../features/auth/api";
import ErrorState from "../../components/ErrorState";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const validateSignup = (user) => {
  if (!user.username || !user.email || !user.password) {
    return "All fields are required";
  }

  if (user.password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (user.password !== user.confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

const Signup = () => {
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errorMessage = validateSignup(user);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    const { confirmPassword, ...userData } = user;

    try {
      await signup(userData);

      setUser(initialState);

      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <ErrorState message={error} />;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Create Account</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Full Name</label>
            <input
              type="text"
              className="auth-input"
              name="username"
              value={user.username}
              placeholder="John Doe"
              onChange={handleChange}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Email</label>
            <input
              type="email"
              className="auth-input"
              name="email"
              value={user.email}
              placeholder="you@example.com"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              name="password"
              value={user.password}
              placeholder="Create password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Confirm Password</label>
            <input
              type="password"
              className="auth-input"
              placeholder="Confirm password"
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-button" type="submit">
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Login
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;
