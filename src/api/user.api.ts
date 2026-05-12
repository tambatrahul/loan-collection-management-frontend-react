import api from './axios';

export interface UserPayload {
  name: string;
  email: string;
  password?: string;
  role: 'admin' | 'agent';
}

export async function getUsers(params?: Record<string, unknown>) {
  const response = await api.get('/users', { params });
  return response.data;
}

export async function getUser(id: number) {
  const response = await api.get(`/users/${id}`);
  return response.data.data;
}

export async function createUser(payload: UserPayload) {
  const response = await api.post('/users', payload);
  return response.data.data;
}

export async function updateUser(
  id: number,
  payload: UserPayload
) {
  const response = await api.put(`/users/${id}`, payload);
  return response.data.data;
}

export async function deleteUser(id: number) {
  const response = await api.delete(`/users/${id}`);
  return response.data;
}