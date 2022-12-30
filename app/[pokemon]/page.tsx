'use client';
import { PokeCardQuery } from '@/codegen/graphql';
import { useEffect, useState } from 'react';
import { Card, Text, Image, Grid } from '@nextui-org/react';

export default function PokePage({ params }: { params: { pokemon: string } }) {
  const [data, setData] = useState<
    PokeCardQuery['pokemon_v2_pokemon_by_pk'] | null
  >(null);

  useEffect(() => {
    fetch('/api/graphql', {
      headers: { id: params.pokemon, language_id: '9' },
    }).then((response) =>
      response
        .json()
        .then((data: PokeCardQuery) => setData(data.pokemon_v2_pokemon_by_pk))
    );
  }, [params.pokemon]);

  return (
    <Card
      css={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <Text h1 transform='capitalize'>
        {data?.name}
      </Text>
      {data && (
        <Image
          src={
            JSON.parse(data.pokemon_v2_pokemonsprites[0].sprites).front_default
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
              data.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts
                .length - 1
            ].flavor_text
          }
        </Text>
      )}
      <Grid.Container justify='center' direction='row' gap={1}>
        {data &&
          data.pokemon_v2_pokemontypes.map((type) => (
            <>
              {type.pokemon_v2_type && (
                <Grid key={type.pokemon_v2_type.name + 'grid'}>
                  <Text
                    css={{
                      color: `$${type.pokemon_v2_type.name}`,
                    }}
                    transform='capitalize'
                  >
                    {type && type.pokemon_v2_type.name}
                  </Text>
                </Grid>
              )}
            </>
          ))}
      </Grid.Container>
    </Card>
  );
}
