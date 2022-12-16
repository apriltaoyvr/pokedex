'use client';
import { use, useEffect } from 'react';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Providers } from '@/app/providers';
import { Container, Grid, Link } from '@nextui-org/react';
import Navbar from './(components)/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const mediaQuery = true;

  useEffect(() => {
    window.matchMedia('(prefers-color-scheme: dark)');
  }, [mediaQuery]);

  return (
    <html className={mediaQuery ? 'dark-theme' : 'light-theme'}>
      <head />
      <Providers>
        <body className={inter.className}>
          <Navbar />
          <Container fluid>
            <Grid.Container gap={2} justify='center'>
              {children}
              <Grid>
                <Link href='https://pokeapi.co/'>Created with PokeAPI</Link>
              </Grid>
            </Grid.Container>
          </Container>
        </body>
      </Providers>
    </html>
  );
}
