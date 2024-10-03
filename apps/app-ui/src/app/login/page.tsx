import LoginPage from '@components/organisms/pages/auth/login.component.page';
import React from 'react';
import { FunctionComponent } from 'react';

export const metadata = {
  title: 'Login Page',
  description: 'Login Page',
};

export default function Page() {
  return (
    <>
      <LoginPage />
    </>
  );
}
