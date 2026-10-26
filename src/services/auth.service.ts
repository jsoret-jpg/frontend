import { api } from "./api";
import type { CurrentUser, LoginResponse } from "../types/auth";

export async function login(username: string, password: string): Promise<LoginResponse> {
  const form = new URLSearchParams();
  form.append("username", username);
  form.append("password", password);
  
  // ✅ Añadido /api antes de /auth/login
  const response = await api.post<LoginResponse>("/api/auth/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return response.data;
}

export async function fetchMe(): Promise<CurrentUser> {
  // ✅ Añadido /api antes de /auth/me
  const response = await api.get<CurrentUser>("/api/auth/me");
  return response.data;
}
