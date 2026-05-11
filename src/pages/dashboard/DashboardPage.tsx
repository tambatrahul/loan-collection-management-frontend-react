import { useEffect, useState } from 'react';
import {
  getBestCollectionTime,
  getDashboardSummary,
} from '../../api/dashboard.api';
import type {
  BestCollectionTime,
  DashboardSummary,
} from '../../types/dashboard';

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);
}

export default function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [bestTime, setBestTime] =
    useState<BestCollectionTime | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [summaryData, bestTimeData] = await Promise.all([
          getDashboardSummary(),
          getBestCollectionTime(),
        ]);

        setSummary(summaryData);
        setBestTime(bestTimeData);
      } catch (error) {
        console.error('Failed to load dashboard:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!summary) {
    return <div>Unable to load dashboard.</div>;
  }

  const cards = [
    {
      label: 'Total Loans',
      value: summary.total_loans,
    },
    {
      label: 'Collected Today',
      value: formatCurrency(summary.total_collected_today),
    },
    {
      label: 'Pending Amount',
      value: formatCurrency(summary.pending_amount),
    },
    {
      label: 'Best Time Slot',
      value: bestTime?.best_time_slot ?? 'No Data',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Collection performance overview
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-xl bg-white p-5 shadow"
          >
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-2 text-2xl font-bold">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Best Collection Time Details */}
      {bestTime && bestTime.best_time_slot && (
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold">
            Best Collection Slot Analysis
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Recommended Slot</p>
              <p className="mt-1 text-xl font-bold">
                {bestTime.best_time_slot}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Successful Collections
              </p>
              <p className="mt-1 text-xl font-bold">
                {bestTime.total_collections}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Amount Collected</p>
              <p className="mt-1 text-xl font-bold">
                {formatCurrency(bestTime.total_amount)}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-500">
            Based on {bestTime.analysis_period}.
          </p>
        </div>
      )}

      {/* Payment Mode Summary */}
      <div className="rounded-xl bg-white p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          Collection by Payment Mode
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">Cash</p>
            <p className="mt-1 text-xl font-bold">
              {formatCurrency(
                summary.collection_by_payment_mode.cash
              )}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">UPI</p>
            <p className="mt-1 text-xl font-bold">
              {formatCurrency(
                summary.collection_by_payment_mode.upi
              )}
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-4 text-center">
            <p className="text-sm text-gray-500">Card</p>
            <p className="mt-1 text-xl font-bold">
              {formatCurrency(
                summary.collection_by_payment_mode.card
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}