import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteCustomer, getCustomers } from '../../api/customer.api';
import { useAuth } from '../../hooks/useAuth';
import type { LoanCustomer } from '../../types/customer';

export default function CustomerListPage() {
  const { user } = useAuth();

  const [customers, setCustomers] = useState<LoanCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchCustomers() {
    try {
      setLoading(true);

      const response = await getCustomers(page);

      setCustomers(response.data);
      setTotalPages(response.meta.last_page);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this customer?'
    );

    if (!confirmed) {
      return;
    }

    await deleteCustomer(id);
    fetchCustomers();
  }

  if (loading) {
    return <div>Loading customers...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Customers</h1>

        <Link
          to="/customers/create"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Customer
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Address</th>
              {user?.role === 'admin' && (
              <th className="px-4 py-3 text-left">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-t">
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.mobile}</td>
                <td className="px-4 py-3">{customer.address}</td>
                {user?.role === 'admin' && (
                <td className="px-4 py-3 space-x-2">
                  <Link
                    to={`/customers/${customer.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                    <button
                      onClick={() => handleDelete(customer.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  
                </td>
                )}
              </tr>
            ))}

            {customers.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}