import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export const login = (email, password) => {
  return API.post('/auth/login', { email, password });
};

export const register = (userData) => {
  return API.post('/auth/register', userData);
};
