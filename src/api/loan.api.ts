import api from './axios';
import type { PaginatedResponse } from '../types/customer';
import type { Loan, LoanPayload } from '../types/loan';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginatedResponse<Loan>['meta'];
}

export async function getLoans(
  page = 1,
  search = ''
): Promise<PaginatedResponse<Loan>> {
  const response = await api.get<ApiResponse<Loan[]>>('/loans', {
    params: {
      page,
      search,
    },
  });

  return {
    data: response.data.data,
    meta: {
      current_page: response.data.meta?.current_page ?? 1,
      per_page: response.data.meta?.per_page ?? 15,
      total: response.data.meta?.total ?? 0,
      last_page: response.data.meta?.last_page ?? 1,
    },
  };
}

export async function getLoan(id: number): Promise<Loan> {
  const response = await api.get<ApiResponse<Loan>>(`/loans/${id}`);

  return response.data.data;
}

export async function createLoan(payload: LoanPayload): Promise<Loan> {
  const response = await api.post<ApiResponse<Loan>>('/loans', payload);

  return response.data.data;
}

export async function updateLoan(
  id: number,
  payload: LoanPayload
): Promise<Loan> {
  const response = await api.put<ApiResponse<Loan>>(
    `/loans/${id}`,
    payload
  );

  return response.data.data;
}

export async function deleteLoan(id: number): Promise<void> {
  await api.delete(`/loans/${id}`);
}