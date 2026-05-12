import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import {
  createUser,
  getUser,
  updateUser,
} from '../../api/user.api';
import {
  userSchema,
  type UserFormValues,
} from '../../schemas/user.schema';

export default function UserFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      role: 'agent',
    },
  });

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    async function fetchUser() {
      const user = await getUser(Number(id));

      reset({
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }

    fetchUser();
  }, [id, isEditMode, reset]);

  async function onSubmit(values: UserFormValues) {
    const payload = { ...values };

    // If editing and password is empty, don't send it.
    if (isEditMode && !payload.password) {
      delete payload.password;
    }

    if (isEditMode) {
      await updateUser(Number(id), payload);
    } else {
      await createUser(payload);
    }

    navigate('/users');
  }

  return (
    <div className="max-w-2xl">
      <div className="rounded-xl bg-white p-6 shadow">
        <h1 className="mb-6 text-2xl font-bold">
          {isEditMode ? 'Edit User' : 'Add User'}
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              {...register('name')}
              className="w-full rounded border px-3 py-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register('email')}
              className="w-full rounded border px-3 py-2"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
              {isEditMode && (
                <span className="ml-1 text-gray-500">
                  (leave blank to keep unchanged)
                </span>
              )}
            </label>
            <input
              type="password"
              {...register('password')}
              className="w-full rounded border px-3 py-2"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Role
            </label>
            <select
              {...register('role')}
              className="w-full rounded border px-3 py-2"
            >
              <option value="admin">Admin</option>
              <option value="agent">Agent</option>
            </select>
            {errors.role && (
              <p className="mt-1 text-sm text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditMode
                  ? 'Update User'
                  : 'Create User'}
            </button>

            <button
              type="button"
              onClick={() => navigate('/users')}
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