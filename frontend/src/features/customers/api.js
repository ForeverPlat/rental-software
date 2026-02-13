// const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:2000';
const apiUrl = "http://localhost:2000";

export const getCustomers = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch(`${apiUrl}/api/customers/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch customers: ${res.status}`);
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error(`Error fetching customers: ${error}`);
    throw error;
  }
};
