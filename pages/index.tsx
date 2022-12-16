import Head from 'next/head';
import React, { useEffect, useState, Suspense } from 'react';
import { Inter } from '@next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { Container, Link, Input } from '@nextui-org/react';
import allPokemon from '@/api/pokemon';
const PokeList = React.lazy(() => import('@/components/PokeList'));

export default function Home() {
  let initial: any[] = [];
  const [pokimens, setPokimens] = useState(initial);
  const [filter, setFilter] = useState('');
  const [maxItems, setMaxItems] = useState(50);

  useEffect(() => {
    setPokimens([...allPokemon.pokemon]);
  }, []);

  allPokemon.onChange = () => {
    setPokimens([...allPokemon.pokemon]);
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container
        responsive
        display='flex'
        justify='center'
        alignContent='center'
        className={inter.className}
      >
        <Input
          label='Search for a pokemon'
          placeholder='Ditto'
          underlined
          type='text'
          css={{
            mb: '$10',
            mr: '$10',
          }}
          onChange={(e) => setFilter(e.target.value)}
        />
        <Input
          clearable
          underlined
          label='Max items'
          helperText='0 for infinite scroll'
          type='number'
          initialValue='50'
          placeholder='50'
          css={{
            mb: '$10',
          }}
          onChange={(e) => setMaxItems(Number(e.target.value))}
        />
          <PokeList pokimens={pokimens} filter={filter} maxItems={maxItems} />
        <Container
          fluid
          justify='center'
          alignContent='center'
          css={{ display: 'flex', textAlign: 'center', m: 2, p: 2 }}
        >
          <Link href='https://pokeapi.co/'>API by PokeApi</Link>
        </Container>
      </Container>
    </>
  );
}
