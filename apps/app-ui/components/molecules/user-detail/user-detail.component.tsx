import { UserResponseDto } from '@shared/common';
import { IconUser } from '@tabler/icons-react';
import { FunctionComponent } from 'react';
import { TUserDetailProps } from './user-detail.type';

export const UserDetail: FunctionComponent<TUserDetailProps> = ({ data }) => {
  return (
    <>
      {data.name && (
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{data.name}</h2>
      )}
      <div
        className="flex items-center p-6 max-w-sm mx-auto bg-white rounded-xl space-x-4"
        role="region"
        aria-labelledby="user-details-title"
      >
        <div className="shrink-0">
          <IconUser className="h-12 w-12 text-gray-500" aria-hidden="true" />
        </div>
        <div className="text-left space-y-2">
          <h2 id="user-details-title" className="sr-only">
            User Details
          </h2>
          <div>
            <label
              htmlFor="user-name"
              className="text-base font-semibold text-gray-700"
            >
              Name:
            </label>
            <span
              id="user-name"
              className="text-base font-medium text-black ml-2"
              aria-labelledby="user-name"
            >
              {data.name}
            </span>
          </div>
          <div>
            <label
              htmlFor="user-email"
              className="text-base font-semibold text-gray-700"
            >
              Email:
            </label>
            <span
              id="user-email"
              className="text-base text-gray-500 ml-2"
              aria-labelledby="user-email"
            >
              {data.email}
            </span>
          </div>
          <div>
            <label
              htmlFor="user-joined"
              className="text-base font-semibold text-gray-700"
            >
              Joined on:
            </label>
            <span
              id="user-joined"
              className="text-base text-gray-400 ml-2"
              aria-labelledby="user-joined"
            >
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <label
              htmlFor="user-id"
              className="text-base font-semibold text-gray-700"
            >
              User ID:
            </label>
            <span
              id="user-id"
              className="text-base text-gray-400 ml-2"
              aria-labelledby="user-id"
            >
              {data.id}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetail;
