'use client';

import { NavigationBar } from '@components/molecules';
import { ThemeProvider } from '../../../providers/theme/theme.provider';
import React from 'react';
import { FunctionComponent, PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { configUi } from 'config';
import { usePathname, useRouter } from 'next/navigation';
import { Provider } from 'react-redux';
import store from '../../../redux/store/store';
import { AuthProvider } from 'providers/auth';
import { ConditionalLayout } from '../conditional-layout';

export const FullLayout: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const queryClient = new QueryClient();

  return (
    <div>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ThemeProvider>
              <ConditionalLayout>{children}</ConditionalLayout>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </Provider>
    </div>
  );
};
