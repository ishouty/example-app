// LoginForm.test.tsx
import React, { act } from 'react';
import '@testing-library/jest-dom'; // Provides additional matchers like 'toBeInTheDocument'

import {
  render,
  screen,
  fireEvent,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { CreateUserForm } from './create-user.form.component'; // Adjust the import path as necessary
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
  useQueryClient: () => ({
    refetchQueries: jest.fn(),
  }),
}));

// Mock Redux store
const mockStore = configureStore();
const store = mockStore({});

const mockOnSubmitHandlerCallBack = jest.fn();
describe('CreateUserForm', () => {
  const setup = () => {
    const component = render(
      <Provider store={store}>
        <CreateUserForm onSubmitHandlerCallBack={mockOnSubmitHandlerCallBack} />
      </Provider>,
    );

    return component;
  };

  beforeEach(() => {
    jest.clearAllMocks(); // Clear previous mocks
  });

  test('renders the CreateUserForm and rendered fields and buttons', () => {
    const component = setup();
    expect(component.container.querySelectorAll('input')).toHaveLength(4);
    const nameInput = screen.getByRole('textbox', { name: /name/i });
    const emailInput = screen.getByLabelText(/email/i); // Assumes there's a label associated with the input
    const passwordInput = screen.getByLabelText(/password/i); // Assumes there's a label associated with the input
    const ageInput = screen.getByLabelText(/age/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(ageInput).toBeInTheDocument();
  });

  test('validates fields', async () => {
    const component = setup();
    const validationText = {
      email: 'Invalid email address',
      password: 'Password must be at least 6 characters',
      name: 'Name is required',
      age: 'Expected number, received nan',
    };
    // Submit the form without filling the fields
    await act(async () => {
      fireEvent.click(screen.getByText('Create User'));
    });

    const emailValidation = await screen.getByText(/Invalid email address/)
      .innerHTML;
    expect(emailValidation).toContain(validationText.email);

    const passwordValidation = await screen.getByText(
      /Password must be at least 6 characters/i,
    ).innerHTML;
    expect(passwordValidation).toContain(validationText.password);

    const nameValidation =
      await screen.getByText(/Name is required/i).innerHTML;
    expect(nameValidation).toContain(validationText.name);

    const ageValidation = await screen.getByText(
      /Expected number, received nan/i,
    ).innerHTML;
    expect(ageValidation).toContain(validationText.age);
  });

  test('submits the form with valid data', async () => {
    setup();

    const formText = {
      email: 'test@ishouty.com',
      password: 'test1234',
      name: 'andy',
      age: 2,
    };

    // Fill the input fields with valid data
    await fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: formText.email },
    });
    await fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: formText.password },
    });

    await fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: formText.name },
    });

    await fireEvent.change(screen.getByLabelText(/age/i), {
      target: { value: formText.age },
    });

    // Submit the form

    await act(async () => {
      await fireEvent.click(screen.getByText('Create User'));
    });

    // Wait for the mutation to be called
    await waitFor(() => {
      expect(mockOnSubmitHandlerCallBack).toHaveBeenCalledWith({
        email: formText.email,
        password: formText.password,
        age: formText.age,
        name: formText.name,
      });
    });
  });
});
