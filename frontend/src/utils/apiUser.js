/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import axios from "axios";
import useSWR, { mutate } from "swr";

export const fetchUsers = async (url) => {
  const data = await axios
    .get(url, { headers: { "Cache-Control": "no-cache" } })
    .then((res) => res.data);
  return data;
};

export const getAllUsers = () => {
  const { data, error } = useSWR(
    "http://localhost:3000/user",
    fetchUsers,
    mutate("http://localhost:3000/user")
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};

export const getUsersById = (id) => {
  const { data, error } = useSWR(
    `http://localhost:3000/user/${id}`,
    fetchUsers,
    mutate(`http://localhost:3000/user/${id}`)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
  };
};
