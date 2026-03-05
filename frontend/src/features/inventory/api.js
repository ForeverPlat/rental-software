import { request } from "../../lib/http";

export const getInventory = async () => {
  const result = await request("/inventory/user");
  return result.data;
};

export const createInventory = async (data) => {
  const result = await request("/inventory", {
    method: "POST",
    body: JSON.stringify(data),
  });
  return result.data;
};

export const updateInventory = async (id, updates) => {
  const result = await request(`/inventory/user/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
  return result.data;
};

export const deleteInventory = async (id) => {
  const result = await request(`/inventory/user/${id}`, {
    method: "DELETE",
  });
  return result.data;
};

export const getInventoryById = async (id) => {
  const result = await request(`/inventory/user/${id}`);
  return result.data;
};

export const getInventoryAvailability = async (id) => {
  const result = await request(`/inventory/user/${id}`);
  return result.data.available;
};

export const searchInventory = async (query) => {
  const result = await request(
    `/products/user/by-name?search=${encodeURIComponent(query)}`,
  );
  return result.data;
};

export const getLowStockInventory = async (threshold = 10) => {
  const result = await request(
    `/inventory/user/low-stock?threshold=${threshold}`,
  );
  return result.data;
};
