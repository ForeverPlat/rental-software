import { request } from "../../lib/http";

export const getMe = async () => {
  const result = await request("/users/me");
  return result.data;
};

export const updateMe = async (data) => {
  const result = await request("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return result.data;
};

export const updatePassword = async (data) => {
  const result = await request("/users/password", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return result.data;
};
