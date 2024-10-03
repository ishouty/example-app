'use client';

import { UserDetailSkeleton } from '@components/atoms';
import { UserDetail } from '@components/molecules';
import { useQuery } from '@tanstack/react-query';
import { FunctionComponent } from 'react';
import { getUserById } from 'services';

export type TUserDetailProps = {
  id: string;
};

export const UserDetailPage: FunctionComponent<TUserDetailProps> = ({ id }) => {
  const { isLoading, data: dataResponse } = useQuery({
    queryKey: ['userdetail'], // can refetch this if required
    queryFn: () => getUserById(id),
  });

  if (isLoading) {
    return <UserDetailSkeleton />;
  }

  return dataResponse?.data && <UserDetail data={dataResponse.data} />;
};

export default UserDetailPage;
