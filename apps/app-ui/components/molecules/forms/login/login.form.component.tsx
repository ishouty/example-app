import { FunctionComponent } from 'react';

export type TLoginProps = {
  title: string;
};

// LoginForm.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { string, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginUserDto } from '@shared/common';
import { authenicateUser } from 'services';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { updateAuthenicated } from '../../../../redux/reducers/global.slice';
import { VoidExpression } from 'typescript';

// Define the validation schema using zod
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, { message: 'Password must be at least 1 characters' }),
});

// Define the types for the form data
type FormData = z.infer<typeof schema>;

export type TLoginFormProps = {
  title: string;
  onSubmitHandlerCallBack?: (data: LoginUserDto) => void;
};

// Create the LoginForm component
export const LoginForm: FunctionComponent<TLoginFormProps> = ({
  title,
  onSubmitHandlerCallBack,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: authenicateUser,
    onSuccess: async (response, variables, context) => {
      dispatch(updateAuthenicated(true));
      router.push('/users');
      // forward them to next page
    },
    onError(errorResponse, variables, context) {
      setError('root', {
        type: 'server',
        message: errorResponse.message,
      });
      console.log(errorResponse, 'onError:data');
      console.log(variables, 'onError:variables passed in');
      console.log(context, 'onError:context request');
    },
  });

  const { isError, isSuccess, isPending } = mutation;

  // console.log(isSuccess);
  // console.log(isError);

  const onSubmitHandler = async (data: LoginUserDto) => {
    //console.log(login, 'login');
    clearErrors();
    onSubmitHandlerCallBack && onSubmitHandlerCallBack(data);
    mutation.mutate(data);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          {title}
        </h2>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              {...register('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {errors.root && (
            <p className="text-red-500 text-sm mt-1">{errors.root.message}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
