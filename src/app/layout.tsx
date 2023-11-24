import { Metadata } from 'next';
import Navbar from '../app/components/home/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import './global.scss'

// This function can be defined in a separate file and imported if you want to reuse it
export const metadata: Metadata = {
  title: 'Cloud Professor',
  description: 'Hybrid encryption storage service',
  keywords: 'cloud, encryption, storage, hybrid, security, files, data',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <Navbar />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
