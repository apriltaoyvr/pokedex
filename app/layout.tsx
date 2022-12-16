'use client';
import { Suspense, useEffect, lazy } from 'react';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Container, Grid, Link } from '@nextui-org/react';
import Navbar from './(components)/Navbar';
import Providers from '@/app/providers';
import Loading from './loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className='dark-theme' style={{ colorScheme: 'dark' }}>
      <head />
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <Container fluid justify='center'>
            <Grid.Container gap={2} justify='center'>
              {children}
            </Grid.Container>
            <Link href='https://pokeapi.co/'>Created with PokeAPI</Link>
          </Container>
        </body>
      </Providers>
    </html>
  );
}
