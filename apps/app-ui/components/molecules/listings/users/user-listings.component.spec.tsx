import { render, screen } from '@testing-library/react';
import UserListings from './user-listings.component';
import { UserResponseDto } from '@shared/common';

// Mock CreateUserModal component
jest.mock('@components/molecules/modals', () => ({
  CreateUserModal: jest.fn(() => <div data-testid="create-user-modal" />),
}));
describe('UserListings Component', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  const setup = () => {
    const userListing: UserResponseDto[] = [
      {
        email: 'test@ishouty.com',
        name: 'test name',
        age: 2,
        id: 3,
        createdAt: '323232332',
      },
      {
        email: 'test+2@ishouty.com',
        name: 'test 2',
        age: 222,
        id: 33,
        createdAt: '323232332',
      },
    ];
    const component = render(
      <UserListings data={userListing} title={'User Listing'} />,
    );
    return component;
  };

  test('should render CreateUserModal', () => {
    const component = setup();

    const modalElement = screen.getByTestId('create-user-modal').outerHTML;
    expect(modalElement).toEqual('<div data-testid="create-user-modal"></div>');
  });

  test('render a list of users', () => {
    const component = setup();
    expect(screen.getAllByText(/User Listing/)).toHaveLength(1);
    expect(component.container.querySelectorAll('svg')).toHaveLength(2);
    expect(screen.getByText(/test name/).innerHTML).toContain('test name');
    expect(screen.getByText(/test 2/).innerHTML).toContain('test 2');

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
  });
});
