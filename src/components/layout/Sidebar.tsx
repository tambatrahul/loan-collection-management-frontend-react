import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const menuItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Users', path: '/users', roles: ['admin'] },
  { label: 'Customers', path: '/customers' },
  { label: 'Loans', path: '/loans' },
  { label: 'Collections', path: '/collections' },
];

export default function Sidebar() {
  const location = useLocation();
  const { user } = useAuth();

  const filteredMenuItems = menuItems.filter((item) => {
    if (!item.roles) {
      return true;
    }

    return item.roles.includes(user?.role ?? '');
  });

  return (
    <aside className="min-h-screen w-64 bg-slate-900 p-4 text-white">
      <h1 className="mb-8 text-xl font-bold">Loan Collection</h1>

      <nav className="space-y-2">
        {filteredMenuItems.map((item) => {
          const active = location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`block rounded px-3 py-2 ${
                active
                  ? 'bg-slate-700'
                  : 'hover:bg-slate-800'
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