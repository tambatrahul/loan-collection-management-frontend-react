import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteUser, getUsers } from '../../api/user.api';
import type { User } from '../../types/user';

export default function UserListPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function fetchUsers() {
    const response = await getUsers();
    setUsers(response.data);
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this user?')) {
      return;
    }

    await deleteUser(id);
    await fetchUsers();
  }

  useEffect(() => {
    async function loadUsers() {
      await fetchUsers();
    }

    void loadUsers();
  }, []);

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h1 className="text-2xl font-bold">Users</h1>

        <Link
          to="/users/create"
          className="rounded bg-blue-600 px-4 py-2 text-white"
        >
          Add User
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3 capitalize">
                  {user.role}
                </td>
                <td className="space-x-2 px-4 py-3">
                  <Link
                    to={`/users/${user.id}/edit`}
                    className="text-blue-600"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}