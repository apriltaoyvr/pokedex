'use client';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Container, Grid, Link, Spacer } from '@nextui-org/react';
import Navbar from './(components)/Navbar';
import Providers from '@/app/providers';

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
          <Container
            fluid
            display='flex'
            justify='center'
            alignContent='center'
          >
            <Grid.Container gap={2} justify='center' alignContent='center'>
              {children}
            </Grid.Container>
            <Spacer y={4} />
            <Grid xs={12} justify='center'
            >
              <Link href='https://pokeapi.co/' isExternal css={{ m: '$10' }}>
                Created with PokeAPI
              </Link>
            </Grid>
          </Container>
        </body>
      </Providers>
    </html>
  );
}
