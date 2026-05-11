export interface Collection {
  id: number;
  loan_id: number;
  loan_no: string;
  customer_name: string;
  amount_paid: number;
  payment_mode: 'cash' | 'upi' | 'card';
  location?: string | null;
  collected_at: string;
}

export interface CollectionPayload {
  loan_id: number;
  amount_paid: number;
  payment_mode: 'cash' | 'upi' | 'card';
  location?: string;
  collected_at: string;
}

export interface CollectionFormValues {
  loan_id: number;
  amount_paid: number;
  payment_mode: 'cash' | 'upi' | 'card';
  location?: string;
  collected_at: string;
}