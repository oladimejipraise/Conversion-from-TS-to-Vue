import axios, { type InternalAxiosRequestConfig } from "axios";
import type {
  AuthResponse,
  LoginPayload,
  SignupPayload,
  User,
  Todo,
  CreateTodoPayload,
  UpdateTodoPayload,
  TodosResponse,
} from "@/types";

export const api = axios.create({
  baseURL: "https://api.oluwasetemi.dev",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (payload: SignupPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/register", payload);
  return response.data;
};

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/auth/login", payload);
  return response.data;
};

export const getCurrentUser = async (): Promise<User> => {
  const response = await api.get<User>("/auth/me");
  return response.data;
};

export const getTodos = async (): Promise<TodosResponse> => {
  const response = await api.get<TodosResponse>("/tasks");
  return response.data;
};

export const getTodo = async (id: string): Promise<Todo> => {
  const response = await api.get<Todo>(`/tasks/${id}`);
  return response.data;
};

export const createTodo = async (payload: CreateTodoPayload): Promise<Todo> => {
  const response = await api.post<Todo>("/tasks", payload);
  return response.data;
};

export const updateTodo = async ({ id, payload }: UpdateTodoPayload): Promise<Todo> => {
  const response = await api.patch<Todo>(`/tasks/${id}`, payload);
  return response.data;
};

export const deleteTodo = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};