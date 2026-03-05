import { request } from "../../lib/http";

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

export const createCustomer = async (data) => {
  const result = await request("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return result.data;
};

export const searchCustomers = async (query) => {
  const result = await request(
    `/customers/user/by-name?search=${encodeURIComponent(query)}`,
  );
  return result.data;
};
