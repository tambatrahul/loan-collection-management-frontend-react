export interface DashboardSummary {
  total_loans: number;
  total_collected_today: number;
  pending_amount: number;
  collection_by_payment_mode: {
    cash: number;
    upi: number;
    card: number;
  };
}

export interface BestCollectionTime {
  best_time_slot: string | null;
  slot_start_hour?: number | null;
  slot_end_hour?: number | null;
  total_collections: number;
  total_amount: number;
  analysis_period: string;
}