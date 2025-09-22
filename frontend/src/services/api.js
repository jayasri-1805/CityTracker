import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const signup = async (name, email, password) => {
  const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
  return res.data;
};

export const login = async (email, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { email, password });
  return res.data;
};

export const bookRide = async (userId, pickup, destination) => {
  const res = await axios.post(`${API_URL}/rides/book`, { userId, pickup, destination });
  return res.data;
};

export const getRides = async () => {
  const res = await axios.get(`${API_URL}/rides`);
  return res.data;
};
