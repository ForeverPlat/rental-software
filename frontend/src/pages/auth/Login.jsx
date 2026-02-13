import React, { useState } from "react";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";
import ErrorState from "../../components/ErrorState";
import { login } from "../../features/auth/api";

const initialState = {
  username: "",
  password: "",
};

const validateLogin = (credentials) => {
  if (!credentials.username || !credentials.password) {
    return "All fields are required";
  }

  return null;
};

const Login = () => {
  const [credentials, setCredentials] = useState(initialState);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const errorMessage = validateLogin(credentials);

    if (errorMessage) {
      setError(errorMessage);
      return;
    }

    try {
      await login(credentials);

      setCredentials(initialState);

      navigate("/home");
    } catch (error) {
      setError(error);
    }
  };

  if (error) return <ErrorState message={error} />;

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label className="auth-label">Username</label>
            <input
              type="username"
              name="username"
              className="auth-input"
              placeholder="Enter Username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              name="password"
              className="auth-input"
              placeholder="Enter password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="auth-button" type="submit">
            Sign In
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/signup")}>
            Sign up
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
