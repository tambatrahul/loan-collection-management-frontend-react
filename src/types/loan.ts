// src/types/loan.ts

export interface LoanCustomer {
  id: number;
  name: string;
  mobile: string;
  address: string;
}

export type LoanStatus = 'active' | 'completed';

export interface Loan {
  id: number;
  loan_no: string;
  customer: LoanCustomer;
  emi_amount: string;
  total_amount: string;
  collected_amount: number;
  pending_amount: number;
  status: LoanStatus;
  created_at: string;
}

export interface LoanPayload {
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