import { Metadata } from 'next';
import Navbar from '../app/components/home/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { SplineProvider } from '@/splineContext/SplineContext';
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
          <Navbar />
          <AuthProvider>{children}</AuthProvider>
        </SplineProvider>
      </body>
    </html>
  );
}
