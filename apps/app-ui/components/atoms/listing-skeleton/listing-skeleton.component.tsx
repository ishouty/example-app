import React, { FunctionComponent } from 'react';

export const ListingSkeleton: FunctionComponent = () => {
  return (
    <div className="space-y-4">
      {/* Render multiple skeleton items to represent the list of users */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center p-4 bg-white shadow rounded-lg listitem"
          data-testid="listitem"
        >
          {/* Skeleton for user avatar */}
          <div className="h-12 w-12 bg-gray-200 rounded-full animate-pulse mr-4 avatar"></div>

          <div className="flex-1 space-y-2">
            {/* Skeleton for user name */}
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse line"></div>
            {/* Skeleton for user email */}
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse line"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingSkeleton;
