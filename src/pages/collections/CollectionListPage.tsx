import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCollections } from '../../api/collection.api';
import type { Collection } from '../../types/collection';

export default function CollectionListPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function fetchCollections() {
    try {
      setLoading(true);

      const response = await getCollections(page);

      setCollections(response.data);
      setTotalPages(response.meta.last_page);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCollections();
  }, [page]);

  if (loading) {
    return <div>Loading collections...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Collections</h1>

        <Link
          to="/collections/create"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Add Collection
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left">Loan No</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Payment Mode</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Location</th>
            </tr>
          </thead>

          <tbody>
            {collections.map((collection) => (
              <tr key={collection.id} className="border-t">
                <td className="px-4 py-3">{collection.loan_no}</td>
                <td className="px-4 py-3">
                  {collection.customer_name}
                </td>
                <td className="px-4 py-3">
                  ₹{collection.amount_paid}
                </td>
                <td className="px-4 py-3 uppercase">
                  {collection.payment_mode}
                </td>
                <td className="px-4 py-3">
                  {new Date(
                    collection.collected_at
                  ).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  {collection.location || '-'}
                </td>
              </tr>
            ))}

            {collections.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No collections found.
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