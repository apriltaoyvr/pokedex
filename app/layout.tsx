import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import Providers from './providers';
import Nav from './components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head />
      <body className={inter.className}>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
