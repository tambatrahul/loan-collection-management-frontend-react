import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createCollection } from "../../api/collection.api";
import { getLoans } from "../../api/loan.api";
import {
  collectionSchema,
  type CollectionFormValues,
} from "../../schemas/collection.schema";
import type { Loan } from "../../types/loan";
import { z } from 'zod';

export default function CollectionFormPage() {
  const navigate = useNavigate();
  const [loans, setLoans] = useState<Loan[]>([]);

  type CollectionFormInput = z.input<typeof collectionSchema>;
  type CollectionFormOutput = z.output<typeof collectionSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CollectionFormInput, unknown, CollectionFormOutput>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      loan_id: 0,
      amount_paid: 0,
      payment_mode: "cash",
      location: "",
      collected_at: new Date().toISOString().slice(0, 16),
    },
  });

  useEffect(() => {
    async function fetchLoans() {
      const response = await getLoans(1);
      setLoans(response.data);
    }

    fetchLoans();
  }, []);

  async function onSubmit(values: CollectionFormValues) {
    await createCollection(values);
    navigate("/collections");
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">Add Collection</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Loan</label>
            <select
              {...register("loan_id")}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select Loan</option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {loan.loan_no} - {loan.customer_name}
                </option>
              ))}
            </select>
            {errors.loan_id && (
              <p className="mt-1 text-sm text-red-500">
                {errors.loan_id.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Amount Paid
            </label>
            <input
              type="number"
              step="0.01"
              {...register("amount_paid")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.amount_paid && (
              <p className="mt-1 text-sm text-red-500">
                {errors.amount_paid.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Payment Mode
            </label>
            <select
              {...register("payment_mode")}
              className="w-full rounded border px-3 py-2"
            >
              <option value="cash">Cash</option>
              <option value="upi">UPI</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Location</label>
            <input
              {...register("location")}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Collection Date & Time
            </label>
            <input
              type="datetime-local"
              {...register("collected_at")}
              className="w-full rounded border px-3 py-2"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Collection"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/collections")}
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
