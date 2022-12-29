/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel-plugin for production.
 */
const documents = {
    "\n  query PokeDirectory($limit: Int) {\n    pokemon_v2_pokemon(limit: $limit) {\n      id\n      name\n    }\n  }\n": types.PokeDirectoryDocument,
    "\n  query PokeCard(\n    $pokemonV2PokemonByPkId: Int!\n    $where: pokemon_v2_pokemonspeciesflavortext_bool_exp\n  ) {\n    pokemon_v2_pokemon_by_pk(id: $pokemonV2PokemonByPkId) {\n      id\n      name\n      pokemon_v2_pokemonspecy {\n        id\n        evolution_chain_id\n        name\n        pokemon_v2_pokemonspeciesflavortexts(where: $where) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        slot\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        sprites\n      }\n    }\n  }\n": types.PokeCardDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PokeDirectory($limit: Int) {\n    pokemon_v2_pokemon(limit: $limit) {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query PokeDirectory($limit: Int) {\n    pokemon_v2_pokemon(limit: $limit) {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query PokeCard(\n    $pokemonV2PokemonByPkId: Int!\n    $where: pokemon_v2_pokemonspeciesflavortext_bool_exp\n  ) {\n    pokemon_v2_pokemon_by_pk(id: $pokemonV2PokemonByPkId) {\n      id\n      name\n      pokemon_v2_pokemonspecy {\n        id\n        evolution_chain_id\n        name\n        pokemon_v2_pokemonspeciesflavortexts(where: $where) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        slot\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        sprites\n      }\n    }\n  }\n"): (typeof documents)["\n  query PokeCard(\n    $pokemonV2PokemonByPkId: Int!\n    $where: pokemon_v2_pokemonspeciesflavortext_bool_exp\n  ) {\n    pokemon_v2_pokemon_by_pk(id: $pokemonV2PokemonByPkId) {\n      id\n      name\n      pokemon_v2_pokemonspecy {\n        id\n        evolution_chain_id\n        name\n        pokemon_v2_pokemonspeciesflavortexts(where: $where) {\n          flavor_text\n        }\n      }\n      pokemon_v2_pokemontypes {\n        slot\n        pokemon_v2_type {\n          name\n        }\n      }\n      pokemon_v2_pokemonsprites {\n        sprites\n      }\n    }\n  }\n"];

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
**/
export function gql(source: string): unknown;

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;