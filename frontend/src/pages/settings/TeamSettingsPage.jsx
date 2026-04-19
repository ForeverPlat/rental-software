import React, { useEffect, useState } from "react";
import { getCompanyMembers } from "../../features/companies/api";
import "../../styles/TeamSettingsPage.css";

const TeamSettingsPage = () => {
  const [company, setCompany] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const data = await getCompanyMembers();
        setCompany(data.company);
        setMembers(data.members || []);
      } catch (err) {
        setError(err?.message || "Could not load team.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="team-settings-page">
        <h1 className="settings-page-title">Team</h1>
        <p className="settings-page-description">Loading…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="team-settings-page">
        <h1 className="settings-page-title">Team</h1>
        <p className="settings-page-description">
          People in your company workspace.
        </p>
        <div className="team-settings-message error">{error}</div>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="team-settings-page">
        <h1 className="settings-page-title">Team</h1>
        <p className="settings-page-description">
          Create or join a company to see people on your team. You can set that
          up under Company.
        </p>
      </div>
    );
  }

  return (
    <div className="team-settings-page">
      <h1 className="settings-page-title">Team</h1>
      <p className="settings-page-description">
        People in <strong>{company.name}</strong>.
      </p>

      {members.length === 0 ? (
        <p className="team-settings-empty">No members found.</p>
      ) : (
        <div className="team-settings-card">
          <table className="team-settings-table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>{m.username}</td>
                  <td>{m.email}</td>
                  <td className="team-settings-role">{m.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TeamSettingsPage;
