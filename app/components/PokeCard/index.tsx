'use client';
import { useEffect, useState } from 'react';
import { Card, Text, Image, Grid } from '@nextui-org/react';
import { PokeDirectoryQuery, Pokemon_V2_Pokemon } from '@/codegen/graphql';

const PokeCard = ({ pokemon }: { pokemon: Pokemon_V2_Pokemon }) => {
  const [data, setData] = useState<Pokemon_V2_Pokemon | null>(
    //@ts-ignore
    pokemon.data ?? null
  );

  useEffect(() => {
    if (!data)
      fetch('/api/graphql', {
        headers: { id: String(pokemon.id), language_id: '9' },
      }).then((response) =>
        response.json().then((data) => setData(data.pokemon_v2_pokemon_by_pk))
      );
  }, [data, pokemon.id, pokemon.name]);

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
      <Card.Body
        css={{
          display: 'flex',
          gap: '2',
          justifyContent: 'center',
          px: 6,
          textAlign: 'center',
        }}
      >
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
        {data?.pokemon_v2_pokemonspecy && (
          <Text>
            {
              data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts[
                data.pokemon_v2_pokemonspecy
                  .pokemon_v2_pokemonspeciesflavortexts.length - 1
              ].flavor_text
            }
          </Text>
        )}
      </Card.Body>
      <Card.Footer>
        <Grid.Container justify='center' gap={2}>
          {data &&
            data.pokemon_v2_pokemontypes.map((type) => (
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
