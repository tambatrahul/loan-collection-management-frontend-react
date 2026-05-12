export interface LoanCustomer {
  id: number;
  name: string;
  mobile: string;
  address: string;
}

export interface Loan {
  id: number;
  loan_no: string;
  customer: LoanCustomer;
  emi_amount: string;
  total_amount: string;
  collected_amount: number;
  pending_amount: number;
  status: 'active' | 'completed';
  created_at: string;
}

export interface LoanPayload {
  loan_no: string;
  customer_id: number;
  emi_amount: number;
  total_amount: number;
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