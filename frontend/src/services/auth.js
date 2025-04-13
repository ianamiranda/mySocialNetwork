import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(
    `${API}/login`,
    { email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const register = async (nameUser, email, password) => {
  const response = await axios.post(
    `${API}/register`,
    { nameUser, email, password },
    { withCredentials: true }
  );
  return response.data;
};

export const logout = async () => {
  const response = await axios.post(
    `${API}/logout`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
