import { IPokemon, IPokemonSpecies, IEvolutionChain } from 'pokeapi-typescript';

export type PokemonType = IPokemon &
  IPokemonSpecies &
  IEvolutionChain & { evolutionChain: IChainLink };