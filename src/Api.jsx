import axios from "axios";

const Api_Url = "https://fakestoreapi.com/users";

export const fetchAllUsers = async () => {
  const response = await axios.get(Api_Url);
  return response.data;
};

export const AddUser = async (newUser) => {
  const response = await axios.post(Api_Url, newUser);
  return response.data;
};

export const UpdateUser = async (updatedUser) => {
  const response = await axios.put(`${Api_Url}/${updatedUser.id}`, updatedUser);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${Api_Url}/${id}`);
};
