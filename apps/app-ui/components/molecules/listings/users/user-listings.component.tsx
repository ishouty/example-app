import { UserResponseDto } from '@shared/common';
import { FunctionComponent } from 'react';
import { IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { CreateUserModal } from '@components/molecules/modals';
import { TUserListingsProp } from './user-listings.type';

export const UserListings: FunctionComponent<TUserListingsProp> = ({
  title,
  data,
}) => {
  return (
    <>
      {/* <div className="bg-white p-6 w-full max-w-lg mx-auto"> */}

      {title && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>
      )}

      <div className="pb-4">
        <CreateUserModal />
      </div>

      {data.map((userListing, index) => (
        <Link href={`/users/${userListing.id}`} key={userListing.id}>
          <div
            key={userListing.id}
            className="flex items-center space-x-4 p-4 mb-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <IconUser className="text-blue-500" size={24} />
            <div className="text-gray-700 font-medium">{userListing.name}</div>
          </div>
        </Link>
      ))}
      {/* </div> */}
    </>
  );
};

export default UserListings;
