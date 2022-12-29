import { ApolloClient, InMemoryCache } from '@apollo/client';
import { gql } from '@/codegen/gql';
import { NextApiRequest, NextApiResponse } from 'next';
import { PokeDirectoryQuery } from '@/codegen/graphql';

let _pokemonCache: PokeDirectoryQuery | null = null;

const _pokemonDataCache = {};

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
  query PokeCard($where: pokemon_v2_pokemon_bool_exp) {
    pokemon_v2_pokemon(where: $where) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
      pokemon_v2_pokemontypes {
        slot
        pokemon_v2_type {
          name
        }
      }
    }
  }
`);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    if (req.headers.name) {
      await getPokemon(req, res);
    } else {
      await getDirectory(req, res);
    }
  } else {
    res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }
}

async function getDirectory(req: NextApiRequest, res: NextApiResponse) {
  if (_pokemonCache) {
    res.status(200).json(_pokemonCache);
    return;
  }
  if (typeof req.headers.limit === "string") {
    const data = await client.query({
      query: GET_POKE_DIRECTORY,
      variables: {
        limit: parseInt(req.headers.limit),
      },
    });
    _pokemonCache = data.data;
    res.status(200).json(data.data);
  }
  else {
    res.status(405).json({ status: 'error', error: 'Method not allowed' });
  }
}

async function getPokemon(req: NextApiRequest, res: NextApiResponse) {
  if (typeof req.headers.name === 'string') {
    if (_pokemonDataCache[req.headers.name]) {
      res.status(200).json(_pokemonDataCache[req.headers.name]);
      return;
    }
    const data = await client.query({
      query: GET_POKE_CARD,
      variables: {
        where: {
          name: {
            _eq: req.headers.name,
          },
        },
      },
    });
    _pokemonDataCache[req.headers.name] = data.data;
    if (_pokemonCache) {
      const pokemon = _pokemonCache.pokemon_v2_pokemon.find(
        (p) => p.name === req.headers.name
      );
      
      if (pokemon) pokemon.data = data.data;
    }
    res.status(200).json(data.data);
  } else {
    res
      .status(405)
      .json({ status: 'error', error: 'String was not in header' });
  }
}
