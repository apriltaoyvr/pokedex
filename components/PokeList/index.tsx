import React from 'react';
import PokeCard from '@/components/PokeCard';
import { Grid } from '@nextui-org/react';

export default function PokeList({ pokimens, filter, maxItems }: any) {
  return (
    <Grid.Container gap={2} justify='center'>
      {pokimens
        .filter((pokemon: any) => pokemon.name.includes(filter.toLowerCase()))
        .slice(0, maxItems || Infinity)
        .map((pokemon: any) => {
          return (
            <Grid key={pokemon.id}>
              <PokeCard
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                types={pokemon.types}
                id={pokemon.id}
                key={pokemon.name}
              />
            </Grid>
          );
        })}
    </Grid.Container>
  );
}
