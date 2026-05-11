import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getAgents, type Agent } from "../../api/user.api";
import {
  customerSchema,
  type CustomerFormInput,
  type CustomerFormValues,
} from "../../schemas/customer.schema";
import {
  createCustomer,
  getCustomer,
  updateCustomer,
} from "../../api/customer.api";

export default function CustomerFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [agents, setAgents] = useState<Agent[]>([]);

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormInput, unknown, CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      mobile: "",
      address: "",
      assigned_to: 0,
    },
  });

  useEffect(() => {
    async function loadData() {
      const agentList = await getAgents();
      setAgents(agentList);

      if (isEditMode) {
        const customer = await getCustomer(Number(id));

        reset({
          name: customer.name,
          mobile: customer.mobile,
          address: customer.address,
          assigned_to: customer.assigned_to,
        });
      }
    }

    loadData();
  }, [id, isEditMode, reset]);

  async function onSubmit(values: CustomerFormValues) {
    if (isEditMode) {
      await updateCustomer(Number(id), values);
    } else {
      await createCustomer(values);
    }

    navigate("/customers");
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          {isEditMode ? "Edit Customer" : "Add Customer"}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Name</label>
            <input
              {...register("name")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mobile</label>
            <input
              {...register("mobile")}
              className="w-full rounded border px-3 py-2"
            />
            {errors.mobile && (
              <p className="mt-1 text-sm text-red-500">
                {errors.mobile.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Address</label>
            <textarea
              {...register("address")}
              rows={4}
              className="w-full rounded border px-3 py-2"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Assigned Agent
            </label>

            <select
              {...register("assigned_to")}
              className="w-full rounded border px-3 py-2"
            >
              <option value="">Select Agent</option>

              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.name}
                </option>
              ))}
            </select>

            {errors.assigned_to && (
              <p className="mt-1 text-sm text-red-500">
                {errors.assigned_to.message}
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
                  ? "Update Customer"
                  : "Create Customer"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/customers")}
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
