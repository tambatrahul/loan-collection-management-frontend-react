import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteLoan, getLoans } from '../../api/loan.api';
import { useAuth } from '../../hooks/useAuth';
import type { Loan } from '../../types/loan';

export default function LoanListPage() {
  const { user } = useAuth();

  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchLoans() {
    try {
      setLoading(true);

      const response = await getLoans(page);

      setLoans(response.data);
      setTotalPages(response.meta.last_page);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLoans();
  }, [page]);

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this loan?'
    );

    if (!confirmed) {
      return;
    }

    await deleteLoan(id);
    fetchLoans();
  }

  if (loading) {
    return <div>Loading loans...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Loans</h1>

        <Link
          to="/loans/create"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Loan
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Loan No</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">EMI</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Pending</th>
              {user?.role === 'admin' && (
              <th className="px-4 py-3 text-left">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id} className="border-t">
                <td className="px-4 py-3">{loan.loan_no}</td>
                <td className="px-4 py-3">{loan.customer.name}</td>
                <td className="px-4 py-3">₹{loan.emi_amount}</td>
                <td className="px-4 py-3">₹{loan.total_amount}</td>
                <td className="px-4 py-3">₹{loan.pending_amount}</td>
                {user?.role === 'admin' && (
                <td className="px-4 py-3 space-x-2">
                  <Link
                    to={`/loans/${loan.id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </Link>
                    <button
                      onClick={() => handleDelete(loan.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                </td>
                )}
              </tr>
            ))}

            {loans.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No loans found.
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