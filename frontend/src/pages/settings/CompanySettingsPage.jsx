import React, { useEffect, useState } from "react";
import "../../styles/CompanySettingsPage.css";
import { getMe } from "../../features/users/api";
import { createCompany } from "../../features/companies/api";
import { useAuth } from "../../features/auth/AuthContext";

const CompanySettingsPage = () => {
  const { setUser } = useAuth();
  const [companyName, setCompanyName] = useState("");
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      const user = await getMe();
      setMe(user);
      setError("");
    } catch (err) {
      setError(err?.message || "Could not load account.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const hasCompany = !!(me?.company && (me.company.name || me.company._id));

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const name = companyName.trim();
    if (!name) {
      setError("Enter a company name.");
      return;
    }

    try {
      setSubmitting(true);
      const { user } = await createCompany({ name });
      setMe(user);
      setUser(user);
      setCompanyName("");
      setMessage("Workspace created. You can invite team members from Team when that is wired up.");
    } catch (err) {
      setError(err?.message || "Could not create company.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="company-settings-page">
        <h1 className="settings-page-title">Company</h1>
        <p className="settings-page-description">Loading…</p>
      </div>
    );
  }

  return (
    <div className="company-settings-page">
      <h1 className="settings-page-title">Company</h1>
      <p className="settings-page-description">
        {hasCompany
          ? "Your workspace on The Rental Software."
          : "Create a company to use invites and shared data with your team."}
      </p>

      {message && <div className="company-settings-message success">{message}</div>}
      {error && <div className="company-settings-message error">{error}</div>}

      {hasCompany ? (
        <div className="company-settings-card">
          <div className="company-settings-row">
            <span className="company-settings-label">Name</span>
            <strong className="company-settings-value">
              {typeof me.company === "object" && me.company?.name
                ? me.company.name
                : "—"}
            </strong>
          </div>
          <div className="company-settings-row">
            <span className="company-settings-label">Your role</span>
            <strong className="company-settings-value">{me.role || "—"}</strong>
          </div>
        </div>
      ) : (
        <form className="company-settings-card" onSubmit={handleCreate}>
          <label className="company-settings-field">
            <span className="company-settings-label">Company name</span>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Rentals"
              autoComplete="organization"
            />
          </label>
          <button
            type="submit"
            className="company-settings-submit"
            disabled={submitting}
          >
            {submitting ? "Creating…" : "Create company"}
          </button>
        </form>
      )}
    </div>
  );
};

export default CompanySettingsPage;
