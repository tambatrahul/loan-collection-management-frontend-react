// src/types/collection.ts

export type PaymentMode = 'cash' | 'upi' | 'card';

export interface CollectionLoan {
  id: number;
  loan_no: string;
  customer_name: string;
}

export interface CollectionCollector {
  id: number;
  name: string;
}

export interface Collection {
  id: number;
  loan: CollectionLoan;
  amount_paid: string;
  payment_mode: PaymentMode;
  location: string | null;
  collected_at: string;
  collector: CollectionCollector;
}

export interface CollectionPayload {
  loan_id: number;
  amount_paid: number;
  payment_mode: PaymentMode;
  location?: string;
  collected_at: string;
}

export interface CollectionFormValues {
  loan_id: number;
  amount_paid: number;
  payment_mode: PaymentMode;
  location?: string;
  collected_at: string;
}