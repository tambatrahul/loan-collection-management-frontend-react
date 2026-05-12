import { z } from 'zod';

export const loanSchema = z.object({
  customer_id: z.coerce
    .number()
    .min(1, 'Customer is required.'),
  emi_amount: z.coerce
    .number()
    .min(1, 'EMI amount must be greater than 0.'),
  total_amount: z.coerce
    .number()
    .min(1, 'Total amount must be greater than 0.'),
});

export type LoanFormInput = z.input<typeof loanSchema>;
export type LoanFormValues = z.output<typeof loanSchema>;