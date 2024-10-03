import { NavigationBar } from '@components/molecules';
import { usePathname } from 'next/navigation';
import { FunctionComponent, PropsWithChildren } from 'react';
import { useAppSelector } from '../../../redux/store';
import { createSelectorLinksFilterHiddenItem } from '../../../redux/selectors';

export const ConditionalLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const router = usePathname();
  const navLinks = useAppSelector(createSelectorLinksFilterHiddenItem);

  switch (router) {
    case '/login':
      return children;
    case '/about':
      return (
        <>
          <NavigationBar items={navLinks} />
          {children}
        </>
      );
    default:
      return (
        <>
          <NavigationBar items={navLinks} />
          <div className="space-y-4 p-3">{children}</div>
        </>
      );
  }
};
