import api from './axios';
import type { LoginPayload, LoginResponse, User } from '../types/auth';

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>('/auth/login', payload);
  return response.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function me(): Promise<User> {
  const response = await api.get<{ data: User }>('/auth/me');
  return response.data.data;
}