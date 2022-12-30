'use client';
import {
  Container,
  FormElement,
  Grid,
  Input,
} from '@nextui-org/react';
import PokeCard from './components/PokeCard';
import { ChangeEvent, Suspense, useEffect, useState } from 'react';
import { PokeDirectoryQuery } from '@/codegen/graphql';

export default function Home() {
  const [directory, setDirectory] = useState<
    PokeDirectoryQuery['pokemon_v2_pokemon'] | never[]
  >([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    //@ts-ignore
    fetch('/api/graphql', { headers: { limit: 150 } }).then((response) =>
      response
        .json()
        .then((data: PokeDirectoryQuery) =>
          setDirectory(data.pokemon_v2_pokemon)
        )
    );
  }, []);

  function onChange(e: ChangeEvent<FormElement>) {
    const value = e.target.value;
    setSearch(value);
  }

  return (
    <Container
      fluid
      display='flex'
      justify='center'
      alignItems='center'
      alignContent='center'
      as='section'
    >
      <Input
        clearable
        bordered
        labelPlaceholder='Pokemon'
        css={{ mt: 32, mb: 10 }}
        onChange={onChange}
      />
      <Grid.Container gap={2} justify='center'>
        {directory
          .filter((pokemon) =>
            pokemon.name.includes(search.toLowerCase())
          )
          .map((pokemon) => (
            <Grid xs={12} md={3} key={pokemon.name}>
              <Suspense fallback={<PokeCard fallback={true} />}>
                <PokeCard
                  //@ts-ignore
                  pokemon={pokemon}
                />
              </Suspense>
            </Grid>
          ))}
      </Grid.Container>
    </Container>
  );
}
