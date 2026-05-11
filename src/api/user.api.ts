import api from './axios';

export interface Agent {
  id: number;
  name: string;
  email: string;
}

export async function getAgents(): Promise<Agent[]> {
  const response = await api.get('/users', {
    params: {
      role: 'agent',
      per_page: 100,
    },
  });

  return response.data.data;
}