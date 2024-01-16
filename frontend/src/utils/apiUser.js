import axios from "axios";

export const fetchData = async (url) => {
  const data = await axios.get(url, {
    headers: { "Cache-Control": "no-cache" },
  });
  return data.data;
};

export const getAllUsers = async () => {
  const url = "http://localhost:3000/user";
  try {
    const result = await fetchData(url);
    return result;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
