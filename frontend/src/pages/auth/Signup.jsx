import React, { useEffect, useState } from "react";
import "../../styles/SignupPage.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { signup, validateInvite } from "../../features/auth/api";
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
  const [inviteData, setInviteData] = useState(null);
  const [user, setUser] = useState(initialState);
  const [error, setError] = useState(null);
  const [loadingInvite, setLoadingInvite] = useState(false);
  const [inviteError, setInviteError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const inviteToken = searchParams.get("invite");

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
      setSubmitting(true);

      await signup({
        ...userData,
        inviteToken,
      });

      setUser(initialState);
      navigate("/login");
    } catch (error) {
      setError(error.message || "Signup failed.");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (!inviteToken) return;

    const checkInvite = async () => {
      try {
        setLoadingInvite(true);
        setInviteError(null);

        const data = await validateInvite(inviteToken);
        setInviteData(data);

        setUser((prev) => ({
          ...prev,
          email: data.email,
        }));
      } catch (err) {
        setInviteError(err?.message || "This invite is invalid or expired.");
      } finally {
        setLoadingInvite(false);
      }
    };

    checkInvite();
  }, [inviteToken]);
  if (error) return <ErrorState message={error} />;

  return (
    <div className="signup-page">
      <div className="signup-grid">
        <div className="signup-main">
          <div className="signup-card">
            <div className="signup-header">
              <h1>{inviteData ? "Join Company" : "Create Account"}</h1>
              <p>
                {inviteData
                  ? "Complete your account to join the workspace."
                  : "Create your account to get started."}
              </p>
            </div>

            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="signup-field">
                <label>Full Name</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  placeholder="John Doe"
                  onChange={handleChange}
                />
              </div>

              <div className="signup-field">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  placeholder="you@example.com"
                  onChange={handleChange}
                  required
                  disabled={!!inviteData}
                />
              </div>

              <div className="signup-field-grid">
                <div className="signup-field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={user.password}
                    placeholder="Create password"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="signup-field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    placeholder="Confirm password"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                className="signup-button"
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Creating..."
                  : inviteData
                    ? "Join Company"
                    : "Create Account"}
              </button>
            </form>

            <div className="signup-footer">
              Already have an account?{" "}
              <span className="signup-link" onClick={() => navigate("/login")}>
                Login
              </span>
            </div>
          </div>
        </div>

        <div className="signup-side">
          <div className="signup-side-card">
            <div className="signup-side-header">
              <h3>{inviteToken ? "Invitation" : "Account Setup"}</h3>
              <span>{inviteToken ? "Live" : "Info"}</span>
            </div>

            <div className="signup-side-body">
              {loadingInvite && (
                <>
                  <div className="signup-side-icon">⏳</div>
                  <div className="signup-side-row stack">
                    <div className="side-label">Status</div>
                    <div className="side-main">Checking invite...</div>
                  </div>
                </>
              )}

              {!inviteToken && !loadingInvite && (
                <>
                  <div className="signup-side-icon">👤</div>

                  <div className="signup-side-row stack">
                    <div className="side-label">Create your account</div>
                    <div className="side-main">
                      Sign up to access your rental management workspace.
                    </div>
                  </div>

                  <div className="signup-side-divider" />

                  <div className="signup-side-row">
                    <div className="side-label">Email</div>
                    <div className="side-value">
                      {user.email || "you@example.com"}
                    </div>
                  </div>

                  <div className="signup-side-divider" />

                  <div className="signup-side-row">
                    <div className="side-label">Account Name</div>
                    <div className="side-value">{user.username || "-"}</div>
                  </div>
                </>
              )}

              {inviteError && !loadingInvite && (
                <>
                  <div className="signup-side-icon error">!</div>

                  <div className="signup-side-row stack">
                    <div className="side-label">Invite status</div>
                    <div className="side-main error-text">{inviteError}</div>
                  </div>
                </>
              )}

              {inviteData && !loadingInvite && !inviteError && (
                <>
                  <div className="signup-side-icon">🏢</div>

                  <div className="signup-side-row stack">
                    <div className="side-label">You were invited to join</div>
                    <div className="side-main">{inviteData.company}</div>
                  </div>

                  <div className="signup-side-divider" />

                  <div className="signup-side-row">
                    <div className="side-label">Role</div>
                    <div className="side-value">
                      {inviteData.role || "user"}
                    </div>
                  </div>

                  <div className="signup-side-divider" />

                  <div className="signup-side-row">
                    <div className="side-label">Email</div>
                    <div className="side-value">{inviteData.email}</div>
                  </div>

                  <div className="signup-side-divider" />

                  <div className="signup-side-note">
                    This account will join the company after email verification.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
