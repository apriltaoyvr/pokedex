import { ApolloClient, ApolloQueryResult, InMemoryCache } from '@apollo/client';
import { gql } from '@/codegen/gql';
import { NextApiRequest, NextApiResponse } from 'next';
import { PokeCardQuery, PokeDirectoryQuery } from '@/codegen/graphql';

export interface PokemonCache extends PokeDirectoryQuery {
  data: PokeDirectoryQuery;
}

interface IError {
  status: string;
  error: string;
}

let _pokemonCache: PokemonCache | null = null;

const _pokemonDataCache: PokeCardQuery = {};

const client = new ApolloClient({
  uri: 'https://main--aprils-team-ru237.apollographos.net/graphql',
  cache: new InMemoryCache(),
  ssrMode: true,
});

const GET_POKE_DIRECTORY = gql(/* GraphQL */ `
  query PokeDirectory($limit: Int) {
    pokemon_v2_pokemon(limit: $limit) {
      id
      name
    }
  }
`);

const GET_POKE_CARD = gql(/* GraphQL */ `
  query PokeCard(
    $pokemonV2PokemonByPkId: Int!
    $where: pokemon_v2_pokemonspeciesflavortext_bool_exp
  ) {
    pokemon_v2_pokemon_by_pk(id: $pokemonV2PokemonByPkId) {
      id
      name
      is_default
      pokemon_v2_pokemonspecy {
        id
        evolution_chain_id
        name
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            id
            name
            pokemon_v2_pokemons {
              pokemon_v2_pokemontypes {
                slot
                pokemon_v2_type {
                  name
                }
              }
              pokemon_v2_pokemonsprites {
                sprites
              }
            }
          }
        }
        pokemon_v2_pokemonspeciesflavortexts(where: $where) {
          flavor_text
        }
      }
      pokemon_v2_pokemontypes {
        slot
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokeCardQuery | PokeDirectoryQuery | IError>
) {
  if (req.method === 'GET') {
    if (req.headers.id && req.headers.language_id) {
      await getPokemon(req, res);
    } else {
      await getDirectory(req, res);
    }
  } else {
    res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }
}

async function getDirectory(
  req: NextApiRequest,
  res: NextApiResponse<PokeDirectoryQuery | IError>
) {
  if (_pokemonCache) {
    res.status(200).json(_pokemonCache);
    return;
  }
  if (typeof req.headers.limit === 'string') {
    const data = await client.query({
      query: GET_POKE_DIRECTORY,
      variables: {
        limit: parseInt(req.headers.limit),
      },
    });
    //@ts-ignore
    _pokemonCache = data.data;
    res.status(200).json(data.data);
  } else {
    res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }
}

async function getPokemon(req: NextApiRequest, res: NextApiResponse<PokeCardQuery | IError >) {
  if (
    typeof req.headers.id === 'string' &&
    typeof req.headers.language_id === 'string'
  ) {
    //@ts-ignore
    if (_pokemonDataCache[req.headers.id]) {
      //@ts-ignore
      res.status(200).json(_pokemonDataCache[parseInt(req.headers.id)]);
      return;
    }
    const data = await client.query({
      query: GET_POKE_CARD,
      variables: {
        pokemonV2PokemonByPkId: parseInt(req.headers.id),
        where: {
          language_id: {
            _eq: parseInt(req.headers.language_id),
          },
        },
      },
    });
    //@ts-ignore
    _pokemonDataCache[req.headers.id] = data.data;
    if (_pokemonCache && typeof req.headers.id === 'string') {
      //@ts-ignore
      const pokemon: PokemonCache = _pokemonCache.pokemon_v2_pokemon.find(
        //@ts-ignore
        (p) => p.id === parseInt(req.headers.id)
      );
      //@ts-ignore
      if (pokemon) pokemon.data = data.data;
    }
    res.status(200).json(data.data);
  } else {
    res
      .status(405)
      .json({ status: 'error', error: 'String was not in header' });
  }
}
