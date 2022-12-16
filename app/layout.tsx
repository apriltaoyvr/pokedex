'use client';
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
  return (
    <html>
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
