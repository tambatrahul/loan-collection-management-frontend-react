export interface Loan {
  id: number;
  loan_no: string;
  customer_id: number;
  customer_name: string;
  emi_amount: number;
  total_amount: number;
  paid_amount: number;
  pending_amount: number;
  created_at: string;
}

export interface LoanPayload {
  loan_no: string;
  customer_id: number;
  emi_amount: number;
  total_amount: number;
}

export interface LoanFormValues {
  loan_no: string;
  customer_id: number;
  emi_amount: number;
  total_amount: number;
}