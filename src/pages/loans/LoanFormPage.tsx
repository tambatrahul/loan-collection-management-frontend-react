import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomers } from "../../api/customer.api";
import { createLoan, getLoan, updateLoan } from "../../api/loan.api";
import { loanSchema, type LoanFormValues } from "../../schemas/loan.schema";
import type { Customer } from "../../types/customer";
import { z } from 'zod';

export default function LoanFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [customers, setCustomers] = useState<Customer[]>([]);

  type LoanFormInput = z.input<typeof loanSchema>;
  type LoanFormOutput = z.output<typeof loanSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoanFormInput, unknown, LoanFormOutput>({
    resolver: zodResolver(loanSchema),
    defaultValues: {
      loan_no: "",
      customer_id: 0,
      emi_amount: 0,
      total_amount: 0,
    },
  });

  useEffect(() => {
    async function fetchCustomersAndLoan() {
      const customerResponse = await getCustomers(1);

      setCustomers(customerResponse.data);

      if (isEditMode) {
        const loan = await getLoan(Number(id));

        reset({
          loan_no: loan.loan_no,
          customer_id: loan.customer_id,
          emi_amount: loan.emi_amount,
          total_amount: loan.total_amount,
        });
      }
    }

    fetchCustomersAndLoan();
  }, [id, isEditMode, reset]);

  async function onSubmit(values: LoanFormValues) {
    if (isEditMode) {
      await updateLoan(Number(id), values);
    } else {
      await createLoan(values);
    }

    navigate("/loans");
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          {isEditMode ? "Edit Loan" : "Add Loan"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Loan Number
            </label>
            <input
              {...register("loan_no")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.loan_no && (
              <p className="mt-1 text-sm text-red-500">
                {errors.loan_no.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Customer</label>
            <select
              {...register("customer_id")}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select Customer</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
            {errors.customer_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.customer_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">EMI Amount</label>
            <input
              type="number"
              step="0.01"
              {...register("emi_amount")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.emi_amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.emi_amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Total Amount
            </label>
            <input
              type="number"
              step="0.01"
              {...register("total_amount")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.total_amount && (
              <p className="mt-1 text-sm text-red-500">
                {errors.total_amount.message}
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : isEditMode
                  ? "Update Loan"
                  : "Create Loan"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/loans")}
              className="rounded border px-4 py-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
