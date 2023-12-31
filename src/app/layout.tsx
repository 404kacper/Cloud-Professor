import { Metadata } from 'next';
import { AuthProvider } from '@/context/AuthContext';
import { SplineProvider } from '@/splineContext/SplineContext';
import { KeysProvider } from '@/keysContext/KeysContext';
import { DataProvider } from '@/dataContext/DataContext';
import { Maven_Pro } from 'next/font/google';
import './global.scss';

// This function can be defined in a separate file and imported if you want to reuse it
export const metadata: Metadata = {
  title: 'Cloud Professor',
  description: 'Hybrid encryption storage service',
  keywords: 'cloud, encryption, storage, hybrid, security, files, data',
};

export const maven = Maven_Pro({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={maven.className}>
        <SplineProvider>
          <AuthProvider>
            <KeysProvider>
              <DataProvider>{children}</DataProvider>
            </KeysProvider>
          </AuthProvider>
        </SplineProvider>
      </body>
    </html>
  );
}
