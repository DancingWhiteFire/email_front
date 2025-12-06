import axios from "axios";
import { BACKEND_URL } from "@/lib/env";

export const apis = axios.create({
  baseURL: BACKEND_URL || "http://localhost:4000",
  withCredentials: true,
  timeout: 10000,
});
