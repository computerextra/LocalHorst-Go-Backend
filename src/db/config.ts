import axios from "axios";

const port = import.meta.env.VITE_PORT;
const API = import.meta.env.VITE_API;

export const client = axios.create({
  baseURL: `${API}:${port}/api`,
});
