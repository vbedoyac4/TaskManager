import axios from 'axios';

// Create an Axios instance with a base URL
const instance = axios.create({
  baseURL: 'http://localhost:7090/api', // Replace with your backend API URL
  timeout: 10000, // Optional timeout setting
});

// Add a request interceptor to include the token in headers
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to request headers
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
