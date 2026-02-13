const API_URL =
  import.meta.env.REACT_APP_API_URL || "http://localhost:2000/api";

export const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || `Request failed (${res.status})`);
  }

  return result;
};
