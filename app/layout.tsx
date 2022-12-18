'use client';
import './global.css';
import { useEffect, useState } from 'react';
import Link from 'next/link';
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
      <body className='hover:scrollbar-thumb-green-600 h-32 overflow-y-scroll bg-neutral-100 text-neutral-900 subpixel-antialiased	scrollbar-thin scrollbar-track-neutral-300 scrollbar-thumb-neutral-700 dark:bg-neutral-900 dark:text-neutral-100'>
        <Navbar isDark={isDark} setIsDark={setIsDark} />
        <main className='m-h-screen flex flex-col place-content-center place-items-center'>
          {children}
        </main>
        <footer className='mt-4 flex place-content-center border-t border-solid	border-t-secondary-800/5 p-4 dark:border-t-secondary-200/5	'>
          <Link
            href='https://pokeapi.co/'
            className='text-secondary-800 hover:text-secondary-700 dark:text-secondary-200 dark:hover:text-secondary-100 text-sm'
          >
            Created with PokeAPI
          </Link>
        </footer>
      </body>
    </html>
  );
}
