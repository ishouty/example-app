import { FunctionComponent } from 'react';
import { IconUser } from '@tabler/icons-react';

export const UserDetailSkeleton: FunctionComponent = () => {
  return (
    <div
      className="flex items-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-sm space-x-4 animate-pulse"
      data-testid="userdetail-container"
    >
      <div className="shrink-0">
        <IconUser className="h-12 w-12 text-gray-300" aria-hidden="true" />
      </div>
      <div className="text-left space-y-2 flex-1">
        {Array.from({ length: 5 }).map((item, index) => {
          return (
            <div className="space-y-1" key={index}>
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-6 bg-gray-300 rounded w-64"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserDetailSkeleton;
