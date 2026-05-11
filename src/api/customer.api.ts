import api from './axios';
import type {
  Customer,
  CustomerPayload,
  PaginatedResponse,
} from '../types/customer';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginatedResponse<Customer>['meta'];
}

export async function getCustomers(
  page = 1,
  search = ''
): Promise<PaginatedResponse<Customer>> {
  const response = await api.get<ApiResponse<Customer[]>>('/customers', {
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

export async function getCustomer(id: number): Promise<Customer> {
  const response = await api.get<ApiResponse<Customer>>(
    `/customers/${id}`
  );

  return response.data.data;
}

export async function createCustomer(
  payload: CustomerPayload
): Promise<Customer> {
  const response = await api.post<ApiResponse<Customer>>(
    '/customers',
    payload
  );

  return response.data.data;
}

export async function updateCustomer(
  id: number,
  payload: CustomerPayload
): Promise<Customer> {
  const response = await api.put<ApiResponse<Customer>>(
    `/customers/${id}`,
    payload
  );

  return response.data.data;
}

export async function deleteCustomer(id: number): Promise<void> {
  await api.delete(`/customers/${id}`);
}