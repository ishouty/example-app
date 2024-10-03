'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ApiClient } from 'services/api-client';

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    ApiClient.resetAuthToken();
    // Redirect to login or home page
    router.push('/login'); // Redirect to the login page after logging out
  }, [router]);

  return null;
};

export default LogoutPage;
