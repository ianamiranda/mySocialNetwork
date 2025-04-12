import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
});

export const login = (email, password) => {
  return API.post('/auth/login', { email, password });
};

export const register = (userData) => {
  return API.post('/auth/register', userData);
};

export const logout = () => {
  return API.post('/auth/logout');
};

export const getCurrentUser = () => {
  return API.get('/auth/me');
};
