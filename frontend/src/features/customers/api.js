import { request } from "../../lib/http";

// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
const apiUrl = "http://localhost:2000";

export const getCustomers = async () => {
  const result = await request(`/customers/user`);
  return result.data;
};

export const updateCustomer = async (id, updatedCustomer) => {
  const result = await request(`/customers/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(updatedCustomer),
  });
  return result.data;
};
