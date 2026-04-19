import { request } from "../../lib/http";

export const createCompany = async ({ name }) => {
  const result = await request("/company", {
    method: "POST",
    body: JSON.stringify({ name }),
  });

  return result.data;
};

export const getCompanyMembers = async () => {
  const result = await request("/company/members");
  return result.data;
};
