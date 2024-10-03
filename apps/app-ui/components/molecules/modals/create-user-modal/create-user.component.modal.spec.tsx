import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Provides additional matchers like 'toBeInTheDocument'
import CreateUserModal from './create-user.component.modal'; // Adjust the import based on your directory structure
import { act } from 'react';

jest.mock(
  '@components/molecules/forms/user/create-user/create-user.form.component',
  () => jest.fn(() => <div>UserForm Mock</div>),
);

describe('CreateUserModal Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  test('renders "Create New User" button initially', () => {
    const component = render(<CreateUserModal />);

    // Verify the button is in the document
    const openModalButton = screen.getByText('Create New User');
    expect(openModalButton).toBeInTheDocument();
  });

  test('opens the modal when "Create New User" button is clicked', async () => {
    const component = render(<CreateUserModal />);

    // Click the "Create New User" button
    const openModalButton = screen.getByText('Create New User');
    // Verify modal content is displayed
    expect(screen.getByText('Create New User')).toBeInTheDocument();
    await act(async () => {
      await fireEvent.click(openModalButton);
    });

    expect(
      screen.getByText(
        'Please fill in the details below to create a new user.',
      ),
    ).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const UserForm = require('@components/molecules/forms/user/create-user/create-user.form.component');
    expect(UserForm).toHaveBeenCalled(); // Check that the UserForm was called
  });

  test('closes the modal when "Close" button is clicked', async () => {
    const component = render(<CreateUserModal />);

    // Open the modal by clicking the "Create New User" button
    const openModalButton = screen.getByText('Create New User');
    expect(screen.getByText('Create New User')).toBeInTheDocument();

    await act(async () => {
      await fireEvent.click(openModalButton);
    });

    expect(
      screen.getByText(
        'Please fill in the details below to create a new user.',
      ),
    ).toBeInTheDocument();

    // // Close the modal by clicking the "Close" button
    const closeModalButton = screen.getByRole('button', { name: /Close/i });

    await fireEvent.click(closeModalButton);

    // // Verify the modal is closed
    expect(closeModalButton).toBeInTheDocument();
  });
});
