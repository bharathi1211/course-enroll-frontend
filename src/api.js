// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333',
});
// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });
//api.defaults.headers.post['Content-Type'] = 'application/json';
export default api;
