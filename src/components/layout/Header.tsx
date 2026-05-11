import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate('/login');
  }

  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          Welcome, {user?.name}
        </h2>
        <p className="text-sm text-gray-500">
          Role: {user?.role}
        </p>
      </div>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </header>
  );
}