import { FullLayout } from '@components/layouts/full-layout/full-layout.component.layout';
import './global.css';
//import { ThemeProvider } from '../../providers/theme/theme.provider';

export const metadata = {
  title: 'Welcome to app-ui',
  description: 'Generated by create-nx-workspace',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Add Context Providers - State management and middlewear authication to protect application */}
        <FullLayout>{children}</FullLayout>
      </body>
    </html>
  );
}
