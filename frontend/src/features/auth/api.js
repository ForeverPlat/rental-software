import { request } from "../../lib/http";

export const signup = async (user) => {
  const result = await request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(user),
  });

  return result.data;
};

export const login = async (credentials) => {
  const result = await request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
  return result.data;
};

export const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};
