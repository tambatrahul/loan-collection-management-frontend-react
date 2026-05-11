import { z } from 'zod';

export const collectionSchema = z.object({
  loan_id: z.coerce
    .number()
    .min(1, 'Loan is required.'),
  amount_paid: z.coerce
    .number()
    .min(1, 'Amount paid must be greater than 0.'),
  payment_mode: z.enum(['cash', 'upi', 'card']),
  location: z.string().optional(),
  collected_at: z.string().min(1, 'Collection date is required.'),
});

export type CollectionFormInput = z.input<typeof collectionSchema>;
export type CollectionFormValues = z.output<typeof collectionSchema>;