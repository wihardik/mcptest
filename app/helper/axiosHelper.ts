import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.GOOGLE_INTEGRATION_URL || "http://localhost:8003";

// create a shared axios instance
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15_000,
});

// ---------------- SAFE POST ----------------
export async function safePost<T = any>(path: string, payload: any) {
  try {
    const { data } = await api.post<T>(path, payload);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      };
    }
    throw err;
  }
}

// ---------------- SAFE GET ----------------
export async function safeGet<T = any>(path: string, params?: Record<string, any>) {
  try {
    const { data } = await api.get<T>(path, { params });
    return data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      };
    }
    throw err;
  }
}




