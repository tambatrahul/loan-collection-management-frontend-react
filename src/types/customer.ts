export interface Customer {
  id: number;
  name: string;
  mobile: string;
  address: string;
  assigned_to: number;
  created_at: string;
}

export interface CustomerPayload {
  name: string;
  mobile: string;
  address: string;
  assigned_to: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}