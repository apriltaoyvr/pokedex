'use client';
import { Card, Text, Image, Grid, Loading } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { gql } from '@/codegen/gql';
import { useEffect, useState } from 'react';
import { PokeCardQuery } from '@/codegen/graphql';

interface IPokemon {
  name: string;
  id: number;
}

const PokeCard = ({ pokemon }: { pokemon: IPokemon }) => {
  const [data, setData] = useState(pokemon.data ?? null);

  useEffect(() => {
    if (!data)
      fetch('/api/graphql', { headers: { name: pokemon.name } }).then(
        (response) =>
          response.json().then((data) => setData(data.pokemon_v2_pokemon[0]))
      );
  }, [pokemon.name]);

  console.log(data);

  return (
    <Card variant='bordered' isPressable isHoverable>
      <Card.Header
        css={{
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text h2 b transform={'capitalize'}>
          {pokemon.name}
        </Text>
      </Card.Header>
      <Card.Body>
        {data && (
          <Image
            src={
              JSON.parse(data.pokemon_v2_pokemonsprites[0].sprites)
                .front_default
            }
            alt={data.name}
            width={96}
            height={96}
          />
        )}
      </Card.Body>
      <Card.Footer>
        <Grid.Container justify='center' gap={2}>
          {data && data.pokemon_v2_pokemontypes.map((type) => (
            <>
              {type.pokemon_v2_type && (
                <Grid key={type.pokemon_v2_type.name}>
                  <Text transform={'capitalize'}>
                    {type && type.pokemon_v2_type.name}
                  </Text>
                </Grid>
              )}
            </>
          ))}
        </Grid.Container>
      </Card.Footer>
    </Card>
  );
};

export default PokeCard;
