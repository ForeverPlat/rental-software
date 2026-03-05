import { request } from "../../lib/http";

export const getHomeStats = async () => {
  const result = await request("/home/stats/user");
  return result.data;
};
