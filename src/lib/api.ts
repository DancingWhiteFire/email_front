import axios from "axios";
import { BACKEND_URL } from "@/lib/env";

export const apis = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
  timeout: 60000,
});
