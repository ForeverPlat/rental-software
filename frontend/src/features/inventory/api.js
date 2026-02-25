import { request } from "../../lib/http";

// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
const apiUrl = "http://localhost:2000";

export const getInventory = async () => {
  const result = await request("/inventory/user");
  return result.data;
};

export const updateInventory = async (id, updatedInventory) => {
  const result = await request(`/inventory/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedInventory),
  });
  return result.data;
};
