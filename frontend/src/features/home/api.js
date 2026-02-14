import { request } from "../../lib/http";

export const getHomeStats = async () => {
  const result = await request("/home/stats/user");
  return result.data;
};

export const getLowStockProducts = async () => {
  const result = await request("/inventory/user/low-stock");
  return result.data;
};
