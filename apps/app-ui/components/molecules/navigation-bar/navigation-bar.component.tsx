'use-client';

import classNames from 'classnames';
import { ThemeContext } from '../../../providers/theme/theme.context';
import React, { ReactNode, useContext, useEffect } from 'react';
import { FunctionComponent } from 'react';
import Link from 'next/link';
import { IconBrandGitlab, icons, IconUser } from '@tabler/icons-react';
import { NavigationLayoutMenuType } from '../../../types/enum';
import { useAppSelector } from '../../../redux/store';
import { TNavigationBarProps } from './navigation-bar.type';

export const NavigationBar: FunctionComponent<TNavigationBarProps> = ({
  items,
}) => {
  //const theme = useContext(ThemeContext);
  //const userProfile = useAppSelector((state) => state.user);

  return (
    <nav
      className={classNames(
        'bg-gray-100 flex justify-between items-center p-4 border-b border-gray-200 shadow-sm',
      )}
    >
      <div className="flex space-x-4 underline">
        {items
          .filter((item) => item.type === NavigationLayoutMenuType.main)
          .map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                href={item.link}
                key={index}
                passHref
                className="flex space-x-1"
              >
                <div className="flex items-center space-x-2">
                  {Icon && <Icon className="h-5 w-5" />}{' '}
                  <span>{item.label}</span>{' '}
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex">
        {items
          .filter((item) => item.type === NavigationLayoutMenuType.settings)
          .map((item, index) => {
            const Icon = item.icon;

            return (
              <Link href={item.link} key={index} passHref>
                <div className="flex items-center space-x-2">
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{item.label}</span>{' '}
                </div>
              </Link>
            );
          })}
      </div>
    </nav>
  );
};
