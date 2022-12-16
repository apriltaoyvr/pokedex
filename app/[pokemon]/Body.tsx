'use client';
import { Text, Grid, Image } from '@nextui-org/react';
import Types from '@/components/Types';
import Evolutions from './(forms)/Evolutions';

export default function Body({ pokemon }: { pokemon: PokemonBasic }) {
  return (
    <Grid.Container justify='center' direction='column' gap={4}>
      <Grid xs justify='center' direction='column'>
        <Grid.Container
          justify='center'
          alignContent='center'
          direction='column'
        >
          <Grid xs justify='center' alignContent='center'>
            <Text h1 b transform='capitalize'>
              {pokemon.name}
            </Text>
          </Grid>
          <Grid xs justify='center' alignContent='center'>
            <Text h3 b transform='capitalize'>
              Pokemon #{pokemon.id}
            </Text>
          </Grid>
        </Grid.Container>
      </Grid>
      <Grid xs justify='center'>
        <Image
          src={pokemon.image}
          alt={pokemon.name}
          showSkeleton
          width={96}
          height={96}
        />
      </Grid>
      <Grid xs>
        <Types types={pokemon.types} />{' '}
      </Grid>
      <Grid xs justify='center'>
        <Text>{pokemon.description}</Text>
      </Grid>
    </Grid.Container>
  );
}
