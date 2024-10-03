// UserForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNewUser } from 'services';
import { TCreateUserForm } from './create-user.form.type';

// Define the validation schema using zod
const schema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  age: z.number(),
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters' })
    .nonempty({ message: 'Password is required' }),
});

// Define the types for the form data
type FormData = z.infer<typeof schema>;

// Create the UserForm component
export const CreateUserForm: React.FC<TCreateUserForm> = ({
  onSubmitHandlerCallBack,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [successCreatedUser, setSucessCreatedUser] = useState(false);
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationKey: ['create-user'],
    mutationFn: createNewUser,

    onError: (errorResponse, variables, context) => {
      setError('root', {
        type: 'server',
        message: errorResponse.message,
      });
    },
    onSuccess: (successResponse, variables, context) => {
      setSucessCreatedUser(true);
      queryClient.refetchQueries({ queryKey: ['users'] });
      reset();
    },
  });
  const onSubmitHandler: SubmitHandler<FormData> = (data) => {
    mutation.mutate(data);
    onSubmitHandlerCallBack && onSubmitHandlerCallBack(data);
    // Handle user creation logic here (e.g., API call)
  };

  return (
    <>
      {successCreatedUser && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 border border-green-400 rounded-lg">
          User has been created!
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium">
            Name *
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium">
            Email *
          </label>
          <input
            type="text"
            id="email"
            {...register('email')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 font-medium">
            Password *
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="age" className="block text-gray-700 font-medium">
            Age
          </label>
          <input
            type="number"
            id="age"
            min={0}
            max={100}
            {...register('age', { valueAsNumber: true })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.age && (
            <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>
          )}
        </div>

        <div>
          {errors.root && (
            <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create User
        </button>
      </form>
    </>
  );
};

export default CreateUserForm;
