import api from './axios';
import type { PaginatedResponse } from '../types/customer';
import type {
  Collection,
  CollectionPayload,
} from '../types/collection';

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginatedResponse<Collection>['meta'];
}

export async function getCollections(
  page = 1,
  search = ''
): Promise<PaginatedResponse<Collection>> {
  const response = await api.get<ApiResponse<Collection[]>>(
    '/collections',
    {
      params: {
        page,
        search,
      },
    }
  );

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

export async function createCollection(
  payload: CollectionPayload
): Promise<Collection> {
  const response = await api.post<ApiResponse<Collection>>(
    '/collections',
    payload
  );

  return response.data.data;
}