import React, { useEffect, useState } from "react";
import { getMe, updateMe } from "../../features/users/api";
import { useAuth } from "../../features/auth/AuthContext";
import "../../styles/ProfileSettingsPage.css";

const ProfileSettingsPage = () => {
  const { setUser } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    companyId: "",
    createdAt: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      const user = await getMe();

      setForm({
        username: user.username || "",
        email: user.email || "",
        role: user.role || "",
        companyId: user.companyId || "",
        createdAt: user.createdAt || "",
      });
    };

    loadUser();
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("");

    try {
      const updated = await updateMe({
        username: form.username,
        email: form.email,
      });

      setUser(updated);
      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  const avatarLetter = form.username?.charAt(0)?.toUpperCase();

  return (
    <div className="profile-page">
      {/* Profile header */}
      <div className="profile-header">
        <div className="profile-avatar">{avatarLetter}</div>

        <div className="profile-header-info">
          <h2>{form.username}</h2>
          <span className="profile-meta">{form.email}</span>
        </div>
      </div>

      {message && <div className="profile-message">{message}</div>}

      <div className="profile-card">
        <div className="profile-card-header">
          <h3>Account Information</h3>

          {!editing ? (
            <button
              className="profile-edit-button"
              onClick={() => setEditing(true)}
            >
              Edit Profile
            </button>
          ) : (
            <div className="profile-edit-actions">
              <button
                className="profile-cancel-button"
                onClick={() => setEditing(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save-button"
                onClick={handleSave}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>

        <div className="profile-grid">
          <div className="profile-row">
            <span>Username</span>

            {!editing ? (
              <strong>{form.username}</strong>
            ) : (
              <input
                value={form.username}
                onChange={(e) => handleChange("username", e.target.value)}
              />
            )}
          </div>

          <div className="profile-row">
            <span>Email</span>

            {!editing ? (
              <strong>{form.email}</strong>
            ) : (
              <input
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            )}
          </div>

          <div className="profile-row">
            <span>Role</span>
            <strong>{form.role}</strong>
          </div>

          <div className="profile-row">
            <span>Company</span>
            <strong>{form.companyId || "—"}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
