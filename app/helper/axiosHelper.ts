import axios, { AxiosInstance } from 'axios';

const BASE_URL = process.env.GOOGLE_INTEGRATION_URL || 'http://localhost:8003';

// create a shared axios instance
export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
});

// ---------------- SAFE POST ----------------
export async function safePost<T = unknown>(path: string, payload?: unknown): Promise<T> {
  try {
    const { data } = await api.post<T>(path, payload as unknown as Record<string, unknown>);
    return data;
  } catch (err: unknown) {
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
export async function safeGet<T = unknown>(path: string, params?: Record<string, unknown>): Promise<T> {
  try {
    const { data } = await api.get<T>(path, { params });
    return data;
  } catch (err: unknown) {
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
