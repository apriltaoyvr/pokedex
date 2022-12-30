'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, Text, Image, Grid, Container } from '@nextui-org/react';
import { PokeCardQuery } from '@/codegen/graphql';

export default function PokePage({ params }: { params: { pokemon: string } }) {
  const router = useRouter();

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
    <Container
      md
      display='flex'
      justify='center'
      direction='column'
      css={{ textAlign: 'center' }}
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
        {data?.pokemon_v2_pokemontypes.map((type) => (
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
      {data?.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain && (
        <>
          <Text h2>Evolutions</Text>
          <Grid.Container gap={2} justify='center'>
            {data.pokemon_v2_pokemonspecy.pokemon_v2_evolutionchain.pokemon_v2_pokemonspecies.map(
              (evolution) => (
                <Grid key={evolution.name}>
                  <Card
                    variant='bordered'
                    isPressable
                    isHoverable
                    onPress={() => router.push(`/${evolution.id}`)}
                  >
                    <Card.Header
                      css={{
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                      }}
                    >
                      <Text h2 b transform={'capitalize'}>
                        {evolution.name}
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
                            JSON.parse(
                              evolution.pokemon_v2_pokemons[0]
                                .pokemon_v2_pokemonsprites[0].sprites
                            ).front_default
                          }
                          alt={data.name}
                          width={96}
                          height={96}
                        />
                      )}
                    </Card.Body>
                    <Card.Footer>
                      <Grid.Container justify='center' direction='row' gap={2}>
                        {evolution.pokemon_v2_pokemons[0].pokemon_v2_pokemontypes.map(
                          (type) => (
                            <>
                              {type.pokemon_v2_type && (
                                <Grid
                                  key={
                                    type.pokemon_v2_type.name + evolution.name
                                  }
                                >
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
                          )
                        )}
                      </Grid.Container>
                    </Card.Footer>
                  </Card>
                </Grid>
              )
            )}
          </Grid.Container>
        </>
      )}
    </Container>
  );
}
