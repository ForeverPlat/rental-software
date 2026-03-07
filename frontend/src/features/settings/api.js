import request from "../../lib/http";

export const updateUser = async (data) => {
  const result = await request("/users/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  return result.data;
};
