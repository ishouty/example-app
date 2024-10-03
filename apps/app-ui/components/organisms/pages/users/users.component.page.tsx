'use client';

import { ListingSkeleton } from '@components/atoms/listing-skeleton';
import { CreateUserModal } from '@components/molecules';
import { UserListings } from '@components/molecules/listings';
import { useQuery } from '@tanstack/react-query';
import React, { FunctionComponent } from 'react';
import { getListUsers } from 'services';

export const UsersPage: FunctionComponent = () => {
  const {
    data: dataResponse,
    error,
    isLoading,
    isError,
  } = useQuery({ queryKey: ['users'], queryFn: getListUsers });
  return (
    <>
      {isError && <>Something went wrong </>}
      {isLoading && !isError && <ListingSkeleton />}
      {!isLoading && dataResponse?.data && (
        <UserListings data={dataResponse?.data} title={'Users'} />
      )}
    </>
  );
};
