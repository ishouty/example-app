// LoginForm.test.tsx
import React, { act } from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { LoginForm } from './login.form.component'; // Adjust the import path as necessary
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
} from '@tanstack/react-query';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

// Mock the authentication function
jest.mock('services', () => ({
  authenicateUser: jest.fn().mockReturnValue('hello'),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useMutation from @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  useMutation: () => {
    return {
      mutate: jest.fn(),
      isError: jest.fn(() => ({ message: 'Login Failed' })),
      isSuccess: jest.fn(),
      isLoading: jest.fn(),
    };
  },
}));

// Mock Redux store
const mockStore = configureStore();
const store = mockStore({});

const mockProps = {
  title: 'Login Title',
};

const mockOnSubmitHandlerCallBack = jest.fn();
describe('LoginForm', () => {
  const setup = () => {
    const component = render(
      <Provider store={store}>
        <LoginForm
          title={mockProps.title}
          onSubmitHandlerCallBack={mockOnSubmitHandlerCallBack}
        />
      </Provider>,
    );

    return component;
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
  });

  test('renders the LoginForm with title', () => {
    const component = setup();
    const loginTitle = screen.getByText(/Login Title/).innerHTML;
    expect(loginTitle).toEqual(mockProps.title);
  });

  test('validates email and password fields', async () => {
    const component = setup();
    const validationText = {
      email: 'Invalid email address',
      password: 'Invalid email address',
    };
    // Submit the form without filling the fields
    await act(async () => {
      fireEvent.click(screen.getByText('Login'));
    });

    const emailValidation = await screen.getByText(/Invalid email address/)
      .innerHTML;
    expect(emailValidation).toContain(validationText.email);

    const passwordValidation = await screen.getByText(
      /Password must be at least 1 characters/,
    ).innerHTML;
    expect(emailValidation).toContain(validationText.password);
  });

  test('submits the form with valid data', async () => {
    setup();

    // Fill the input fields with valid data
    await fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    await fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' },
    });

    // Submit the form

    await act(async () => {
      await fireEvent.click(screen.getByText('Login'));
    });

    // Wait for the mutation to be called
    await waitFor(() => {
      expect(mockOnSubmitHandlerCallBack).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });
});
