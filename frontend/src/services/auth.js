import axios from 'axios';

const API = 'http://localhost:8080/api/auth';

export const login = async (email, password) => {
  const response = await axios.post(
    `${API}/login`,
    { email, password },
    { withCredentials: true }  // Ensure session cookie is included
  );
  return response.data;  // Return response data (you can adjust as needed)
};

export const register = async (name, email, password) => {
  const response = await axios.post(
    `${API}/register`,
    { name, email, password },
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
