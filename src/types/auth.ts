export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'agent';
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}