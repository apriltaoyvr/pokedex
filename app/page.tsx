'use client';
import { Progress, Grid } from '@nextui-org/react';
import PokeCard from './components/PokeCard';
import { useEffect, useState } from 'react';

export default function Home() {
  const [directory, setDirectory] = useState([]);
  useEffect(() => {
    fetch('/api/graphql', { headers: { limit: 10 } }).then(
      (response) =>
        response.json().then((data) => setDirectory(data.pokemon_v2_pokemon))
    );
  }, []);

  return (
    <Grid.Container gap={2} justify='center'>
      {directory.map((pokemon) => (
        <Grid xs={12} md={3} key={pokemon.name}>
          <PokeCard
            //@ts-ignore
            pokemon={pokemon}
          />
        </Grid>
      ))}
    </Grid.Container>
  );
}
