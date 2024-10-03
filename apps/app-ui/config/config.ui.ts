export const configUi = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'not-working',
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION || 'v1',
  environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'production',
};

export default configUi;
