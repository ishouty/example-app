import { UserListings } from '@components/molecules/listings';
import { UsersPage } from '@components/organisms/pages/users/users.component.page';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FunctionComponent } from 'react';
import { getListUsers } from 'services';

export const metadata = {
  title: 'Users',
  description: 'Users',
};

export default function Page() {
  return <UsersPage />;
}
