// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
const apiUrl = "http://localhost:2000";

export const signup = async (user) => {
  try {
    const res = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Signup failed: ${res.status}`);
    }

    return result;
  } catch (error) {
    console.error(`Signup Failed: ${error}`);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${apiUrl}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const result = await res.json();

    if (!res.ok) {
      throw new Error(result.message || `Login failed: ${res.status}`);
    }

    localStorage.setItem("token", result.data.token);
    return result;
  } catch (error) {
    console.error(`Login Failed: ${error}`);
    throw error;
  }
};
