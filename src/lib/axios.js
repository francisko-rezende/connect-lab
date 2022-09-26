import { API_URL } from "@config";
import axios from "axios";

// todo set up interceptor for handling errors
// todo create instance for weather calls

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
