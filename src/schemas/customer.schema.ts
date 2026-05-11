import { z } from "zod";

export const customerSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),

  mobile: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Please enter a valid 10-digit Indian mobile number.",
    ),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long.")
    .max(500, "Address cannot exceed 500 characters.")
    .regex(/^[a-zA-Z0-9\s,.\-/#]+$/, "Address contains invalid characters."),
    
  assigned_to: z.coerce.number().min(1, "Please select a field agent."),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
export type CustomerFormInput = z.input<typeof customerSchema>;
