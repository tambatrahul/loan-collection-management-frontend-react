import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Customers', path: '/customers' },
  { label: 'Loans', path: '/loans' },
  { label: 'Collections', path: '/collections' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-4">
      <h1 className="text-xl font-bold mb-8">Loan Collection</h1>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const active = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded px-3 py-2 ${
                active ? 'bg-slate-700' : 'hover:bg-slate-800'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}