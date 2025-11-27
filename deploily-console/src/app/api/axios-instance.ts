import axios from "axios";

// Create an Axios instance with the base URL from environment variables
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL, // Base URL from .env file
  timeout: 10000, // Optional: Set a timeout for the request
});

export default axiosInstance;
