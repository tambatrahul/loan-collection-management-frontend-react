import api from './axios';
import type {
  BestCollectionTime,
  DashboardSummary,
} from '../types/dashboard';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export async function getDashboardSummary(): Promise<DashboardSummary> {
  const response = await api.get<ApiResponse<DashboardSummary>>(
    '/dashboard/summary'
  );

  return response.data.data;
}

export async function getBestCollectionTime(): Promise<BestCollectionTime> {
  const response = await api.get<ApiResponse<BestCollectionTime>>(
    '/dashboard/best-collection-time'
  );

  return response.data.data;
}