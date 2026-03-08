import React, { useState } from "react";
import { updatePassword } from "../../features/users/api";
import "../../styles/SecuritySettingsPage.css";

const SecuritySettingsPage = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await updatePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });

      setMessage("Password updated successfully.");

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="security-page">
      <div className="security-header">
        <h2 className="security-title">Security</h2>
        <p className="security-subtitle">Update your account password</p>
      </div>

      {message && <div className="security-message">{message}</div>}

      <div className="security-card">
        <h3 className="security-card-title">Change Password</h3>

        <div className="security-grid">
          <div className="security-field">
            <label>Current Password</label>
            <input
              type="password"
              value={form.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value)}
            />
          </div>

          <div className="security-field">
            <label>New Password</label>
            <input
              type="password"
              value={form.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </div>

          <div className="security-field">
            <label>Confirm New Password</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
          </div>
        </div>

        <button
          className="security-save-button"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </div>
    </div>
  );
};

export default SecuritySettingsPage;
