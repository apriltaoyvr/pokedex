'use client';
import './global.css';
import { useEffect, useState } from 'react';
import Navbar from './(components)/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  return (
    <html className={isDark ? 'dark' : 'light'}>
      <head />
      <body className='scrollbar-thin scrollbar-thumb-neutral-700 hover:scrollbar-thumb-green-600 scrollbar-track-neutral-300 h-32 overflow-y-scroll	bg-neutral-100 text-neutral-900 subpixel-antialiased dark:bg-neutral-900 dark:text-neutral-100'>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className='m-h-screen container'>{children}</main>
      </body>
    </html>
  );
}
