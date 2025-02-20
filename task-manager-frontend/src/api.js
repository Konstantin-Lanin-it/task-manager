import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const registerUser = (data) => axios.post(`${API_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${API_URL}/auth/login`, data);
export const getTasks = () => axios.get(`${API_URL}/tasks`, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
export const createTask = (data) => axios.post(`${API_URL}/tasks`, data, { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });